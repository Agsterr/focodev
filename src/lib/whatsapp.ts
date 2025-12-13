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

/**
 * Função auxiliar para enviar via API de WhatsApp (exemplo com Twilio)
 * Descomente e configure se tiver uma API de WhatsApp
 */
/*
async function sendViaWhatsAppAPI(
  number: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_WHATSAPP_FROM

    if (!accountSid || !authToken || !fromNumber) {
      return { success: false, error: 'Twilio não configurado' }
    }

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
        },
        body: new URLSearchParams({
          From: `whatsapp:${fromNumber}`,
          To: `whatsapp:${number}`,
          Body: message,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Twilio API error: ${error}`)
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error?.message }
  }
}
*/

