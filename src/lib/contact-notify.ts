import { formatContactEmail, getContactRecipients, sendEmail } from '@/lib/email'
import { sendWhatsAppNotification } from '@/lib/whatsapp'

export type ContactNotification = {
  name: string
  email: string
  phone?: string
  message: string
  date: Date
  /** Resumo da origem (campanha, UTM, página de entrada) */
  origin?: string
}

/** Envia o aviso de novo contato por e-mail e WhatsApp ao mesmo tempo. */
export async function notifyNewContact(contact: ContactNotification) {
  const { subject, html } = formatContactEmail(contact)
  const [email, whatsapp] = await Promise.all([
    sendEmail({ to: getContactRecipients(), subject, html, replyTo: contact.email }).catch((e) => ({
      success: false as const,
      error: e?.message || 'Erro desconhecido',
    })),
    sendWhatsAppNotification(contact).catch((e) => ({
      success: false as const,
      error: e?.message || 'Erro desconhecido',
    })),
  ])
  return { email, whatsapp }
}
