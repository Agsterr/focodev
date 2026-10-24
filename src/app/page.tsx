import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Smartphone,
  Server,
  Cog,
  Palette,
  Gauge,
  Globe,
  Play,
  ArrowRight,
  ArrowUpRight,
  Check,
  ShoppingCart,
  CalendarCheck,
  PackageOpen,
  MapPin,
  Sparkles,
  ShieldCheck,
  Zap,
  MessageCircle,
} from 'lucide-react'
import { getHomeData } from '@/lib/public-data'
import ContactForm from '@/components/ContactForm'
import TrackedAnchor from '@/components/TrackedAnchor'
import FaqSection from '@/components/FaqSection'
import JsonLd from '@/components/JsonLd'
import ScrollReveal from '@/components/ScrollReveal'
import { BrowserFrame, PhoneFrame } from '@/components/home/DeviceFrames'
import { ABOUT_PARAGRAPHS, DEFAULT_SERVICES, HERO_STATS, PROCESS_STEPS, TECH_STACK } from '@/lib/site-content'
import { SHOWCASE } from '@/lib/showcase'
import { PROJECT_EXTERNAL_URLS } from '@/lib/system-links'
import { getProjectHref } from '@/lib/product-landings'
import { getWhatsAppHref } from '@/lib/whatsapp'
import { buildMetadata, serviceListJsonLd, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  path: '/',
})

export const dynamic = 'force-dynamic'

const SERVICE_ICONS = [
  { match: ['mobile', 'app'], icon: Smartphone },
  { match: ['infra', 'deploy', 'hosped'], icon: Server },
  { match: ['auto', 'process'], icon: Cog },
  { match: ['design', 'ui'], icon: Palette },
  { match: ['otimiz', 'consult'], icon: Gauge },
  { match: ['pwa', 'navegador', 'web'], icon: Globe },
]

function getServiceIcon(name: string) {
  const t = name.toLowerCase()
  return SERVICE_ICONS.find((s) => s.match.some((m) => t.includes(m)))?.icon || Cog
}

const ICON_GRADIENTS = [
  'from-neon-cyan to-sky-500',
  'from-neon-violet to-indigo-500',
  'from-neon-pink to-rose-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-sky-400 to-neon-violet',
]

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

