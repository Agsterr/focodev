/**
 * Origem do visitante (UTM, gclid, página de entrada, referência).
 * Guardada no navegador na primeira visita da sessão e enviada junto com o
 * formulário de contato, para saber qual campanha gerou cada orçamento.
 */

const STORAGE_KEY = 'foco_attribution'
const PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
] as const

export type Attribution = Partial<Record<(typeof PARAMS)[number], string>> & {
  landingPage?: string
  referrer?: string
  firstSeen?: string
}

function read(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Attribution) : null
  } catch {
    return null
  }
}

/** Registra a origem. Uma nova visita com UTM/gclid substitui a anterior (último clique pago). */
export function captureAttribution() {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  const fromUrl: Attribution = {}
  for (const key of PARAMS) {
    const value = url.searchParams.get(key)
    if (value) fromUrl[key] = value.slice(0, 200)
  }

  const hasCampaign = Object.keys(fromUrl).length > 0
  if (!hasCampaign && read()) return

  const referrer =
    document.referrer && !document.referrer.startsWith(window.location.origin)
      ? document.referrer.slice(0, 300)
      : undefined

  const data: Attribution = {
    ...fromUrl,
    landingPage: (url.pathname + url.search).slice(0, 300),
    referrer,
    firstSeen: new Date().toISOString(),
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null
  return read()
}

/** Valida o JSON vindo do formulário (só chaves conhecidas, texto curto). */
export function parseAttribution(raw: unknown, source?: string): Attribution & { source?: string } | null {
  let input: Record<string, unknown> = {}
  try {
    input = typeof raw === 'string' && raw ? JSON.parse(raw) : {}
  } catch {}
  const allowed = [...PARAMS, 'landingPage', 'referrer', 'firstSeen'] as const
  const out: Record<string, string> = {}
  for (const key of allowed) {
    const value = input?.[key]
    if (typeof value === 'string' && value.trim()) out[key] = value.trim().slice(0, 300)
  }
  if (source) out.source = source.slice(0, 60)
  return Object.keys(out).length ? out : null
}

/** Resumo legível da origem, ex: "Google Ads (gclid) · campanha: sistemas-franca". */
export function describeAttribution(attr: (Attribution & { source?: string }) | null | undefined) {
  if (!attr) return 'Não identificada'
  const parts: string[] = []
  if (attr.gclid || attr.gbraid || attr.wbraid) parts.push('Google Ads')
  else if (attr.fbclid) parts.push('Facebook/Instagram Ads')
  if (attr.utm_source) parts.push(`${attr.utm_source}${attr.utm_medium ? ` / ${attr.utm_medium}` : ''}`)
  if (attr.utm_campaign) parts.push(`campanha: ${attr.utm_campaign}`)
  if (attr.utm_term) parts.push(`termo: ${attr.utm_term}`)
  if (!parts.length) {
    if (attr.referrer) {
      try {
        parts.push(`veio de ${new URL(attr.referrer).hostname}`)
      } catch {
        parts.push('veio de outro site')
      }
    } else {
      parts.push('acesso direto')
    }
  }
  if (attr.landingPage) parts.push(`entrou por ${attr.landingPage}`)
  if (attr.source) parts.push(`formulário: ${attr.source}`)
  return parts.join(' · ')
}
