"use client"
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Não redirecionar se estiver na página de login ou logout
    if (pathname?.includes('/admin/login') || pathname?.includes('/admin/logout')) {
      return
    }

    // Se não está carregando e não tem sessão, redirecionar para login
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [session, status, pathname, router])

  // Se está na página de login, mostrar conteúdo sem layout
  if (pathname?.includes('/admin/login') || pathname?.includes('/admin/logout')) {
    return <>{children}</>
  }

  // Se não tem sessão ainda, mostrar loading
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  // Se não tem sessão, não mostrar nada (vai redirecionar)
  if (!session) {
    return null
  }

  return <>{children}</>
}

