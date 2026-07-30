import type { Metadata } from 'next'

/** URL canônica do site institucional */
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.focodev.com.br').replace(/\/$/, '')

export const SITE_NAME = 'FocoDev Sistemas'
export const SITE_TAGLINE = 'Soluções digitais modernas e seguras para o seu negócio'

export const SITE_DESCRIPTION =
  'Desenvolvimento de sites, apps mobile, sistemas web e automações sob medida. Software rápido, seguro e pronto para produção — FocoDev Sistemas.'

export const SITE_KEYWORDS = [
  'desenvolvimento de software',
  'criação de sites',
  'aplicativos mobile',
  'sistemas web',
  'Next.js',
  'Flutter',
  'FocoDev',
  'FocoDev Sistemas',
  'desenvolvimento sob medida',
  'PWA',
  'automação de processos',
  'app de academia',
  'app de rotas',
  'Brasil',
]

export const SITE_EMAIL = 'focodevsistemas@gmail.com'
export const SITE_INSTAGRAM = 'https://www.instagram.com/focodevsistemas/'
export const SITE_LOCALE = 'pt_BR'

/** Imagem padrão para Open Graph / Twitter (absolute). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.svg`

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return SITE_URL
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

type BuildMetadataInput = {
  title: string
  description: string
  path?: string
  image?: string
  keywords?: string[]
  noIndex?: boolean
  type?: 'website' | 'article'
}

/**
 * Monta Metadata completo (title, description, canonical, Open Graph, Twitter).
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  keywords,
  noIndex = false,
  type = 'website',
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : absoluteUrl(image)
    : DEFAULT_OG_IMAGE

  return {
    title,
    description,
    keywords: keywords?.length ? keywords : SITE_KEYWORDS,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type,
      locale: SITE_LOCALE,
      url,
      siteName: SITE_NAME,
      title: title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/logo.svg'),
    email: SITE_EMAIL,
    sameAs: [SITE_INSTAGRAM],
    description: SITE_DESCRIPTION,
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE_EMAIL,
      availableLanguage: ['Portuguese'],
    },
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function softwareApplicationJsonLd(input: {
  name: string
  description: string
  path: string
  image?: string
  applicationCategory?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: input.image || DEFAULT_OG_IMAGE,
    applicationCategory: input.applicationCategory || 'BusinessApplication',
    operatingSystem: 'Web, Android, iOS',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
      description: 'Orçamento sob medida — entre em contato',
    },
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export function creativeWorkJsonLd(input: {
  name: string
  description: string
  path: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: input.image || DEFAULT_OG_IMAGE,
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}
