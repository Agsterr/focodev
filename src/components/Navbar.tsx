"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Wrench, Info, Briefcase, MessageSquare } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const logoSrc = process.env.NEXT_PUBLIC_LOGO_URL

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 backdrop-blur-md transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg' : 'bg-white/80 dark:bg-gray-900/80'}`}>
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="FocoDev Sistemas"
              width={200}
              height={60}
              className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
          ) : (
            <svg viewBox="0 0 240 50" className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105" aria-hidden>
              <defs>
                <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>
              <g>
                {/* Lupa - círculo externo */}
                <circle cx="20" cy="20" r="12" fill="none" stroke="url(#brandGradient)" strokeWidth="3" />
                {/* Círculo interno */}
                <circle cx="16" cy="16" r="4" fill="url(#brandGradient)" />
                {/* Cabo da lupa */}
                <line x1="28" y1="28" x2="35" y2="35" stroke="url(#brandGradient)" strokeWidth="3" strokeLinecap="round" />
                {/* Texto FocoDev */}
                <text x="45" y="25" fontSize="22" fontWeight="700" fill="url(#brandGradient)" fontFamily="Arial, sans-serif">
                  FocoDev
                </text>
                {/* Texto SISTEMAS */}
                <text x="45" y="38" fontSize="12" fontWeight="600" fill="url(#brandGradient)" fontFamily="Arial, sans-serif">
                  SISTEMAS
                </text>
              </g>
            </svg>
          )}
          <span className="sr-only">FocoDev Sistemas</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-base md:text-lg">
          <NavLink href="/#servicos">
            <span className="inline-flex items-center gap-2 font-semibold">
              <span className="h-9 w-9 rounded-md bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30 group-hover:from-brand/30 group-hover:to-brand-dark/30">
                <Wrench className="w-6 h-6 text-brand" aria-hidden />
              </span>
              Serviços
            </span>
          </NavLink>
          <NavLink href="/#sobre">
            <span className="inline-flex items-center gap-2 font-semibold">
              <span className="h-9 w-9 rounded-md bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30 group-hover:from-brand/30 group-hover:to-brand-dark/30">
                <Info className="w-6 h-6 text-brand" aria-hidden />
              </span>
              Sobre
            </span>
          </NavLink>
          <NavLink href="/projects">
            <span className="inline-flex items-center gap-2 font-semibold">
              <span className="h-9 w-9 rounded-md bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30 group-hover:from-brand/30 group-hover:to-brand-dark/30">
                <Briefcase className="w-6 h-6 text-brand" aria-hidden />
              </span>
              Portfólio
            </span>
          </NavLink>
          <NavLink href="/#contato">
            <span className="inline-flex items-center gap-2 font-semibold">
              <span className="h-9 w-9 rounded-md bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30 group-hover:from-brand/30 group-hover:to-brand-dark/30">
                <MessageSquare className="w-6 h-6 text-brand" aria-hidden />
              </span>
              Contato
            </span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button asChild variant="gradient" size="sm">
              <Link href="/#contato">Orçar Projeto</Link>
            </Button>
          </div>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95">
          <nav className="container py-4 flex flex-col gap-3">
            <MobileLink href="/#servicos" onClick={() => setMenuOpen(false)}>
              <span className="inline-flex items-center gap-2 text-xl font-semibold">
                <span className="h-10 w-10 rounded-md bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30 group-hover:from-brand/30 group-hover:to-brand-dark/30">
                  <Wrench className="w-6 h-6 text-brand" aria-hidden />
                </span>
                Serviços
              </span>
            </MobileLink>
            <MobileLink href="/#sobre" onClick={() => setMenuOpen(false)}>
              <span className="inline-flex items-center gap-2 text-xl font-semibold">
                <span className="h-10 w-10 rounded-md bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30 group-hover:from-brand/30 group-hover:to-brand-dark/30">
                  <Info className="w-6 h-6 text-brand" aria-hidden />
                </span>
                Sobre
              </span>
            </MobileLink>
            <MobileLink href="/projects" onClick={() => setMenuOpen(false)}>
              <span className="inline-flex items-center gap-2 text-xl font-semibold">
                <span className="h-10 w-10 rounded-md bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30 group-hover:from-brand/30 group-hover:to-brand-dark/30">
                  <Briefcase className="w-6 h-6 text-brand" aria-hidden />
                </span>
                Portfólio
              </span>
            </MobileLink>
            <MobileLink href="/#contato" onClick={() => setMenuOpen(false)}>
              <span className="inline-flex items-center gap-2 text-xl font-semibold">
                <span className="h-10 w-10 rounded-md bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30 group-hover:from-brand/30 group-hover:to-brand-dark/30">
                  <MessageSquare className="w-6 h-6 text-brand" aria-hidden />
                </span>
                Contato
              </span>
            </MobileLink>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative text-gray-700 dark:text-gray-300 hover:text-brand transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-brand after:transition-transform hover:after:scale-x-100"
    >
      {children}
    </Link>
  )
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="group inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand transition-colors">
      {children}
    </Link>
  )
}
