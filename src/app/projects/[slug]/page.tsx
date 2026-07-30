import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import JsonLd from '@/components/JsonLd'
import { DEFAULT_PROJECTS } from '@/lib/site-content'
import { PROJECT_LANDING_HREFS } from '@/lib/product-landings'
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildMetadata,
  creativeWorkJsonLd,
} from '@/lib/seo'

function getProjectFallbackImage(slug: string) {
  const p = DEFAULT_PROJECTS.find((x) => x.slug === slug)
  return p?.coverImageUrl || '/portfolio/default.svg'
}

interface Props { params: { slug: string } }

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const landing = PROJECT_LANDING_HREFS[params.slug]
  if (landing) {
    const titles: Record<string, string> = {
      fitlife: 'Foco Academia',
      'foco-academia': 'Foco Academia',
      'app-rotas': 'App Rotas',
    }
    return buildMetadata({
      title: titles[params.slug] || 'Projeto',
      description: 'Conheça este produto da FocoDev Sistemas.',
      path: landing,
      noIndex: true,
    })
  }

  const project = await prisma.project.findUnique({ where: { slug: params.slug } })
  if (!project) {
    return buildMetadata({
      title: 'Projeto não encontrado',
      description: 'Este projeto não está disponível.',
      path: `/projects/${params.slug}`,
      noIndex: true,
    })
  }

  const image =
    project.coverImageUrl || getProjectFallbackImage(params.slug)

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    image,
  })
}

export default async function ProjectDetail({ params }: Props) {
  const landingHref = PROJECT_LANDING_HREFS[params.slug]
  if (landingHref) redirect(landingHref)

  const project = await prisma.project.findUnique({ where: { slug: params.slug }, include: { images: true } })
  if (!project) return notFound()

  const coverUrl = project.coverImageUrl || (project.images[0]?.url) || getProjectFallbackImage(params.slug)
  const galleryImages = project.images.length > 0 ? project.images : []
  const path = `/projects/${project.slug}`

  return (
    <>
      <JsonLd
        data={[
          creativeWorkJsonLd({
            name: project.title,
            description: project.description,
            path,
            image: coverUrl.startsWith('http') ? coverUrl : absoluteUrl(coverUrl),
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Portfólio', path: '/projects' },
            { name: project.title, path },
          ]),
        ]}
      />
      <div className="container py-12 md:py-20">
        <div className="mb-12 animate-fade-in">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao portfólio
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        <div className="mb-12">
          <div className="relative aspect-[21/9] max-h-96 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800 mb-8">
            <Image
              src={coverUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          {galleryImages.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((img: typeof project.images[number], index: number) => (
                <div
                  key={img.id}
                  className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={img.url}
                      alt={img.alt || project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {img.alt && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium">{img.alt}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-xl">
            <Link href="/projects">Ver mais projetos</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
