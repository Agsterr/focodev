import type { Metadata } from 'next'

/** URL canônica do site institucional */
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.focodev.com.br').replace(/\/$/, '')

export const SITE_NAME = 'FocoDev Sistemas'
export const SITE_TAGLINE = 'Desenvolvimento de software, sites e apps sob medida'

export const SITE_DESCRIPTION =
  'Software house no interior de São Paulo: desenvolvimento de sistemas web, apps mobile, sites, PWAs e automações sob medida. Next.js, Flutter, Java Spring e Python — do projeto à produção.'

export const SITE_KEYWORDS = [
  'FocoDev',
  'FocoDev Sistemas',
  'desenvolvimento de software sob medida',
  'software house',
  'criação de sites profissionais',
  'desenvolvimento de sistemas web',
  'aplicativos mobile Flutter',
  'PWA',
  'automação de processos',
  'app de academia',
  'app de rotas de entrega',
  'sistema de estoque',
  'desenvolvimento Next.js',
  'empresa de software interior de São Paulo',
  'orçamento de sistema sob medida',
]

export const SITE_EMAIL = 'focodevsistemas@gmail.com'
export const SITE_PHONE = '+5516991183292'
export const SITE_INSTAGRAM = 'https://www.instagram.com/focodevsistemas/'
export const SITE_LOCALE = 'pt_BR'
export const SITE_AREA = 'Interior de São Paulo, Brasil'

/** Imagem padrão OG/Twitter em PNG (SVG rende mal em redes sociais). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/portfolio/fitlife/app-menu.png`

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
    '@type': ['Organization', 'ProfessionalService'],
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/logo.svg'),
    image: DEFAULT_OG_IMAGE,
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    sameAs: [SITE_INSTAGRAM],
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'São Paulo' },
      { '@type': 'Country', name: 'Brasil' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE_EMAIL,
      telephone: SITE_PHONE,
      availableLanguage: ['Portuguese'],
      areaServed: 'BR',
    },
    knowsAbout: [
      'Desenvolvimento de software',
      'Aplicativos mobile',
      'Sistemas web',
      'PWA',
      'Automação de processos',
      'Next.js',
      'Flutter',
    ],
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: 'FocoDev',
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

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function serviceListJsonLd(
  services: { name: string; description: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Serviços — ${SITE_NAME}`,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        provider: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: SITE_AREA,
      },
    })),
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
