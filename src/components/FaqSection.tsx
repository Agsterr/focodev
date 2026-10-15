import JsonLd from '@/components/JsonLd'
import { FAQ_ITEMS } from '@/lib/site-content'
import { faqPageJsonLd } from '@/lib/seo'

export default function FaqSection() {
  return (
    <section id="faq" className="container py-16 md:py-24 scroll-mt-20" aria-labelledby="faq-heading">
      <JsonLd data={faqPageJsonLd([...FAQ_ITEMS])} />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-heading" className="section-title mt-5">
            Perguntas <span className="text-gradient">frequentes</span>
          </h2>
          <p className="section-subtitle mb-0">
            Respostas objetivas sobre desenvolvimento de software, orçamento e atendimento da FocoDev.
          </p>
        </div>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-ink-900/60 p-5 md:p-6 transition-colors open:border-neon-violet/40 dark:open:bg-ink-900"
            >
              <summary className="cursor-pointer list-none font-semibold text-lg text-gray-900 dark:text-white flex items-start justify-between gap-4">
                <span>{item.question}</span>
                <span
                  className="shrink-0 text-neon-cyan text-2xl leading-none transition group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-gray-700 dark:text-slate-400 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
