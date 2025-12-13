"use client"
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  // Para rotas admin, não mostrar Navbar, Footer e WhatsAppButton
  // O layout admin já tem sua própria estrutura completa
  if (isAdminRoute) {
    return <>{children}</>
  }

  // Para rotas normais, mostrar layout completo
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}




