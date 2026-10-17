import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Route,
  Smartphone,
  Sparkles,
  Timer,
  UserCheck,
  Users,
  XCircle,
} from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import ScrollReveal from '@/components/ScrollReveal'
import TrackedAnchor from '@/components/TrackedAnchor'
import { BrowserFrame, PhoneFrame } from '@/components/home/DeviceFrames'
import { getWhatsAppHref } from '@/lib/whatsapp'
import {
  type GalleryCategory,
  type GalleryImage,
  type HeroChip,
  type ProductLandingContent,
  groupImagesByGallery,
} from '@/lib/product-landings'

const audienceIcons = [Building2, Users, Smartphone]

const HERO_CHIP_ICONS: Record<HeroChip['icon'], typeof Check> = {
  check: CheckCircle2,
  route: Route,
  timer: Timer,
  map: MapPin,
  user: UserCheck,
  chart: BarChart3,
}

type Props = {
  content: ProductLandingContent
  images: GalleryImage[]
}

export default function ProductLanding({ content, images }: Props) {
  const grouped = groupImagesByGallery(images, content.galleries)
  const waHref = getWhatsAppHref(content.whatsappMessage)

  const phoneGallery = content.galleries.find((g) => g.frame === 'phone')
  const browserGallery = content.galleries.find(
    (g) => g.frame === 'browser' && (grouped[g.id] || []).length > 0,
  )
  const heroPhones =
    content.heroPhones ?? (phoneGallery ? grouped[phoneGallery.id].map((img) => img.url) : [])
  const heroDesktop =
    content.heroDesktop ?? (browserGallery ? grouped[browserGallery.id][0]?.url : undefined)
  const heroDesktopUrl =
    content.heroDesktopUrl ??
    content.galleries.find((g) => g.frame === 'browser' && g.url)?.url ??
    'focodev.com.br'

  return (
    <div className="overflow-x-clip">
      <ScrollReveal />

      {/* ================= HERO ================= */}
      <section className="relative -mt-16 md:-mt-20 pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-neon-cyan/25 blur-[120px] animate-aurora" />
        <div className="pointer-events-none absolute top-10 -right-40 h-[32rem] w-[32rem] rounded-full bg-neon-violet/30 blur-[120px] animate-aurora-slow" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-neon-pink/20 blur-[120px] animate-aurora" />

        <div className="container relative">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
            <div className="animate-fade-in">
              <span className="eyebrow">FocoDev · {content.badge}</span>
              <h1 className="mt-6 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-bold text-white">
                {content.brand}
              </h1>
              <p className="mt-5 text-2xl md:text-3xl font-semibold leading-snug">
                <span className="text-gradient animate-gradient-x">{content.headline}</span>
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">{content.subheadline}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedAnchor
                  kind="cta"
                  source={`${content.slug}_hero_orcamento`}
                  href="#orcamento"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink bg-[length:200%_auto] bg-left px-7 py-4 text-base font-semibold text-white shadow-neon transition-[background-position,transform] duration-500 hover:bg-right hover:-translate-y-0.5"
                >
                  Faça seu orçamento
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </TrackedAnchor>
                <TrackedAnchor
                  kind="whatsapp"
                  source={`${content.slug}_hero_whatsapp`}
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Falar no WhatsApp
                </TrackedAnchor>
              </div>

              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {content.highlights.map((item) => (
                  <div key={item.label}>
                    <dt className="sr-only">{item.label}</dt>
                    <dd className="font-display whitespace-nowrap text-lg sm:text-2xl font-bold text-white">
                      {item.value}
                    </dd>
                    <dd className="mt-1 text-xs md:text-sm text-slate-500">{item.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <HeroDevices
              brand={content.brand}
              desktop={heroDesktop}
              desktopUrl={heroDesktopUrl}
              phones={heroPhones}
              chips={content.heroChips}
            />
          </div>
        </div>
      </section>

      {/* ================= PROBLEMA → SOLUÇÃO ================= */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div
            data-reveal
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/60 p-8 md:p-10"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-rose-500/15 blur-[90px]" />
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">
              <XCircle className="h-3.5 w-3.5" /> O problema
            </span>
            <h2 className="mt-5 text-2xl md:text-3xl font-bold text-white">{content.problemTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">{content.problemText}</p>
          </div>
          <div
            data-reveal
            className="relative overflow-hidden rounded-[2rem] border border-neon-violet/30 bg-ink-900/60 p-8 md:p-10 shadow-neon"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-neon-violet/10 to-transparent" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" /> A solução
              </span>
              <h2 className="mt-5 text-2xl md:text-3xl font-bold text-white">{content.solutionTitle}</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">{content.solutionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALERIAS (prints em moldura de celular / navegador) ================= */}
      {content.galleries.map((gallery, index) => (
        <GallerySection
          key={gallery.id}
          gallery={gallery}
          images={grouped[gallery.id] || []}
          eyebrow={index === 0 ? 'Telas reais' : 'Por dentro do sistema'}
        />
      ))}

      {/* ================= RECURSOS ================= */}
      <section className="container py-16 md:py-24">
        <Heading
          eyebrow="Recursos"
          title={
            <>
              O que o {content.brand} <span className="text-gradient">entrega</span>
            </>
          }
          subtitle="Funcionalidades pensadas para o dia a dia — não para demonstração."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.features.map((feature) => (
            <div key={feature.title} data-reveal>
              <div className="card h-full p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-violet/30 text-neon-cyan ring-1 ring-white/10">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PARA QUEM ================= */}
      <section className="relative border-y border-white/10 bg-white/[0.02] py-16 md:py-24">
        <div className="container">
          <Heading
            eyebrow="Para quem é"
            title={
              <>
                Para quem é o <span className="text-gradient">{content.brand}</span>?
              </>
            }
            subtitle={content.audiencesSubtitle}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {content.audiences.map((audience, i) => {
              const Icon = audienceIcons[i % audienceIcons.length]
              return (
                <div
                  key={audience.title}
                  data-reveal
                  className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-900/70 p-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-cyan via-neon-violet to-neon-pink text-white shadow-neon">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-white">{audience.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-400">{audience.description}</p>
                  <ul className="mt-6 space-y-3">
                    {audience.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm text-slate-200">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                          <Check className="h-3 w-3 text-neon-cyan" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= BENEFÍCIOS ================= */}
      <section className="container py-16 md:py-24">
        <Heading
          eyebrow="Por que contratar agora"
          title={
            <>
              Benefícios que <span className="text-gradient">viram resultado</span>
            </>
          }
          subtitle="Para sua academia, sua operação ou seu treino."
        />
        <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {content.benefits.map((benefit) => (
            <li
              key={benefit}
              data-reveal
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-ink-900/60 p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                <Check className="h-4 w-4" />
              </span>
              <span className="font-medium leading-relaxed text-slate-200">{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= CTA + CONTATO ================= */}
      <section id="orcamento" className="container scroll-mt-24 pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/70 p-6 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-cyan/15 via-neon-violet/15 to-neon-pink/10" />
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-neon-violet/30 blur-[110px]" />
          <div className="relative grid items-start gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Orçamento sem compromisso</span>
              <h2 className="mt-5 text-3xl md:text-4xl font-bold leading-tight text-white">{content.ctaTitle}</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">{content.ctaText}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrackedAnchor
                  kind="whatsapp"
                  source={`${content.slug}_cta_whatsapp`}
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-ink-950 transition hover:bg-slate-200"
                >
                  Contratar pelo WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </TrackedAnchor>
                <Link
                  href="/#contato"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  <MessageSquare className="h-4 w-4" />
                  Contato geral do site
                </Link>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                Sem cadastro aberto na internet: o acesso é liberado após contratação e configuração com a FocoDev.
              </p>
            </div>
            <ContactForm defaultMessage={content.contactDefaultMessage} trackingSource={content.slug} />
          </div>
        </div>
      </section>
    </div>
  )
}

function Heading({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title mt-5">{title}</h2>
      {subtitle && <p className="section-subtitle mb-0">{subtitle}</p>}
    </div>
  )
}

/** Composição do topo: navegador + celulares, ou leque de celulares quando não há print web. */
function HeroDevices({
  brand,
  desktop,
  desktopUrl,
  phones,
  chips,
}: {
  brand: string
  desktop?: string
  desktopUrl: string
  phones: string[]
  chips: HeroChip[]
}) {
  const [chipTop, chipBottom] = chips

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none animate-fade-in-delay">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-neon-cyan/20 via-neon-violet/20 to-neon-pink/20 blur-2xl" />
      {desktop ? (
        <div className="relative pb-16 pl-6 sm:pb-20 sm:pl-16">
          <BrowserFrame
            src={desktop}
            alt={`${brand} no navegador`}
            url={desktopUrl}
            priority
            className="lg:rotate-[1.5deg]"
          />
          {phones[0] && (
            <PhoneFrame
              src={phones[0]}
              alt={`${brand} no celular`}
              priority
              sizes="(max-width: 640px) 34vw, 220px"
              className="absolute bottom-0 left-0 w-[34%] sm:w-[30%] -rotate-6 animate-float"
            />
          )}
          {phones[1] && (
            <PhoneFrame
              src={phones[1]}
              alt={`${brand} no celular — outra tela`}
              sizes="(max-width: 640px) 30vw, 200px"
              className="absolute -bottom-6 right-[6%] hidden w-[26%] rotate-6 animate-float-delay md:block"
            />
          )}
        </div>
      ) : (
        <div className="relative flex items-end justify-center gap-3 px-2 pb-6 pt-4 sm:gap-5 sm:pb-24">
          {phones.slice(0, 3).map((src, i, list) => {
            const center = list.length === 3 ? i === 1 : i === 0
            return (
              <PhoneFrame
                key={src}
                src={src}
                alt={`${brand} — tela ${i + 1}`}
                priority={center}
                sizes="(max-width: 640px) 38vw, 250px"
                className={
                  center
                    ? 'relative z-10 w-[38%] max-w-[250px] animate-float'
                    : `w-[30%] max-w-[200px] opacity-90 translate-y-6 ${i === 0 ? '-rotate-6' : 'rotate-6'}`
                }
              />
            )
          })}
        </div>
      )}

      {chipTop && (
        <FloatingChip
          chip={chipTop}
          color="bg-emerald-500/20 text-emerald-300"
          className="-top-5 right-2 sm:-right-4 animate-float-delay"
        />
      )}
      {chipBottom && (
        <FloatingChip
          chip={chipBottom}
          color="bg-neon-violet/25 text-violet-200"
          className={`${desktop ? 'bottom-2 left-[33%]' : 'bottom-0 left-[4%]'} animate-float`}
        />
      )}
    </div>
  )
}

function FloatingChip({ chip, color, className }: { chip: HeroChip; color: string; className: string }) {
  const Icon = HERO_CHIP_ICONS[chip.icon]
  return (
    <div
      className={`absolute z-20 hidden sm:block rounded-2xl border border-white/10 bg-ink-900/90 px-4 py-3 shadow-xl shadow-black/50 backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-4 w-4" />
        </span>
        <div className="text-left">
          <div className="text-xs text-slate-400">{chip.label}</div>
          <div className="whitespace-nowrap text-sm font-semibold text-white">{chip.value}</div>
        </div>
      </div>
    </div>
  )
}

function GallerySection({
  gallery,
  images,
  eyebrow,
}: {
  gallery: GalleryCategory
  images: GalleryImage[]
  eyebrow: string
}) {
  return (
    <section id={`galeria-${gallery.id}`} className="relative scroll-mt-24 py-16 md:py-24">
      {gallery.frame === 'phone' && (
        <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-72 max-w-4xl rounded-full bg-neon-violet/15 blur-[120px]" />
      )}
      <div className="container relative">
        <Heading eyebrow={eyebrow} title={gallery.title} subtitle={gallery.description} />

        {images.length === 0 ? (
          <div
            data-reveal
            className="mx-auto max-w-2xl rounded-[2rem] border border-dashed border-white/15 bg-ink-900/50 p-10 text-center md:p-14"
          >
            <Smartphone className="mx-auto mb-4 h-10 w-10 text-neon-cyan opacity-80" />
            <p className="mb-2 text-lg font-semibold text-white">Galeria em atualização</p>
            <p className="mx-auto max-w-md text-slate-400">
              Em breve, prints reais de {gallery.title.toLowerCase()}. Enquanto isso, fale conosco para ver uma
              demonstração ao vivo.
            </p>
            <a
              href="#orcamento"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Quero ver na prática
            </a>
          </div>
        ) : gallery.frame === 'phone' ? (
          // Celulares lado a lado; no celular vira carrossel com rolagem lateral
          <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-8">
            {images.map((img, i) => (
              <figure key={img.id} data-reveal className="w-[68%] shrink-0 snap-center sm:w-auto">
                <div className={i % 2 === 1 ? 'lg:translate-y-10' : ''}>
                  <PhoneFrame
                    src={img.url}
                    alt={cleanAlt(img.alt) || gallery.title}
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 280px"
                    className="mx-auto max-w-[280px] transition-transform duration-500 hover:-translate-y-2"
                  />
                  {cleanAlt(img.alt) && (
                    <figcaption className="mx-auto mt-5 max-w-[260px] text-center text-sm leading-snug text-slate-400">
                      {cleanAlt(img.alt)}
                    </figcaption>
                  )}
                </div>
              </figure>
            ))}
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-10 lg:grid-cols-2">
            {images.map((img, i) => (
              <figure
                key={img.id}
                data-reveal
                className={i === 0 && images.length % 2 === 1 ? 'lg:col-span-2 lg:mx-auto lg:w-4/5' : ''}
              >
                <BrowserFrame
                  src={img.url}
                  alt={cleanAlt(img.alt) || gallery.title}
                  url={gallery.url}
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="transition-transform duration-500 hover:-translate-y-1"
                />
                {cleanAlt(img.alt) && (
                  <figcaption className="mt-4 text-center text-sm text-slate-400">{cleanAlt(img.alt)}</figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function cleanAlt(alt: string | null | undefined) {
  if (!alt) return ''
  return alt
    .replace(/\[[^\]]+\]\s*/gi, '')
    .replace(/^(app|instrutor|aluno|painel)\s*[:\-–]\s*/i, '')
    .trim()
}
