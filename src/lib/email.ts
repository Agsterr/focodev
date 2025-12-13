/**
 * Serviço de envio de e-mail
 * Suporta SMTP e Resend API
 */

interface EmailData {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail(data: EmailData): Promise<{ success: boolean; error?: string }> {
  try {
    // Verificar se Resend está configurado
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      return await sendEmailViaResend(data, resendApiKey)
    }

    // Fallback para SMTP
    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
    }

    if (smtpConfig.host && smtpConfig.user && smtpConfig.password) {
      return await sendEmailViaSMTP(data, smtpConfig)
    }

    // Se nenhum serviço estiver configurado, apenas logar
    console.warn('[Email] Nenhum serviço de e-mail configurado. Configure RESEND_API_KEY ou SMTP_*')
    return { success: false, error: 'Serviço de e-mail não configurado' }
  } catch (error: any) {
    console.error('[Email] Erro ao enviar e-mail:', error)
    return { success: false, error: error?.message || 'Erro desconhecido' }
  }
}

async function sendEmailViaResend(
  data: EmailData,
  apiKey: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: data.from || process.env.RESEND_FROM_EMAIL || 'noreply@focodev.com',
        to: data.to,
        subject: data.subject,
        html: data.html,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Resend API error: ${error}`)
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error?.message }
  }
}

async function sendEmailViaSMTP(
  data: EmailData,
  config: {
    host: string
    port: number
    secure: boolean
    user: string
    password: string
  }
): Promise<{ success: boolean; error?: string }> {
  // Para SMTP, precisaríamos do nodemailer
  // Por enquanto, vamos apenas logar que seria enviado
  console.log('[Email] SMTP não implementado ainda. Use Resend ou instale nodemailer')
  return { success: false, error: 'SMTP não implementado. Use Resend API' }
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
    timeStyle: 'medium',
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

