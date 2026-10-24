import Script from 'next/script'
import { getTrackingConfig } from '@/lib/analytics'

/**
 * Carrega o Google tag (gtag.js) para Google Ads e/ou GA4.
 * Só renderiza se GOOGLE_ADS_ID ou GA_MEASUREMENT_ID estiver definido no servidor.
 */
export default function GoogleAdsTag() {
  const config = getTrackingConfig()
  const ids = [config.gaId, config.adsId].filter(Boolean)
  if (ids.length === 0) return null

  // JSON escapado para não quebrar o <script> mesmo com valores estranhos no .env
  const configJson = JSON.stringify(config).replace(/</g, '\\u003c')

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ids[0])}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.__FOCO_TRACKING = ${configJson};
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          // O painel administrativo não entra nas métricas
          if (location.pathname.indexOf('/admin') !== 0) {
            ${ids.map((id) => `gtag('config', ${JSON.stringify(id)});`).join('\n            ')}
          }
        `}
      </Script>
    </>
  )
}
