import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/seo'

export const alt = `${SITE_NAME} — sistemas, sites e apps sob medida`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const runtime = 'edge'

/**
 * Imagem de compartilhamento (WhatsApp, Instagram, Google, anúncios) em 1200x630.
 * Usada como padrão em todas as páginas que não têm imagem própria.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          color: 'white',
          backgroundColor: '#05060F',
          backgroundImage:
            'radial-gradient(circle at 12% 10%, rgba(34,211,238,0.35), transparent 45%), radial-gradient(circle at 92% 20%, rgba(139,92,246,0.45), transparent 50%), radial-gradient(circle at 50% 120%, rgba(236,72,153,0.35), transparent 55%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE" />
                <stop offset="55%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <circle cx="28" cy="28" r="14" fill="none" stroke="url(#g)" strokeWidth="5" />
            <circle cx="23" cy="23" r="5" fill="url(#g)" />
            <line x1="38.5" y1="38.5" x2="49" y2="49" stroke="url(#g)" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{SITE_NAME}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, maxWidth: 1000 }}>
            Sistemas, sites e apps sob medida para o seu negócio
          </div>
          <div style={{ fontSize: 32, color: '#94A3B8' }}>
            Franca/SP · atendimento em todo o Brasil · orçamento sem compromisso
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 30, color: '#22D3EE' }}>www.focodev.com.br</div>
      </div>
    ),
    size
  )
}
