'use client'

import TrackedAnchor from '@/components/TrackedAnchor'
import { getWhatsAppHref } from '@/lib/whatsapp'

export default function WhatsAppButton() {
  const href = getWhatsAppHref('Olá, gostaria de fazer um orçamento')

  return (
    <TrackedAnchor
      kind="whatsapp"
      source="floating_button"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="group fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_10px_30px_-5px_rgba(16,185,129,0.6)] ring-1 ring-white/20 transition hover:scale-105 hover:bg-emerald-400 sm:w-auto sm:px-5 pointer-events-auto"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-500/40 [animation-duration:2.5s]" aria-hidden />
      <span className="inline-flex items-center gap-2 font-semibold">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.08c-.24.68-1.43 1.32-1.97 1.37-.5.05-.98.24-3.33-.69-2.83-1.12-4.62-4.02-4.76-4.21-.14-.19-1.14-1.52-1.14-2.9s.72-2.06.98-2.34c.26-.28.56-.35.75-.35l.54.01c.17.01.41-.07.64.49.24.57.81 1.97.88 2.11.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.17-.3.37-.42.5-.14.14-.29.29-.12.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.29 1.41.28.14.45.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.09 1.66.78 1.94.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
        </svg>
        <span className="hidden sm:inline">WhatsApp</span>
      </span>
    </TrackedAnchor>
  )
}
