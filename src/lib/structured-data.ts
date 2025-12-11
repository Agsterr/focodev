import { prisma } from '@/lib/db'

export async function getOrganizationStructuredData() {
  let companyInfo: any = null
  
  try {
    if (prisma && typeof prisma.companyInfo !== 'undefined') {
      companyInfo = await prisma.companyInfo.findFirst()
    }
  } catch (error) {
    console.error('Error loading company info:', error)
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://focodev.com.br'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FocoDev Sistemas',
    url: siteUrl,
    description: 'Soluções digitais modernas e seguras para o seu negócio',
    email: companyInfo?.email || '',
    telephone: companyInfo?.phone || '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo?.address || '',
      addressCountry: 'BR',
    },
    sameAs: [
      companyInfo?.instagram ? `https://instagram.com/${companyInfo.instagram.replace('@', '')}` : null,
    ].filter(Boolean),
  }
}

export async function getWebsiteStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://focodev.com.br'

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FocoDev Sistemas',
    url: siteUrl,
    description: 'Soluções digitais modernas e seguras para o seu negócio',
    publisher: {
      '@type': 'Organization',
      name: 'FocoDev Sistemas',
    },
  }
}

export function getProjectStructuredData(project: any) {
  if (!project) return null

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://focodev.com.br'

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${siteUrl}/projects/${project.slug}`,
    image: project.coverImageUrl || project.images?.[0]?.url || `${siteUrl}/og-image.jpg`,
    creator: {
      '@type': 'Organization',
      name: 'FocoDev Sistemas',
      url: siteUrl,
    },
    dateCreated: project.createdAt,
    dateModified: project.updatedAt,
  }
}

