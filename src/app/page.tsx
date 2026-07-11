import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/db'
import { Smartphone, Server, Cog, Palette, Gauge, Globe, MessageSquare, Info, ShieldCheck, Sparkles, Play, Package, MapPin, ExternalLink } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import TestimonialsSection from '@/components/TestimonialsSection'
import { SHOWCASE_PROJECTS, PRODUCTION_SYSTEMS, PROJECT_EXTERNAL_URLS } from '@/lib/system-links'
import { DEFAULT_PROJECTS, DEFAULT_SERVICES, HERO_STATS, TECH_STACK } from '@/lib/site-content'
import { getProjectHref } from '@/lib/product-landings'

export const dynamic = 'force-dynamic'

function getServiceIcon(name: string) {
  const t = name.toLowerCase()
  if (t.includes('mobile') || t.includes('app')) return Smartphone
  if (t.includes('infra') || t.includes('deploy') || t.includes('hosped')) return Server
  if (t.includes('auto') || t.includes('process')) return Cog
  if (t.includes('design') || t.includes('ui')) return Palette
  if (t.includes('otimiz') || t.includes('consult')) return Gauge
  if (t.includes('pwa') || t.includes('navegador') || t.includes('web')) return Globe
  return Cog
}

function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) return match[1]
  }
  return null
}

