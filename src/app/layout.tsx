import '../styles/globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'
import ConditionalLayout from '@/components/conditional-layout'
import SessionProviderWrapper from '@/components/session-provider-wrapper'
import PWAInstallPrompt from '@/components/pwa-install-prompt'
import { getOrganizationStructuredData, getWebsiteStructuredData } from '@/lib/structured-data'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://focodev.com.br'),
  title: {
    default: 'FocoDev Sistemas - Soluções Digitais Modernas',
    template: '%s | FocoDev Sistemas',
  },
  description: 'Soluções digitais modernas e seguras para o seu negócio. Desenvolvimento web, aplicativos, sistemas personalizados e muito mais. Transforme suas ideias em realidade digital.',
  keywords: [
    'desenvolvimento web',
    'soluções digitais',
    'aplicativos',
    'sistemas personalizados',
    'tecnologia',
    'programação',
    'software',
    'FocoDev',
    'desenvolvimento de sites',
    'desenvolvimento de aplicativos',
    'consultoria em TI',
  ],
  authors: [{ name: 'FocoDev Sistemas' }],
  creator: 'FocoDev Sistemas',
  publisher: 'FocoDev Sistemas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'FocoDev Sistemas',
    title: 'FocoDev Sistemas - Soluções Digitais Modernas',
    description: 'Soluções digitais modernas e seguras para o seu negócio. Desenvolvimento web, aplicativos, sistemas personalizados e muito mais.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FocoDev Sistemas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FocoDev Sistemas - Soluções Digitais Modernas',
    description: 'Soluções digitais modernas e seguras para o seu negócio. Transforme suas ideias em realidade digital.',
    images: ['/og-image.jpg'],
    creator: '@focodev',
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
  manifest: '/manifest.json',
  category: 'technology',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationData = await getOrganizationStructuredData()
  const websiteData = await getWebsiteStructuredData()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0EA5E9" />
      </head>
      <body>
        <Script
          id="organization-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <Script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
        <SessionProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ConditionalLayout>{children}</ConditionalLayout>
            <PWAInstallPrompt />
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