function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: { eyebrow: string; title: React.ReactNode; subtitle?: string; align?: 'center' | 'left' }) {
  return (
    <div className={`mb-12 md:mb-14 ${align === 'center' ? 'text-center mx-auto' : ''} max-w-4xl`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title mt-5">{title}</h2>
      {subtitle && <p className="section-subtitle mb-0">{subtitle}</p>}
    </div>
  )
}

export default async function HomePage() {
  let banner: any = null
  let services: any[] = []
  let projects: any[] = []
  let videos: any[] = []
  try {
    ;({ banner, services, projects, videos } = await getHomeData())
  } catch {}

  const displayServices = services.length > 0 ? services : DEFAULT_SERVICES
  const showcaseSlugs = new Set(SHOWCASE.map((s) => s.slug))
  const extraProjects = projects.filter((p: any) => !showcaseSlugs.has(p.slug))
  const whatsappHref = getWhatsAppHref('Olá! Vi o site da FocoDev e quero tirar meu projeto do papel.')

  return (
    <>
      <JsonLd
        data={serviceListJsonLd(
          displayServices.map((s: { title: string; description: string }) => ({
            name: s.title,
            description: s.description,
          }))
        )}
      />
      <ScrollReveal />
      <div className="overflow-hidden">
        {/* ================= HERO ================= */}
        <section data-section="hero" className="relative -mt-16 md:-mt-20 pt-28 md:pt-36 pb-20 md:pb-28">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
          <div className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-neon-cyan/25 blur-[120px] animate-aurora" />
          <div className="pointer-events-none absolute top-10 -right-40 h-[32rem] w-[32rem] rounded-full bg-neon-violet/30 blur-[120px] animate-aurora-slow" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-neon-pink/20 blur-[120px] animate-aurora" />

          <div className="container relative">
            <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
              <div className="animate-fade-in">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  Agenda aberta para novos projetos
                </div>

                <h1 className="mt-7 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-bold text-white">
                  {banner?.title ? (
                    banner.title
                  ) : (
                    <>
                      Software que faz seu negócio <span className="text-gradient animate-gradient-x">vender mais</span>.
                    </>
                  )}
                </h1>

                <p className="mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-slate-400">
                  {banner?.subtitle ||
                    'Sistemas web, apps e automações sob medida — do primeiro rascunho ao sistema rodando em produção. Empresa de Franca/SP, atendendo todo o Brasil.'}
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <TrackedAnchor
                    kind="cta"
                    source="home_hero_orcamento"
                    href={banner?.ctaLink || '/#contato'}
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink bg-[length:200%_auto] bg-left px-7 py-4 text-base font-semibold text-white shadow-neon transition-[background-position,transform] duration-500 hover:bg-right hover:-translate-y-0.5"
                  >
                    {banner?.ctaText || 'Quero um orçamento'}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </TrackedAnchor>
                  <Link
                    href="/#produtos"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
                  >
                    Ver sistemas no ar
                  </Link>
                </div>

                <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
                  {HERO_STATS.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="font-display whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-bold text-white">{stat.value}</dd>
                      <dd className="mt-1 text-xs md:text-sm text-slate-500">{stat.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Composição com prints reais */}
              <div className="relative mx-auto w-full max-w-xl lg:max-w-none animate-fade-in-delay">
                <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-neon-cyan/20 via-neon-violet/20 to-neon-pink/20 blur-2xl" />
                <div className="relative pl-6 pb-14 sm:pl-16 sm:pb-16">
                  <BrowserFrame
                    src="/portfolio/barbearia/painel-admin.webp"
                    alt="Painel administrativo do sistema de barbearia desenvolvido pela FocoDev"
                    url="admin.barbearia.focodev.com.br"
                    priority
                    className="lg:rotate-[1.5deg]"
                  />
                  <PhoneFrame
                    src="/portfolio/barbearia/app-horarios.webp"
                    alt="App de agendamento da barbearia aberto no celular"
                    priority
                    className="absolute bottom-0 left-0 w-[34%] sm:w-[30%] -rotate-6 animate-float"
                  />
                  <div className="absolute -top-5 right-2 sm:-right-4 hidden sm:block glass rounded-2xl px-4 py-3 shadow-xl animate-float-delay">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                        <ShoppingCart className="h-4 w-4" />
                      </span>
                      <div className="text-left">
                        <div className="text-xs text-slate-400">Novo pedido #1284</div>
                        <div className="text-sm font-semibold text-white">R$ 68,40 · Preparando</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-0 sm:right-6 hidden sm:block glass rounded-2xl px-4 py-3 shadow-xl animate-float">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-neon-violet/25 text-violet-200">
                        <CalendarCheck className="h-4 w-4" />
                      </span>
                      <div className="text-left">
                        <div className="text-xs text-slate-400">Horário confirmado</div>
                        <div className="text-sm font-semibold text-white">Hoje, 14:10 · Rafael</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TECNOLOGIAS (marquee) ================= */}
        <section aria-label="Tecnologias" className="relative border-y border-white/10 bg-white/[0.02] py-6">
          <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <div className="flex shrink-0 animate-marquee gap-12 pr-12">
              {[...TECH_STACK, 'TypeScript', 'n8n', 'Angular', 'GitHub Actions', ...TECH_STACK, 'TypeScript', 'n8n', 'Angular', 'GitHub Actions'].map((tech, i) => (
                <span key={`${tech}-${i}`} className="flex items-center gap-3 whitespace-nowrap font-display text-lg font-semibold text-slate-500">
                  <Sparkles className="h-4 w-4 text-neon-violet/70" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PRODUTOS ================= */}
        <section id="produtos" className="container relative py-16 md:py-24 scroll-mt-20">
          <span id="sistemas" className="absolute -top-20" aria-hidden />
          <span id="portfolio" className="absolute -top-20" aria-hidden />
          <SectionHeading
            eyebrow="Sistemas em produção"
            title={
              <>
                Não é mockup. <span className="text-gradient">É sistema rodando.</span>
              </>
            }
            subtitle="Produtos que desenvolvemos e mantemos no ar — e que podem ser adaptados para o seu negócio."
          />

          <div className="space-y-8 md:space-y-10">
            {SHOWCASE.map((item, index) => {
              const reverse = index % 2 === 1
              const linkProps = item.external
                ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: item.href }
              return (
                <article
                  key={item.slug}
                  data-reveal
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/60 p-6 sm:p-10 lg:p-12"
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent}`} />
                  <div className={`pointer-events-none absolute -bottom-24 ${reverse ? '-left-24' : '-right-24'} h-72 w-72 rounded-full ${item.glow} blur-[100px] opacity-60 transition-opacity duration-500 group-hover:opacity-100`} />
                  <div className={`relative grid items-center gap-10 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{item.tagline}</div>
                      <h3 className="mt-3 text-3xl md:text-4xl font-bold text-white">{item.title}</h3>
                      <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-400">{item.description}</p>
                      <ul className="mt-6 space-y-2.5">
                        {item.features.map((f) => (
                          <li key={f} className="flex items-center gap-3 text-slate-200">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                              <Check className="h-3.5 w-3.5 text-neon-cyan" />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.tech.map((t) => (
                          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        {...linkProps}
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-slate-200"
                      >
                        {item.cta}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="relative">
                      {item.desktop ? (
                        <div className={`relative ${item.mobile ? 'pt-10 sm:pt-16 pb-12 sm:pb-16 ' + (reverse ? 'pl-16 sm:pl-24' : 'pr-16 sm:pr-24') : ''}`}>
                          <BrowserFrame
                            src={item.desktop}
                            alt={`Tela do sistema ${item.title}`}
                            url={item.external ? item.href.replace('https://', '') : `focodev.com.br${item.href}`}
                            className="transition-transform duration-700 group-hover:-translate-y-1"
                          />
                          {item.mobile && (
                            <PhoneFrame
                              src={item.mobile}
                              alt={`${item.title} no celular`}
                              sizes="(max-width: 640px) 40vw, 260px"
                              className={`absolute bottom-0 w-[38%] max-w-[220px] ${reverse ? 'left-0 -rotate-3' : 'right-0 rotate-3'} transition-transform duration-700 group-hover:-translate-y-2`}
                            />
                          )}
                        </div>
                      ) : (
                        <div className="flex justify-center gap-5 sm:gap-8">
                          {[item.mobile, item.mobile2].filter(Boolean).map((src, i) => (
                            <PhoneFrame
                              key={src}
                              src={src as string}
                              alt={`${item.title} — tela ${i + 1}`}
                              className={`w-[42%] max-w-[230px] ${i === 0 ? '-rotate-3' : 'rotate-3 translate-y-8'} transition-transform duration-700 group-hover:-translate-y-2`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {extraProjects.length > 0 && (
            <div className="mt-16" data-reveal>
              <h3 className="mb-6 text-xl font-semibold text-white">Mais projetos</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {extraProjects.map((p: any) => {
                  const landing = getProjectHref(p.slug)
                  const external = PROJECT_EXTERNAL_URLS[p.slug]
                  return (
                    <Link key={p.id} href={external || landing} className="card group block overflow-hidden">
                      {p.coverImageUrl && (
                        <div className="relative aspect-[16/9] bg-ink-800">
                          <Image
                            src={p.coverImageUrl}
                            unoptimized={String(p.coverImageUrl).endsWith('.svg')}
                            alt={p.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="text-lg font-semibold text-white">{p.title}</div>
                        <p className="mt-2 line-clamp-3 text-sm text-slate-400">{p.description}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/projects" className="inline-flex items-center gap-2 font-semibold text-neon-cyan hover:text-white transition-colors">
              Ver portfólio completo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ================= SERVIÇOS ================= */}
        <section id="servicos" data-reveal className="container relative py-16 md:py-24 scroll-mt-20">
          <SectionHeading
            eyebrow="Serviços"
            title={
              <>
                Tudo o que seu projeto precisa, <span className="text-gradient">num lugar só</span>
              </>
            }
            subtitle="Do design ao servidor: você fala com quem constrói, sem intermediários."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {displayServices.map((s: { id: string; title: string; description: string }, index: number) => {
              const Icon = getServiceIcon(s.title)
              return (
                <div
                  key={s.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-neon-violet/0 blur-3xl transition-all duration-500 group-hover:bg-neon-violet/25" />
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${ICON_GRADIENTS[index % ICON_GRADIENTS.length]} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-400">{s.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ================= PROCESSO ================= */}
        <section id="processo" data-reveal className="container relative py-16 md:py-24 scroll-mt-20">
          <SectionHeading
            eyebrow="Como trabalhamos"
            title={
              <>
                Da ideia ao sistema no ar em <span className="text-gradient">4 passos</span>
              </>
            }
          />
          <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.title} className="relative rounded-3xl border border-white/10 bg-ink-900/60 p-7">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-ink-950 font-display text-lg font-bold">
                  <span className="text-gradient">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-400">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ================= VÍDEOS ================= */}
        {videos.length > 0 && (
          <section data-reveal className="container relative py-16 md:py-24">
            <SectionHeading eyebrow="Em ação" title="Trabalhos em vídeo" />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video: any) => {
                const videoId = getYouTubeVideoId(video.youtubeUrl)
                const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null
                return (
                  <div key={video.id} className="card overflow-hidden">
                    <div className="relative aspect-video bg-black">
                      {embedUrl ? (
                        <iframe
                          src={embedUrl}
                          title={video.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full"
                        />
                      ) : (
                        <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex h-full items-center justify-center">
                          <Play className="h-14 w-14 text-white/60" />
                        </a>
                      )}
                    </div>
                    <div className="p-5 font-semibold text-white">{video.title}</div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ================= SOBRE ================= */}
        <section id="sobre" data-reveal className="container relative py-16 md:py-24 scroll-mt-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Sobre a FocoDev</span>
              <h2 className="section-title mt-5">
                Tecnologia de ponta, <span className="text-gradient">atendimento de perto</span>
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-slate-400">
                {ABOUT_PARAGRAPHS.slice(0, 2).map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, title: 'Franca/SP', text: 'Atendimento presencial na região e remoto para todo o Brasil.' },
                { icon: Zap, title: 'Entrega ágil', text: 'Ciclos curtos com sistema funcionando desde as primeiras semanas.' },
                { icon: ShieldCheck, title: 'Segurança', text: 'HTTPS, backups, controle de acesso e boas práticas desde o início.' },
                { icon: PackageOpen, title: 'Você é dono', text: 'Código, domínio e dados do projeto ficam com você.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-ink-900/60 p-6">
                  <Icon className="h-6 w-6 text-neon-cyan" />
                  <div className="mt-4 font-display text-lg font-bold text-white">{title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div data-reveal>
          <FaqSection />
        </div>

        {/* ================= CONTATO ================= */}
        <section id="contato" data-reveal className="container relative py-16 md:py-24 scroll-mt-20">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-ink-900/70 p-6 sm:p-10 lg:p-14">
            <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-neon-cyan/20 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-neon-pink/20 blur-[110px]" />
            <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="eyebrow">Contato</span>
                <h2 className="mt-5 text-4xl md:text-6xl font-bold text-white leading-[1.05]">
                  Vamos tirar seu projeto <span className="text-gradient animate-gradient-x">do papel?</span>
                </h2>
                <p className="mt-6 max-w-md text-lg text-slate-400">
                  Conte o que você precisa. Respondemos rápido, com um caminho claro e orçamento sem compromisso.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <TrackedAnchor
                    kind="whatsapp"
                    source="home_contact_whatsapp"
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-white transition hover:bg-emerald-400"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chamar no WhatsApp
                  </TrackedAnchor>
                </div>
              </div>
              <ContactForm trackingSource="home" />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
