import { NextRequest } from 'next/server'
import { jsonResponse, errorResponse, requireAuth } from '@/lib/api'
import { notifyNewContact } from '@/lib/contact-notify'
import { getContactRecipients, isEmailConfigured } from '@/lib/email'
import { isWhatsAppConfigured } from '@/lib/whatsapp'
import { rateLimit } from '@/lib/rate-limit'

/** GET: mostra quais canais estão configurados. POST: envia uma notificação de teste. */
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  return jsonResponse({
    email: { configured: isEmailConfigured(), recipients: getContactRecipients() },
    whatsapp: { configured: isWhatsAppConfigured() },
  })
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  if (rateLimit(req, 'notify-test', 5, 10 * 60_000).limited) {
    return errorResponse('Muitos testes seguidos. Aguarde alguns minutos.', 429)
  }
  const result = await notifyNewContact({
    name: 'Teste do painel',
    email: auth.user?.email || 'teste@focodev.com.br',
    message: 'Esta é uma mensagem de teste enviada pelo painel admin. Se você recebeu, os avisos do formulário estão funcionando.',
    date: new Date(),
  })
  return jsonResponse(result)
}
