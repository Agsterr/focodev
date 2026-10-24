import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export const runtime = 'edge'

/** Ícone para iPhone/Android (PNG, gerado a partir da marca). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#05060F',
        }}
      >
        <svg width="140" height="140" viewBox="0 0 64 64">
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
      </div>
    ),
    size
  )
}
