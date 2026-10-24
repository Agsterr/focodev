/**
 * Notificação via WhatsApp para o dono do site.
 *
 * Canais suportados (configure pelo menos um no .env):
 * - CallMeBot (grátis, para mandar mensagem para o próprio número):
 *     WHATSAPP_CALLMEBOT_APIKEY=123456
 *     ADMIN_WHATSAPP_NUMBER=5516991183292
 * - Webhook (n8n, Evolution API, Z-API etc.): recebe um POST JSON
 *     WHATSAPP_WEBHOOK_URL=https://seu-n8n/webhook/contato
 *     WHATSAPP_WEBHOOK_TOKEN=opcional (enviado em Authorization: Bearer)
 */

interface WhatsAppNotificationData {
  name: string
  email: string
  phone?: string
  message: string
  date: Date
  origin?: string
}

type WhatsAppResult = { success: boolean; error?: string; provider?: string }

function getAdminNumber() {
  const raw = process.env.ADMIN_WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '16991183292'
  const digits = raw.replace(/\D/g, '')
  // Números brasileiros sem DDI recebem 55
  return digits.length <= 11 ? `55${digits}` : digits
}

export function isWhatsAppConfigured() {
  return Boolean(process.env.WHATSAPP_CALLMEBOT_APIKEY || process.env.WHATSAPP_WEBHOOK_URL)
}

export async function sendWhatsAppNotification(data: WhatsAppNotificationData): Promise<WhatsAppResult> {
  const text = formatWhatsAppMessage(data)
  const errors: string[] = []
  let sent: string | null = null

  if (process.env.WHATSAPP_WEBHOOK_URL) {
    const r = await sendViaWebhook(process.env.WHATSAPP_WEBHOOK_URL, data, text)
    if (r.success) sent = 'webhook'
    else errors.push(`webhook: ${r.error}`)
  }

  if (process.env.WHATSAPP_CALLMEBOT_APIKEY) {
    const r = await sendViaCallMeBot(process.env.WHATSAPP_CALLMEBOT_APIKEY, text)
    if (r.success) sent = sent ? `${sent}+callmebot` : 'callmebot'
    else errors.push(`callmebot: ${r.error}`)
  }

  if (sent) return { success: true, provider: sent }
  if (errors.length === 0) {
    return { success: false, error: 'WhatsApp não configurado (defina WHATSAPP_CALLMEBOT_APIKEY ou WHATSAPP_WEBHOOK_URL)' }
  }
  return { success: false, error: errors.join(' | ') }
}

async function sendViaCallMeBot(apiKey: string, text: string): Promise<WhatsAppResult> {
  try {
    const url = new URL('https://api.callmebot.com/whatsapp.php')
    url.searchParams.set('phone', getAdminNumber())
    url.searchParams.set('text', text)
    url.searchParams.set('apikey', apiKey)
    const res = await fetch(url, { signal: AbortSignal.timeout(15_000) })
    const body = await res.text().catch(() => '')
    // A CallMeBot responde 200 mesmo em alguns erros; o texto indica o resultado
    if (!res.ok || /error|invalid|not\s+valid/i.test(body)) {
      return { success: false, error: `HTTP ${res.status} ${body.replace(/<[^>]+>/g, ' ').trim().slice(0, 200)}` }
    }
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error?.message || 'Erro desconhecido' }
  }
}

async function sendViaWebhook(url: string, data: WhatsAppNotificationData, text: string): Promise<WhatsAppResult> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (process.env.WHATSAPP_WEBHOOK_TOKEN) headers.Authorization = `Bearer ${process.env.WHATSAPP_WEBHOOK_TOKEN}`
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        to: getAdminNumber(),
        text,
        contact: { ...data, date: data.date.toISOString() },
      }),
      signal: AbortSignal.timeout(15_000),
    })
    if (!res.ok) return { success: false, error: `HTTP ${res.status}` }
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error?.message || 'Erro desconhecido' }
  }
}

function formatWhatsAppMessage(data: WhatsAppNotificationData): string {
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(data.date)

  let message = `🔔 *Novo contato no site*\n\n`
  message += `*Nome:* ${data.name}\n`
  message += `*Email:* ${data.email}\n`
  if (data.phone) message += `*Telefone:* ${data.phone}\n`
  message += `*Data/Hora:* ${formattedDate}\n`
  if (data.origin) message += `*Origem:* ${data.origin}\n`
  message += `\n`
  message += `*Mensagem:*\n${data.message}`
  return message
}

/** Número para links wa.me: sempre com DDI (sem 55, o WhatsApp entende como número de outro país). */
export function getWhatsAppNumber() {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '16991183292'
  const digits = raw.replace(/\D/g, '')
  return digits.length <= 11 ? `55${digits}` : digits
}

export function getWhatsAppHref(message: string) {
  const number = getWhatsAppNumber()
  const text = encodeURIComponent(message)
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`
}
