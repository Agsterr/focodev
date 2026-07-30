import Script from 'next/script'
import { getGoogleAdsId } from '@/lib/analytics'

/**
 * Carrega o Google tag (gtag.js) para Google Ads.
 * Só renderiza se NEXT_PUBLIC_GOOGLE_ADS_ID estiver definido.
 */
export default function GoogleAdsTag() {
  const adsId = getGoogleAdsId()
  if (!adsId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${adsId}');
        `}
      </Script>
    </>
  )
}
