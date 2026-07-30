import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import LogoutButton from './logout-button'
import AdminLayoutClient from './admin-layout-client'
import AdminLayoutContent from './admin-layout-content'
import AdminLogo from './admin-logo'
import ContactsNotification from '@/components/ContactsNotification'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Painel Admin',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  // Extrair apenas valores primitivos para evitar problemas de serialização
  const userName = session?.user?.name || session?.user?.email || ''

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/contacts', label: 'Mensagens', icon: '💬' },
    { href: '/admin/services', label: 'Serviços', icon: '⚙️' },
    { href: '/admin/projects', label: 'Projetos', icon: '💼' },
    { href: '/admin/videos', label: 'Vídeos', icon: '🎥' },
    { href: '/admin/images', label: 'Galeria', icon: '🖼️' },
    { href: '/admin/company', label: 'Empresa', icon: '🏢' },
    { href: '/admin/banner', label: 'Banner Home', icon: '🎨' },
    { href: '/admin/texts', label: 'Textos', icon: '📝' },
    { href: '/admin/users', label: 'Usuários', icon: '👥' },
    { href: '/admin/profile', label: 'Meu Perfil', icon: '👤' },
  ]

  return (
    <AdminLayoutClient>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm">
          <div className="container flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
            <Link href="/admin" className="flex items-center gap-3 group min-w-0">
              <AdminLogo />
              <span className="font-semibold text-lg truncate">Painel Admin</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <ContactsNotification />
              <div className="hidden text-sm text-gray-600 dark:text-gray-400 sm:block max-w-[160px] truncate">
                {userName}
              </div>
              <LogoutButton />
            </div>
          </div>
        </header>

        <AdminLayoutContent navItems={navItems}>
          {children}
        </AdminLayoutContent>
      </div>
    </AdminLayoutClient>
  )
}
