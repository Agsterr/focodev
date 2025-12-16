import { NextRequest } from 'next/server'
import { jsonResponse, errorResponse } from '@/lib/api'
import { prisma } from '@/lib/db'
import { sendEmail, formatContactEmail } from '@/lib/email'
import { sendWhatsAppNotification } from '@/lib/whatsapp'
import { sanitize } from '@/lib/sanitize'

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
  try {
    const form = await req.formData()
    const name = sanitize(String(form.get('name') || ''))
    const email = String(form.get('email') || '').trim().toLowerCase()
    const phone = sanitize(String(form.get('phone') || '')) || undefined
    const message = sanitize(String(form.get('message') || ''))

    // Validação básica
    if (!name || !email || !message) {
      return errorResponse('Campos obrigatórios: nome, e-mail e mensagem', 400)
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

    const now = new Date()

    // Enviar e-mail (não bloqueia se falhar)
    const formattedEmail = formatContactEmail({
      name,
      email,
      phone,
      message,
      date: now,
    })

    const to =
      process.env.CONTACT_RECEIVER_EMAIL ||
      process.env.CONTACT_EMAIL ||
      'focodevsistemas@gmail.com'

    console.log('[Contact API] Configuração de e-mail:', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      hasResendFrom: !!process.env.RESEND_FROM_EMAIL,
      receiverEmail: to,
      fromEmail: process.env.RESEND_FROM_EMAIL,
    })

    const emailResult = await sendEmail({
      to,
      subject: formattedEmail.subject,
      html: formattedEmail.html,
    }).catch((error) => {
      console.error('[Contact API] Erro ao enviar e-mail:', error)
      return { success: false, error: error?.message }
    })

    if (!emailResult.success) {
      console.warn('[Contact API] E-mail não enviado:', emailResult.error)
      // Logar no banco para debug
      await prisma.logs.create({
        data: {
          action: 'contact_email_failed',
          message: `Falha ao enviar e-mail para contato ${contactMessage.id}`,
          meta: { contactId: contactMessage.id, error: emailResult.error },
        },
      }).catch(() => {}) // Não falhar se log falhar
    }

    // Enviar notificação WhatsApp (não bloqueia se falhar)
    const whatsappResult = await sendWhatsAppNotification({
      name,
      email,
      phone,
      message,
      date: now,
    }).catch((error) => {
      console.error('[Contact API] Erro ao enviar WhatsApp:', error)
      return { success: false, error: error?.message }
    })

    if (!whatsappResult.success) {
      console.warn('[Contact API] WhatsApp não enviado:', whatsappResult.error)
      // Logar no banco para debug
      await prisma.logs.create({
        data: {
          action: 'contact_whatsapp_failed',
          message: `Falha ao enviar WhatsApp para contato ${contactMessage.id}`,
          meta: { contactId: contactMessage.id, error: whatsappResult.error },
        },
      }).catch(() => {}) // Não falhar se log falhar
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
