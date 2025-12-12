"use client"
import Link from 'next/link'

export default function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const href = number ? `https://wa.me/${number}` : 'https://wa.me/'
  return (
    <Link
      href={href}
      target="_blank"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-4 shadow-glow hover:from-green-600 hover:to-green-700 ring-2 ring-white/50 animate-pulse"
    >
      <span className="inline-flex items-center gap-2 font-semibold">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20 3H4a1 1 0 0 0-1 1v16l4-4h13a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z" />
        </svg>
        WhatsApp
      </span>
    </Link>
  )
}
