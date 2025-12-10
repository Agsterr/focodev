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
      className="fixed bottom-6 right-6 rounded-full bg-green-500 text-white px-4 py-3 shadow-lg hover:bg-green-600"
    >
      WhatsApp
    </Link>
  )
}
