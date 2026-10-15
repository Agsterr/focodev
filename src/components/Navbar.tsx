"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { trackCtaClick } from '@/lib/analytics'

const LINKS = [
  { href: '/#produtos', label: 'Produtos' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#processo', label: 'Como trabalhamos' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contato', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center shrink-0" aria-label="FocoDev Sistemas — início">
          <Image src="/logo-dark.svg" alt="FocoDev Sistemas" width={200} height={47} priority unoptimized className="h-10 md:h-11 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1.5 backdrop-blur" aria-label="Principal">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contato"
            onClick={() => trackCtaClick('navbar_orcar', '/#contato')}
            className="hidden sm:inline-flex group items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink bg-[length:200%_auto] bg-left px-5 py-2.5 text-sm font-semibold text-white shadow-neon transition-[background-position] duration-500 hover:bg-right"
          >
            Orçar projeto
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-white/10">
          <nav className="container flex flex-col py-4" aria-label="Menu móvel">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-lg font-semibold text-slate-200 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contato"
              onClick={() => {
                setMenuOpen(false)
                trackCtaClick('navbar_mobile_orcar', '/#contato')
              }}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink px-5 py-3 font-semibold text-white"
            >
              Orçar projeto <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
