'use client'

import { useEffect } from 'react'

/**
 * Anima a entrada dos elementos marcados com `data-reveal` quando aparecem na tela.
 * O estado "escondido" só é aplicado depois que o JS roda (classe `reveal-ready`
 * no <html>), então sem JS ou com "reduzir movimento" o conteúdo aparece normal.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    )

    // Elementos já visíveis no carregamento não animam (evita "piscar" no topo)
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight) el.classList.add('is-visible')
      else observer.observe(el)
    })
    document.documentElement.classList.add('reveal-ready')

    return () => observer.disconnect()
  }, [])

  return null
}
