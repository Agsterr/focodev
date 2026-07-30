import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'
import { SITE_URL } from '@/lib/seo'
import { PRODUCT_LANDINGS } from '@/lib/product-landings'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/fitlife`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/rotas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ]

  let projectRoutes: MetadataRoute.Sitemap = []
  try {
    const projects = await prisma.project.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    })

    const landingSlugs = new Set(
      Object.values(PRODUCT_LANDINGS).flatMap((p) => [p.slug, p.projectSlug])
    )

    projectRoutes = projects
      .filter((p) => !landingSlugs.has(p.slug))
      .map((p) => ({
        url: `${SITE_URL}/projects/${p.slug}`,
        lastModified: p.updatedAt || now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  } catch {
    projectRoutes = []
  }

  return [...staticRoutes, ...projectRoutes]
}
