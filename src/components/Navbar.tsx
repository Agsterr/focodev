"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import FocoDevLogo from '@/components/FocoDevLogo'

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
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${
      scrolled 
        ? 'border-gray-200/80 dark:border-gray-800/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'border-transparent bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
    }`}>
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {logoSrc ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Image
                src={logoSrc}
                alt="FocoDev Sistemas"
                width={180}
                height={50}
                className="relative h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <FocoDevLogo 
                className="relative h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                width={180}
                height={50}
              />
            </div>
          )}
          <span className="sr-only">FocoDev Sistemas</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2 text-sm">
          <NavLink href="/#servicos">Serviços</NavLink>
          <NavLink href="/#sobre">Sobre</NavLink>
          <NavLink href="/projects">Portfólio</NavLink>
          <NavLink href="/#videos">Vídeos</NavLink>
          <NavLink href="/#contato">Contato</NavLink>
          <Button asChild size="sm" className="ml-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <Link href="/#contato">Fale Conosco</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl border-2 border-gray-200 dark:border-gray-700 p-2.5 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
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
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/98 dark:bg-gray-900/98 backdrop-blur-md shadow-lg">
          <nav className="container py-6 flex flex-col gap-2">
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
      className="relative px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 group"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </Link>
  )
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className="px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300"
    >
      {children}
    </Link>
  )
}
