import type { Metadata } from 'next'
import { getShowcaseCover } from '@/lib/showcase'
import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug } from '@/lib/public-data'
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
  return getShowcaseCover(slug) || p?.coverImageUrl || '/portfolio/default.svg'
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

  const project = await getProjectBySlug(params.slug).catch(() => null)
  if (!project) {
    return buildMetadata({
      title: 'Projeto não encontrado',
      description: 'Este projeto não está disponível.',
      path: `/projects/${params.slug}`,
      noIndex: true,
    })
  }

  const image =
    (project.coverImageUrl && !project.coverImageUrl.endsWith('.svg') ? project.coverImageUrl : getProjectFallbackImage(params.slug))

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

  const project = await getProjectBySlug(params.slug)
  if (!project) return notFound()

  const coverUrl = (project.coverImageUrl && !project.coverImageUrl.endsWith('.svg') ? project.coverImageUrl : null) || getShowcaseCover(params.slug) || project.images[0]?.url || getProjectFallbackImage(params.slug)
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
          <span className="eyebrow">Projeto</span>
          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        <div className="mb-12">
          {/* Print inteiro (sem corte) sobre fundo com brilho — serve para tela de celular ou de computador */}
          <div className="relative mb-8 h-[22rem] md:h-[30rem] overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/70">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-cyan/15 via-neon-violet/15 to-neon-pink/10" />
            <div className="absolute inset-6 md:inset-10">
              <Image
                src={coverUrl}
                unoptimized={String(coverUrl).endsWith('.svg')}
                alt={project.title}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="100vw"
                priority
              />
            </div>
          </div>
          {galleryImages.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((img: typeof project.images[number], index: number) => (
                <div
                  key={img.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-900/70 transition-all duration-500 hover:-translate-y-1 hover:border-neon-violet/40 hover:shadow-neon"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-ink-800 to-ink-950">
                    <Image
                      src={img.url}
                      unoptimized={String(img.url).endsWith('.svg')}
                      alt={img.alt || project.title}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  {img.alt && <p className="border-t border-white/10 p-4 text-sm text-slate-400">{img.alt}</p>}
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
