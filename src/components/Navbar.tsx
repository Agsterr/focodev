"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const logoSrc = process.env.NEXT_PUBLIC_LOGO_URL || '/logo.svg'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${
      scrolled 
        ? 'border-gray-200/80 dark:border-gray-800/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg shadow-gray-900/5' 
        : 'border-transparent bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
    }`}>
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10">
            {logoSrc.endsWith('.svg') ? (
              <img
                src={logoSrc}
                alt="FocoDev Sistemas"
                className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
              />
            ) : (
              <Image
                src={logoSrc}
                alt="FocoDev Sistemas"
                width={160}
                height={40}
                className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
                priority
              />
            )}
          </div>
          <span className="sr-only">FocoDev Sistemas</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink href="/#servicos">Serviços</NavLink>
          <NavLink href="/#sobre">Sobre</NavLink>
          <NavLink href="/projects">Portfólio</NavLink>
          <NavLink href="/#videos">Vídeos</NavLink>
          <NavLink href="/#contato">Contato</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="outline" size="sm" className="hidden sm:flex">Admin</Button>
          </Link>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Menu</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md animate-fade-in-up">
          <nav className="container py-6 flex flex-col gap-4">
            <MobileLink href="/#servicos" onClick={() => setMenuOpen(false)}>Serviços</MobileLink>
            <MobileLink href="/#sobre" onClick={() => setMenuOpen(false)}>Sobre</MobileLink>
            <MobileLink href="/projects" onClick={() => setMenuOpen(false)}>Portfólio</MobileLink>
            <MobileLink href="/#videos" onClick={() => setMenuOpen(false)}>Vídeos</MobileLink>
            <MobileLink href="/#contato" onClick={() => setMenuOpen(false)}>Contato</MobileLink>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <Link href="/admin" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">Admin</Button>
              </Link>
            </div>
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
      className="relative text-gray-700 dark:text-gray-300 hover:text-brand transition-all duration-200 font-medium after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-brand after:to-brand-dark after:transition-all after:duration-300 hover:after:w-full"
    >
      {children}
    </Link>
  )
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className="text-gray-700 dark:text-gray-300 hover:text-brand transition-colors py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
    >
      {children}
    </Link>
  )
}
