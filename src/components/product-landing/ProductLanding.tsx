import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Smartphone,
  Users,
  Building2,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ContactForm from '@/components/ContactForm'
import { getWhatsAppHref } from '@/lib/whatsapp'
import {
  type ProductLandingContent,
  type GalleryImage,
  groupImagesByGallery,
} from '@/lib/product-landings'

const audienceIcons = [Building2, Users, Smartphone]

type Props = {
  content: ProductLandingContent
  images: GalleryImage[]
}

export default function ProductLanding({ content, images }: Props) {
  const grouped = groupImagesByGallery(images, content.galleries)
  const waHref = getWhatsAppHref(content.whatsappMessage)

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-end md:items-center">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={content.coverImage}
            alt={content.brand}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        </div>

        <div className="container relative z-10 py-20 md:py-28">
          <div className="max-w-3xl animate-fade-in">
            <p className="text-brand text-sm md:text-base font-semibold tracking-wide uppercase mb-4">
              FocoDev · {content.badge}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4">
              {content.brand}
            </h1>
            <p className="text-xl md:text-2xl text-sky-100/95 font-medium leading-snug mb-4">
              {content.headline}
            </p>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              {content.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" variant="gradient" className="text-base px-8 py-6 rounded-xl">
                <a href="#orcamento" className="inline-flex items-center gap-1">
                  Faça seu orçamento
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 rounded-xl border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problema → Solução */}
      <section className="container py-20 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="animate-slide-in-left">
            <h2 className="section-title">{content.problemTitle}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{content.problemText}</p>
          </div>
          <div className="animate-slide-in-right">
            <h2 className="section-title">{content.solutionTitle}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{content.solutionText}</p>
          </div>
        </div>
      </section>

      {/* Para quem */}
      <section className="relative py-20 md:py-24 bg-sky-50/80 dark:bg-slate-900/40">
        <div className="container">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="section-title">Para quem é o {content.brand}?</h2>
            <p className="section-subtitle mb-0">
              {content.audiencesSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {content.audiences.map((audience, i) => {
              const Icon = audienceIcons[i % audienceIcons.length]
              return (
                <div key={audience.title} className="p-8 rounded-2xl bg-white/90 dark:bg-gray-900/90 ring-1 ring-brand/15">
                  <div className="h-12 w-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center ring-1 ring-brand/20 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{audience.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{audience.description}</p>
                  <ul className="space-y-2">
                    {audience.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* O que o produto faz */}
      <section className="container py-20 md:py-24">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="section-title">O que o {content.brand} entrega</h2>
          <p className="section-subtitle mb-0">Funcionalidades pensadas para o dia a dia — não para demonstração.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80"
            >
              <div className="inline-flex items-center gap-2 text-brand mb-3">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Recurso</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefícios / gatilhos */}
      <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-brand-dark/10" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center">Por que contratar agora</h2>
            <p className="section-subtitle text-center">
              Benefícios reais que viram argumento de venda — para sua academia, sua operação ou seu treino.
            </p>
            <ul className="space-y-4 mt-10">
              {content.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex gap-4 p-4 rounded-xl bg-white/90 dark:bg-gray-900/90 ring-1 ring-brand/15"
                >
                  <CheckCircle2 className="w-6 h-6 text-brand shrink-0" />
                  <span className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Galerias */}
      {content.galleries.map((gallery) => {
        const pics = grouped[gallery.id] || []
        return (
          <section key={gallery.id} id={`galeria-${gallery.id}`} className="container py-16 md:py-20 scroll-mt-24">
            <div className="mb-10 max-w-2xl">
              <h2 className="section-title">{gallery.title}</h2>
              <p className="section-subtitle mb-0">{gallery.description}</p>
            </div>
            {pics.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pics.map((img, index) => (
                  <div
                    key={img.id}
                    className="relative group overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-800"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="aspect-[4/3] relative bg-slate-100 dark:bg-slate-900">
                      <Image
                        src={img.url}
                        alt={cleanAlt(img.alt) || gallery.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    {cleanAlt(img.alt) && (
                      <div className="p-3 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900">
                        {cleanAlt(img.alt)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-brand/30 bg-sky-50/50 dark:bg-slate-900/50 p-10 md:p-14 text-center">
                <Smartphone className="w-10 h-10 text-brand mx-auto mb-4 opacity-70" />
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Galeria em atualização
                </p>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Em breve, prints reais de {gallery.title.toLowerCase()}. Enquanto isso, fale conosco para ver uma demonstração ao vivo.
                </p>
                <div className="mt-6">
                  <Button asChild variant="outline" className="rounded-xl">
                    <a href="#orcamento">Quero ver na prática</a>
                  </Button>
                </div>
              </div>
            )}
          </section>
        )
      })}

      {/* CTA + Contato */}
      <section id="orcamento" className="relative py-20 md:py-24 scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-r from-brand to-brand-dark opacity-95 pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{content.ctaTitle}</h2>
              <p className="text-lg text-white/90 leading-relaxed mb-8">{content.ctaText}</p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl bg-white text-brand hover:bg-white/90 font-semibold px-8 py-6"
                >
                  <a href={waHref} target="_blank" rel="noopener noreferrer">
                    Entre em contato para contratar
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-white/50 text-white hover:bg-white/10 hover:text-white px-8 py-6"
                >
                  <Link href="/#contato" className="inline-flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Contato geral do site
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-white/75">
                Sem cadastro aberto na internet: o acesso é liberado após contratação e configuração com a FocoDev.
              </p>
            </div>
            <div>
              <ContactForm defaultMessage={content.contactDefaultMessage} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function cleanAlt(alt: string | null | undefined) {
  if (!alt) return ''
  return alt
    .replace(/\[[^\]]+\]\s*/gi, '')
    .replace(/^(app|instrutor|aluno|painel)\s*[:\-–]\s*/i, '')
    .trim()
}
