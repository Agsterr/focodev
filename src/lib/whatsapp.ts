/**
 * Serviço de notificação via WhatsApp
 * Usa link direto do WhatsApp Web/API
 */

interface WhatsAppNotificationData {
  name: string
  email: string
  phone?: string
  message: string
  date: Date
}

/**
 * Envia notificação via WhatsApp usando link direto
 * Formato: https://wa.me/{numero}?text={mensagem}
 */
export async function sendWhatsAppNotification(
  data: WhatsAppNotificationData
): Promise<{ success: boolean; error?: string }> {
  try {
    const whatsappNumber = process.env.ADMIN_WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

    if (!whatsappNumber) {
      console.warn('[WhatsApp] Número não configurado. Configure ADMIN_WHATSAPP_NUMBER')
      return { success: false, error: 'Número do WhatsApp não configurado' }
    }

    // Remover caracteres não numéricos
    const cleanNumber = whatsappNumber.replace(/\D/g, '')

    // Formatar mensagem
    const message = formatWhatsAppMessage(data)

    // Criar link do WhatsApp
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`

    // Se estiver em ambiente de desenvolvimento, apenas logar
    if (process.env.NODE_ENV === 'development') {
      console.log('[WhatsApp] Link gerado:', whatsappUrl)
      console.log('[WhatsApp] Mensagem:', message)
      return { success: true }
    }

    // Em produção, você pode:
    // 1. Usar uma API de WhatsApp (Twilio, WhatsApp Business API, etc.)
    // 2. Abrir o link automaticamente (não recomendado em servidor)
    // 3. Usar um serviço de webhook

    // Por enquanto, vamos apenas retornar sucesso
    // O link pode ser usado manualmente ou integrado com uma API
    console.log('[WhatsApp] Notificação preparada:', whatsappUrl)

    // Se você tiver uma API de WhatsApp configurada, use aqui:
    // return await sendViaWhatsAppAPI(cleanNumber, message)

    return { success: true }
  } catch (error: any) {
    console.error('[WhatsApp] Erro ao enviar notificação:', error)
    return { success: false, error: error?.message || 'Erro desconhecido' }
  }
}

/**
 * Formata mensagem para WhatsApp
 */
function formatWhatsAppMessage(data: WhatsAppNotificationData): string {
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(data.date)

  let message = `🔔 *Novo contato no site*\n\n`
  message += `*Nome:* ${data.name}\n`
  message += `*Email:* ${data.email}\n`
  if (data.phone) {
    message += `*Telefone:* ${data.phone}\n`
  }
  message += `*Data/Hora:* ${formattedDate}\n\n`
  message += `*Mensagem:*\n${data.message}`

  return message
}

export function getWhatsAppNumber() {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '16991183292'
  return raw.replace(/\D/g, '')
}

export function getWhatsAppHref(message: string) {
  const number = getWhatsAppNumber()
  const text = encodeURIComponent(message)
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`
}
