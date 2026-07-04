import Image from 'next/image'
import { Quote, Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/site-content'

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="relative py-20 scroll-mt-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white to-white dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-950" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-dark/10 blur-3xl rounded-full" />

      <div className="container relative">
        <div className="text-center mb-14">
          <h2 className="section-title">
            <span className="inline-flex items-center gap-3">
              <span className="h-10 w-10 rounded-xl bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30">
                <Quote className="w-5 h-5 text-brand" />
              </span>
              O que dizem nossos clientes
            </span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Experiências de quem confiou na FocoDev para digitalizar o negócio
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((item, index) => (
            <article
              key={item.id}
              className="card p-6 md:p-7 flex flex-col h-full ring-1 ring-brand/10 hover:ring-brand/30"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex gap-1 mb-4" aria-label={`${item.rating} estrelas`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="flex-1 text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base mb-6">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-brand/20 shrink-0 bg-sky-50">
                  <Image
                    src={item.avatar}
                    alt={`Avatar ilustrado de ${item.name}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{item.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {item.role} · {item.company}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-10">
          Depoimentos ilustrativos com avatares fictícios para demonstração do site.
        </p>
      </div>
    </section>
  )
}
