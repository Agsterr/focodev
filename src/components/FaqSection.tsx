import JsonLd from '@/components/JsonLd'
import { FAQ_ITEMS } from '@/lib/site-content'
import { faqPageJsonLd } from '@/lib/seo'

export default function FaqSection() {
  return (
    <section id="faq" className="container py-20 scroll-mt-24" aria-labelledby="faq-heading">
      <JsonLd data={faqPageJsonLd([...FAQ_ITEMS])} />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="section-title">
            Perguntas frequentes
          </h2>
          <p className="section-subtitle mb-0">
            Respostas objetivas sobre desenvolvimento de software, orçamento e atendimento da FocoDev.
          </p>
        </div>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 p-5 md:p-6 open:ring-1 open:ring-brand/25"
            >
              <summary className="cursor-pointer list-none font-semibold text-lg text-gray-900 dark:text-white flex items-start justify-between gap-4">
                <span>{item.question}</span>
                <span
                  className="shrink-0 text-brand text-xl leading-none transition group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
