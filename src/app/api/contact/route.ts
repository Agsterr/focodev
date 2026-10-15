import { NextRequest } from 'next/server'
import { jsonResponse, errorResponse } from '@/lib/api'
import { prisma } from '@/lib/db'
import { notifyNewContact } from '@/lib/contact-notify'
import { sanitize } from '@/lib/sanitize'
import { rateLimit } from '@/lib/rate-limit'

/**
 * API de contato - Processa formulário de contato do site
 * 
 * Funcionalidades:
 * 1. Valida e sanitiza dados
 * 2. Salva mensagem no banco de dados
 * 3. Envia e-mail de notificação
 * 4. Envia notificação via WhatsApp
 * 
 * Tratamento de erros:
 * - Se e-mail falhar, ainda salva no banco e notifica WhatsApp
 * - Se WhatsApp falhar, ainda salva no banco e envia e-mail
 * - Logs de erros para debug
 */
export async function POST(req: NextRequest) {
  // Até 5 mensagens a cada 10 minutos por IP (anti-spam)
  if (rateLimit(req, 'contact', 5, 10 * 60_000).limited) {
    return errorResponse('Muitas mensagens enviadas. Tente novamente em alguns minutos.', 429)
  }

  try {
    const form = await req.formData()

    // Honeypot: campo invisível para pessoas; se vier preenchido, é bot.
    // Responde como sucesso para não dar pistas ao robô.
    if (String(form.get('website') || '').trim()) {
      return jsonResponse({ ok: true, message: 'Mensagem enviada com sucesso!' })
    }

    const name = sanitize(String(form.get('name') || ''))
    const email = String(form.get('email') || '').trim().toLowerCase()
    const phone = sanitize(String(form.get('phone') || '')) || undefined
    const message = sanitize(String(form.get('message') || ''))

    // Validação básica
    if (!name || !email || !message) {
      return errorResponse('Campos obrigatórios: nome, e-mail e mensagem', 400)
    }

    if (name.length > 120 || email.length > 254 || (phone && phone.length > 40)) {
      return errorResponse('Dados inválidos', 400)
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return errorResponse('E-mail inválido', 400)
    }

    // Proteção básica contra spam (mensagem muito curta ou muito longa)
    if (message.length < 10) {
      return errorResponse('Mensagem muito curta', 400)
    }
    if (message.length > 5000) {
      return errorResponse('Mensagem muito longa', 400)
    }

    // Salvar no banco de dados
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        message,
        status: 'NOVO',
      },
    })

    // Avisa por e-mail e WhatsApp (falhas não impedem o envio do formulário)
    const { email: emailResult, whatsapp: whatsappResult } = await notifyNewContact({
      name,
      email,
      phone,
      message,
      date: new Date(),
    })

    for (const [channel, result] of [['email', emailResult], ['whatsapp', whatsappResult]] as const) {
      if (!result.success) {
        console.warn(`[Contact API] Aviso por ${channel} falhou:`, result.error)
        await prisma.logs.create({
          data: {
            action: `contact_${channel}_failed`,
            message: `Falha ao avisar por ${channel} sobre o contato ${contactMessage.id}`,
            meta: { contactId: contactMessage.id, error: result.error },
          },
        }).catch(() => {})
      }
    }

    // Log de sucesso
    await prisma.logs.create({
      data: {
        action: 'contact_message_created',
        message: `Novo contato: ${name} <${email}>`,
        meta: {
          contactId: contactMessage.id,
          emailSent: emailResult.success,
          whatsappSent: whatsappResult.success,
        },
      },
    }).catch(() => {}) // Não falhar se log falhar

    return jsonResponse({
      ok: true,
      message: 'Mensagem enviada com sucesso!',
      id: contactMessage.id,
    })
  } catch (e: any) {
    console.error('[Contact API] Erro geral:', e)
    
    // Logar erro no banco
    await prisma.logs.create({
      data: {
        action: 'contact_message_error',
        message: 'Erro ao processar formulário de contato',
        meta: { error: e?.message, stack: e?.stack },
      },
    }).catch(() => {})

    return errorResponse('Falha ao enviar contato. Tente novamente mais tarde.', 500, e?.message)
  }
}
