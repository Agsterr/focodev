import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/db'

// Dados das páginas públicas com cache. Evita consultar o banco a cada visita:
// o cache vale por 5 minutos e é invalidado na hora quando algo é salvo no
// painel (revalidateTag(SITE_CONTENT_TAG) nas rotas de API).
export const SITE_CONTENT_TAG = 'site-content'

const CACHE_OPTIONS = { tags: [SITE_CONTENT_TAG], revalidate: 300 }

export const getHomeData = unstable_cache(
  async () => {
    const [banner, services, projects, videos] = await Promise.all([
      prisma.homeBanner.findUnique({ where: { id: 'home-banner' } }),
      prisma.service.findMany({ take: 6, orderBy: { createdAt: 'desc' } }),
      prisma.project.findMany({ take: 6, orderBy: { createdAt: 'desc' } }),
      prisma.video.findMany({ take: 6, orderBy: { createdAt: 'desc' } }),
    ])
    return { banner, services, projects, videos }
  },
  ['home-data'],
  CACHE_OPTIONS
)

export const getProjectsWithImages = unstable_cache(
  () => prisma.project.findMany({ orderBy: { createdAt: 'desc' }, include: { images: true } }),
  ['projects-with-images'],
  CACHE_OPTIONS
)

export const getProjectBySlug = unstable_cache(
  (slug: string) =>
    prisma.project.findUnique({
      where: { slug },
      include: { images: { orderBy: { createdAt: 'asc' } } },
    }),
  ['project-by-slug'],
  CACHE_OPTIONS
)
