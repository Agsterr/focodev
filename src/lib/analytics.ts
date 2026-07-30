/**
 * Google Ads / gtag helpers.
 * Configure NEXT_PUBLIC_GOOGLE_ADS_ID (ex: AW-123456789) no .env.
 * Labels opcionais para conversões específicas no Ads.
 */

export type AdsEventName =
  | 'form_start'
  | 'generate_lead'
  | 'whatsapp_click'
  | 'cta_click'
  | 'mailto_click'

type ConversionKey = 'contact' | 'whatsapp' | 'form_start' | 'cta'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ''

const CONVERSION_SEND_TO: Record<ConversionKey, string | undefined> = {
  contact: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CONTACT,
  whatsapp: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_WHATSAPP,
  form_start: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_FORM_START,
  cta: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CTA,
}

function resolveSendTo(key: ConversionKey): string | undefined {
  const configured = CONVERSION_SEND_TO[key]?.trim()
  if (!configured) return undefined
  // Aceita "AW-xxx/label" ou só o label (completa com o ID global)
  if (configured.includes('/')) return configured
  if (!ADS_ID) return undefined
  return `${ADS_ID}/${configured}`
}

export function getGoogleAdsId() {
  return ADS_ID.trim()
}

export function isAdsEnabled() {
  return Boolean(getGoogleAdsId())
}

/** Dispara evento customizado (útil para criar conversões no Google Ads a partir de eventos). */
export function trackEvent(
  name: AdsEventName,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === 'undefined' || !window.gtag || !isAdsEnabled()) return

  const cleaned = Object.fromEntries(
    Object.entries(params || {}).filter(([, v]) => v !== undefined)
  ) as Record<string, string | number | boolean>

  window.gtag('event', name, cleaned)
}

/** Dispara conversão do Google Ads (send_to) quando o label estiver configurado. */
export function trackConversion(
  key: ConversionKey,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === 'undefined' || !window.gtag || !isAdsEnabled()) return

  const sendTo = resolveSendTo(key)
  if (!sendTo) return

  const cleaned = Object.fromEntries(
    Object.entries(params || {}).filter(([, v]) => v !== undefined)
  ) as Record<string, string | number | boolean>

  window.gtag('event', 'conversion', {
    send_to: sendTo,
    ...cleaned,
  })
}

/** Início do preenchimento do formulário (primeiro foco). */
export function trackFormStart(source?: string) {
  trackEvent('form_start', { source: source || 'contact_form' })
  trackConversion('form_start', { source: source || 'contact_form' })
}

/** Envio bem-sucedido do formulário de contato (conversão principal). */
export function trackLeadSubmit(source?: string) {
  trackEvent('generate_lead', {
    source: source || 'contact_form',
    method: 'form',
  })
  trackConversion('contact', {
    source: source || 'contact_form',
  })
}

/** Clique em WhatsApp. */
export function trackWhatsAppClick(source?: string) {
  trackEvent('whatsapp_click', { source: source || 'unknown' })
  trackConversion('whatsapp', { source: source || 'unknown' })
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
