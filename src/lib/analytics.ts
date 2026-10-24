/**
 * Google Ads / GA4 (gtag) helpers.
 *
 * Os IDs são lidos em tempo de execução no servidor (veja `getTrackingConfig`)
 * e entregues ao navegador em `window.__FOCO_TRACKING`. Assim basta mudar o
 * `.env` do servidor e reiniciar o container — não precisa rebuild da imagem.
 */

export type AdsEventName =
  | 'form_start'
  | 'generate_lead'
  | 'whatsapp_click'
  | 'phone_click'
  | 'cta_click'
  | 'mailto_click'
  | 'site_click'

type ConversionKey = 'contact' | 'whatsapp' | 'form_start' | 'cta' | 'phone'

export type TrackingConfig = {
  adsId: string
  gaId: string
  conversions: Partial<Record<ConversionKey, string>>
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    __FOCO_TRACKING?: TrackingConfig
  }
}

/**
 * Lê a configuração no servidor. Usa nomes sem NEXT_PUBLIC_ porque o Next
 * embute NEXT_PUBLIC_* no build (e o build do Docker não recebe esses valores).
 * NEXT_PUBLIC_* continua aceito como alternativa para desenvolvimento local.
 */
export function getTrackingConfig(): TrackingConfig {
  const env = process.env
  const pick = (...values: (string | undefined)[]) =>
    values.find((v) => v && v.trim())?.trim() || ''

  return {
    adsId: pick(env.GOOGLE_ADS_ID, env.NEXT_PUBLIC_GOOGLE_ADS_ID),
    gaId: pick(env.GA_MEASUREMENT_ID, env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
    conversions: {
      contact: pick(env.GOOGLE_ADS_CONVERSION_CONTACT, env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CONTACT),
      whatsapp: pick(env.GOOGLE_ADS_CONVERSION_WHATSAPP, env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_WHATSAPP),
      form_start: pick(env.GOOGLE_ADS_CONVERSION_FORM_START, env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_FORM_START),
      cta: pick(env.GOOGLE_ADS_CONVERSION_CTA, env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CTA),
      phone: pick(env.GOOGLE_ADS_CONVERSION_PHONE, env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_PHONE),
    },
  }
}

function clientConfig(): TrackingConfig | undefined {
  if (typeof window === 'undefined' || !window.gtag) return undefined
  return window.__FOCO_TRACKING
}

function clean(params?: Record<string, string | number | boolean | undefined>) {
  return Object.fromEntries(
    Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== '')
  ) as Record<string, string | number | boolean>
}

function resolveSendTo(config: TrackingConfig, key: ConversionKey): string | undefined {
  const configured = config.conversions[key]?.trim()
  if (!configured) return undefined
  // Aceita "AW-xxx/label" ou só o label (completa com o ID global)
  if (configured.includes('/')) return configured
  if (!config.adsId) return undefined
  return `${config.adsId}/${configured}`
}

/** Dispara evento (vai para o GA4 e pode ser importado como conversão no Google Ads). */
export function trackEvent(
  name: AdsEventName,
  params?: Record<string, string | number | boolean | undefined>
) {
  const config = clientConfig()
  if (!config) return
  window.gtag!('event', name, clean(params))
}

/** Dispara conversão do Google Ads (send_to) quando o label estiver configurado. */
export function trackConversion(
  key: ConversionKey,
  params?: Record<string, string | number | boolean | undefined>
) {
  const config = clientConfig()
  if (!config) return
  const sendTo = resolveSendTo(config, key)
  if (!sendTo) return
  window.gtag!('event', 'conversion', { send_to: sendTo, ...clean(params) })
}

/** Início do preenchimento do formulário (primeiro foco). */
export function trackFormStart(source?: string) {
  trackEvent('form_start', { source: source || 'contact_form' })
  trackConversion('form_start', { source: source || 'contact_form' })
}

/** Envio bem-sucedido do formulário de contato (conversão principal). */
export function trackLeadSubmit(source?: string, leadId?: string) {
  trackEvent('generate_lead', {
    source: source || 'contact_form',
    method: 'form',
  })
  // transaction_id evita contar a mesma conversão duas vezes
  trackConversion('contact', {
    source: source || 'contact_form',
    transaction_id: leadId,
  })
}

/** Clique em WhatsApp. */
export function trackWhatsAppClick(source?: string) {
  trackEvent('whatsapp_click', { source: source || 'unknown' })
  trackConversion('whatsapp', { source: source || 'unknown' })
}

/** Clique em telefone (tel:). */
export function trackPhoneClick(source?: string) {
  trackEvent('phone_click', { source: source || 'unknown' })
  trackConversion('phone', { source: source || 'unknown' })
}

/** Clique em CTA de orçamento / contato. */
export function trackCtaClick(source?: string, destination?: string) {
  trackEvent('cta_click', {
    source: source || 'unknown',
    destination: destination || '',
  })
  trackConversion('cta', {
    source: source || 'unknown',
  })
}

/** Clique em e-mail. */
export function trackMailtoClick(source?: string) {
  trackEvent('mailto_click', { source: source || 'footer' })
}
