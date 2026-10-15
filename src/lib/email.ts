import nodemailer from 'nodemailer'

/**
 * Serviço de envio de e-mail.
 * Usa Resend (RESEND_API_KEY) ou SMTP (SMTP_HOST/SMTP_USER/SMTP_PASSWORD, ex: Gmail
 * com senha de app). Se os dois estiverem configurados, tenta Resend e cai para SMTP.
 */

interface EmailData {
  to: string | string[]
  subject: string
  html: string
  from?: string
  replyTo?: string
}

type EmailResult = { success: boolean; error?: string; provider?: string }

/** Destinatários das notificações de contato (CONTACT_RECEIVER_EMAIL aceita lista separada por vírgula). */
export function getContactRecipients(): string[] {
  const configured = (process.env.CONTACT_RECEIVER_EMAIL || process.env.CONTACT_EMAIL || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
  return Array.from(new Set([...configured, 'agster.santos01@gmail.com']))
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY || (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD))
}

export async function sendEmail(data: EmailData): Promise<EmailResult> {
  const errors: string[] = []

  if (process.env.RESEND_API_KEY) {
    const r = await sendEmailViaResend(data, process.env.RESEND_API_KEY)
    if (r.success) return r
    errors.push(`Resend: ${r.error}`)
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    const r = await sendEmailViaSMTP(data)
    if (r.success) return r
    errors.push(`SMTP: ${r.error}`)
  }

  if (errors.length === 0) {
    return { success: false, error: 'Nenhum serviço de e-mail configurado (defina SMTP_* ou RESEND_API_KEY)' }
  }
  return { success: false, error: errors.join(' | ') }
}

async function sendEmailViaResend(data: EmailData, apiKey: string): Promise<EmailResult> {
  try {
    const fromEmail = data.from || process.env.RESEND_FROM_EMAIL
    if (!fromEmail) return { success: false, error: 'RESEND_FROM_EMAIL não configurado' }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: fromEmail,
        to: data.to,
        subject: data.subject,
        html: data.html,
        reply_to: data.replyTo,
      }),
      signal: AbortSignal.timeout(15_000),
    })
    if (!response.ok) {
      const body = await response.text().catch(() => '')
      return { success: false, error: `HTTP ${response.status} ${body.slice(0, 300)}` }
    }
    return { success: true, provider: 'resend' }
  } catch (error: any) {
    return { success: false, error: error?.message || 'Erro desconhecido' }
  }
}

async function sendEmailViaSMTP(data: EmailData): Promise<EmailResult> {
  try {
    const port = Number(process.env.SMTP_PORT || '587')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 20_000,
    })
    await transporter.sendMail({
      from: data.from || process.env.SMTP_FROM || `"Site FocoDev" <${process.env.SMTP_USER}>`,
      to: data.to,
      subject: data.subject,
      html: data.html,
      replyTo: data.replyTo,
    })
    return { success: true, provider: 'smtp' }
  } catch (error: any) {
    return { success: false, error: error?.message || 'Erro desconhecido' }
  }
}

/**
 * Formata e-mail de notificação de novo contato
 */
export function formatContactEmail(data: {
  name: string
  email: string
  phone?: string
  message: string
  date: Date
}): { subject: string; html: string } {
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(data.date)

  const subject = `🔔 Novo contato no site - ${data.name}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #667eea; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
        .message-box { padding: 15px; background: white; border-left: 4px solid #667eea; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 Novo Contato no Site</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Nome:</div>
            <div class="value">${escapeHtml(data.name)}</div>
          </div>
          <div class="field">
            <div class="label">E-mail:</div>
            <div class="value">${escapeHtml(data.email)}</div>
          </div>
          ${data.phone ? `
          <div class="field">
            <div class="label">Telefone:</div>
            <div class="value">${escapeHtml(data.phone)}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Mensagem:</div>
            <div class="message-box">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
          </div>
          <div class="field">
            <div class="label">Data/Hora:</div>
            <div class="value">${formattedDate}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  return { subject, html }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

