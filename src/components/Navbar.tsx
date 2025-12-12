"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const logoSrc = process.env.NEXT_PUBLIC_LOGO_URL || '/logo.png'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 backdrop-blur ${scrolled ? 'bg-white/85 dark:bg-gray-900/85 shadow-soft' : 'bg-white/70 dark:bg-gray-900/70'}`}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {!logoError ? (
            <Image
              src={logoSrc}
              alt="FocoDev Sistemas"
              width={140}
              height={40}
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <svg viewBox="0 0 240 40" className="h-8 w-auto" aria-hidden>
              <defs>
                <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>
              <g fill="url(#brandGradient)">
                <circle cx="20" cy="20" r="12" fill="none" stroke="url(#brandGradient)" strokeWidth="4" />
                <rect x="30" y="26" width="12" height="4" rx="2" transform="rotate(45 30 26)" />
                <text x="56" y="26" fontSize="18" fontWeight="700">FocoDev</text>
              </g>
            </svg>
          )}
          <span className="sr-only">FocoDev Sistemas</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink href="/#servicos">Serviços</NavLink>
          <NavLink href="/#sobre">Sobre</NavLink>
          <NavLink href="/projects">Portfólio</NavLink>
          <NavLink href="/#videos">Vídeos</NavLink>
          <NavLink href="/#contato">Contato</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button variant="outline" size="sm">Admin</Button>
          </Link>
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
            <MobileLink href="/#servicos" onClick={() => setMenuOpen(false)}>Serviços</MobileLink>
            <MobileLink href="/#sobre" onClick={() => setMenuOpen(false)}>Sobre</MobileLink>
            <MobileLink href="/projects" onClick={() => setMenuOpen(false)}>Portfólio</MobileLink>
            <MobileLink href="/#videos" onClick={() => setMenuOpen(false)}>Vídeos</MobileLink>
            <MobileLink href="/#contato" onClick={() => setMenuOpen(false)}>Contato</MobileLink>
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
      className="relative text-gray-700 dark:text-gray-300 hover:text-brand transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-brand after:transition-transform hover:after:scale-x-100"
    >
      {children}
    </Link>
  )
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="text-gray-700 dark:text-gray-300 hover:text-brand transition-colors">
      {children}
    </Link>
  )
}