function getProjectFallbackImage(p: { slug?: string; title?: string }) {
  const key = (p.slug || p.title || '').toLowerCase()
  if (key.includes('barbearia') || key.includes('barber')) return '/portfolio/fastburger.svg'
  if (key.includes('mercado') || key.includes('focomarket') || key.includes('estoque') || key.includes('vendas')) return '/portfolio/focomarket.svg'
  if (key.includes('academia') || key.includes('fitlife') || key.includes('fit') || key.includes('treino')) return '/portfolio/fitlife/app-menu.png'
  if (key.includes('rotas') || key.includes('route')) return '/portfolio/rotas/app-inicio.png'
  return '/portfolio/default.svg'
}
export default async function HomePage() {
  let banner: any = null
  let services: any[] = []
  let projects: any[] = []
  let videos: any[] = []
  try {
    banner = await prisma.homeBanner.findUnique({ where: { id: 'home-banner' } })
    services = await prisma.service.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
    projects = await prisma.project.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
    videos = await prisma.video.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
  } catch {}

  const displayServices = services.length > 0 ? services : DEFAULT_SERVICES
  const displayProjects = projects.length > 0 ? projects : DEFAULT_PROJECTS

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand/25 blur-3xl rounded-full" />
        <div className="absolute top-10 right-0 w-80 h-80 bg-brand-dark/20 blur-3xl rounded-full" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm md:text-base font-semibold ring-1 ring-brand/20">
                <Sparkles className="w-4 h-4" />
                Soluções que geram resultado
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-brand-dark dark:from-white dark:via-gray-100 dark:to-brand bg-clip-text text-transparent">
                  {banner?.title || 'Soluções digitais para impulsionar seu negócio'}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                {banner?.subtitle || 'Software sob medida, veloz e seguro — do site institucional ao app mobile em produção.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/80 dark:bg-gray-900/80 text-sm font-medium text-gray-700 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild size="lg" variant="gradient" className="text-base px-8 py-6 rounded-xl shadow-glow">
                  <Link href={banner?.ctaLink || '/#contato'}>{banner?.ctaText || 'Solicitar orçamento'}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl bg-white/80 dark:bg-gray-900/80">
                  <Link href="/#portfolio">Ver Portfólio</Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in-delay">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-brand-dark/10 rounded-3xl blur-2xl scale-95" />
              <div className="relative rounded-3xl border border-white/60 dark:border-gray-700/60 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl p-8 md:p-10 ring-1 ring-brand/10">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {HERO_STATS.map((stat) => (
                    <div key={stat.label} className="text-center p-4 rounded-2xl bg-sky-50 dark:bg-slate-800/80 ring-1 ring-brand/10">
                      <div className="text-2xl md:text-3xl font-bold text-brand">{stat.value}</div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-brand/5 to-brand-dark/5 ring-1 ring-brand/15">
                    <div className="h-12 w-12 rounded-xl bg-brand/15 flex items-center justify-center shrink-0">
                      <Package className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Gerenciamento de Estoque</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Em produção · focodev.com.br</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-brand/5 to-brand-dark/5 ring-1 ring-brand/15">
                    <div className="h-12 w-12 rounded-xl bg-brand/15 flex items-center justify-center shrink-0">
                      <Smartphone className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Foco Academia & App Rotas</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Landings com orçamento · /fitlife e /rotas</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-brand/5 to-brand-dark/5 ring-1 ring-brand/15">
                    <div className="h-12 w-12 rounded-xl bg-brand/15 flex items-center justify-center shrink-0">
                      <Globe className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Sites & PWAs</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Instaláveis no celular</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="container py-20 relative scroll-mt-24">
        <div className="absolute -top-10 left-0 w-64 h-64 bg-brand/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 right-0 w-64 h-64 bg-brand-dark/10 blur-3xl rounded-full" />
        <div className="text-center mb-16">
          <h2 className="section-title">Serviços</h2>
          <p className="section-subtitle max-w-2xl mx-auto text-gray-800 dark:text-gray-200 font-semibold">
            O que fazemos para impulsionar seu negócio
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((s, index: number) => (
            <div 
              key={s.id} 
              className="card p-8 group cursor-pointer ring-1 ring-brand/20 hover:ring-brand/40 hover:border-brand"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center ring-1 ring-brand/20 mb-4 group-hover:bg-brand/15 group-hover:ring-brand/40">
                {(() => {
                  const Icon = getServiceIcon(s.title)
                  return <Icon className="w-6 h-6" />
                })()}
              </div>
              <div className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                {s.title}
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sistemas e projetos */}
      <section id="sistemas" className="container py-20 relative scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="section-title">Nossos Sistemas</h2>
          <p className="section-subtitle max-w-2xl mx-auto text-gray-800 dark:text-gray-200 font-semibold">
            Conheça os produtos, veja o que fazem e peça um orçamento — o acesso é liberado após contratação
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRODUCTION_SYSTEMS.map((system) => (
            <a
              key={system.href}
              href={system.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-8 group ring-1 ring-brand/20 hover:ring-brand/40 hover:border-brand transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center ring-1 ring-brand/20 mb-4">
                <Package className="w-6 h-6" />
              </div>
              <div className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-brand transition-colors flex items-center gap-2">
                {system.label}
                <ExternalLink className="w-4 h-4 opacity-60" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{system.description}</p>
              <span className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-medium ring-1 ring-brand/20">
                <Globe className="w-3.5 h-3.5" />
                Acessar online
              </span>
            </a>
          ))}

          {([SHOWCASE_PROJECTS.fitlife, SHOWCASE_PROJECTS.rotas] as const).map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="card overflow-hidden ring-1 ring-brand/20 hover:ring-brand/40 hover:border-brand transition-all group block"
            >
              <div className="relative h-40 bg-sky-50 dark:bg-slate-900">
                <Image
                  src={product.image}
                  alt={product.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold ring-1 ring-brand/20">
                    <Smartphone className="w-3.5 h-3.5" />
                    {product.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {product.tech}
                  </span>
                </div>
                <div className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-brand transition-colors flex items-center gap-2">
                  {product.label === 'App Rotas' ? <MapPin className="w-5 h-5 text-brand" /> : null}
                  {product.label}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 mt-5 text-brand text-sm font-semibold">
                  Conhecer e orçar
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      {videos.length > 0 && (
        <section className="container py-20 relative">
          <div className="absolute -top-10 left-0 w-64 h-64 bg-brand/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 right-0 w-64 h-64 bg-brand-dark/10 blur-3xl rounded-full" />
          <div className="text-center mb-16">
            <h2 className="section-title">
              <span className="inline-flex items-center gap-3">
                <span className="h-10 w-10 rounded-xl bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30">
                  <Play className="w-6 h-6 text-brand" />
                </span>
                Trabalhos em Vídeo
              </span>
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto text-gray-800 dark:text-gray-200 font-semibold">
              Confira alguns dos nossos projetos em ação
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video: typeof videos[number], index: number) => {
              const videoId = getYouTubeVideoId(video.youtubeUrl)
              const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null
              const thumbnailUrl = video.thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null)
              
              return (
                <div
                  key={video.id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video relative bg-gray-900">
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : thumbnailUrl ? (
                      <>
                        <Image
                          src={thumbnailUrl}
                          alt={video.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <a
                          href={video.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors"
                        >
                          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </a>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand/20 to-brand-dark/20">
                        <Play className="w-16 h-16 text-white/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-900">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="sobre" className="container py-20 relative scroll-mt-24">
        <div className="absolute -top-10 left-0 w-64 h-64 bg-brand/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 right-0 w-64 h-64 bg-brand-dark/10 blur-3xl rounded-full" />
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">
            <span className="inline-flex items-center gap-3">
              <span className="h-10 w-10 rounded-xl bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30">
                <Info className="w-6 h-6 text-brand" />
              </span>
              Sobre Nós
            </span>
          </h2>
          <div className="card p-6 md:p-8 ring-1 ring-brand/20 bg-white/90 dark:bg-gray-900/90">
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Somos especialistas em criar soluções digitais sob medida, focadas em performance, segurança e experiência do usuário. Nossos projetos incluem funcionalidades como ConstroiSites, CorrigiBug e BlendingPages, oferecendo ferramentas eficientes para construir sites, corrigir problemas rapidamente e integrar conteúdos de forma inteligente. Cada solução é pensada para atender às necessidades específicas de cada cliente, garantindo resultados consistentes e de alta qualidade.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/15 text-brand-dark dark:text-brand text-base md:text-lg font-semibold ring-1 ring-brand/30">
              <Gauge className="w-4 h-4" />
              Performance
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/15 text-brand-dark dark:text-brand text-base md:text-lg font-semibold ring-1 ring-brand/30">
              <ShieldCheck className="w-4 h-4" />
              Segurança
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/15 text-brand-dark dark:text-brand text-base md:text-lg font-semibold ring-1 ring-brand/30">
              <Sparkles className="w-4 h-4" />
              UX de Alto Nível
            </span>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Portfolio Section */}
      <section id="portfolio" className="container py-20 relative scroll-mt-24">
        <div className="absolute -top-10 right-0 w-64 h-64 bg-brand/10 blur-3xl rounded-full" />
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title mb-2">Portfólio</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl">
              Projetos reais e demonstrações que mostram nossa capacidade técnica
            </p>
          </div>
          <Link
            href="/projects"
            className="text-brand hover:text-brand-dark font-semibold flex items-center gap-2 group transition-colors shrink-0"
          >
            Ver tudo
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((p, index: number) => {
            const landingHref = getProjectHref(p.slug)
            const hasLanding = landingHref !== `/projects/${p.slug}`
            const externalUrl = !hasLanding ? PROJECT_EXTERNAL_URLS[p.slug] : undefined
            const href = hasLanding ? landingHref : (externalUrl || `/projects/${p.slug}`)
            const isExternal = Boolean(externalUrl)

            const card = (
              <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-1 hover:border-brand/40">
                <div className="relative h-48 bg-gradient-to-br from-sky-50 to-cyan-100 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
                  <Image
                    src={p.coverImageUrl || getProjectFallbackImage(p)}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <div className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                    {p.title}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed text-sm">{p.description}</p>
                  <div className="mt-4 text-brand text-sm font-semibold flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    {isExternal ? 'Acessar sistema' : hasLanding ? 'Conhecer e orçar' : 'Ver projeto'}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            )

            if (isExternal) {
              return (
                <a
                  key={p.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {card}
                </a>
              )
            }

            return (
              <Link
                key={p.id}
                href={href}
                className="group block"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {card}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="container py-20 scroll-mt-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">
              <span className="inline-flex items-center gap-3">
                <span className="h-10 w-10 rounded-xl bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30">
                  <MessageSquare className="w-6 h-6 text-brand" />
                </span>
                <span className="text-gray-900 dark:text-white font-extrabold">Contato</span>
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-semibold">Fale com nossa equipe</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
