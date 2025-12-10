import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import LogoutButton from './logout-button'
import AdminLayoutClient from './admin-layout-client'
import AdminLayoutContent from './admin-layout-content'
import AdminLogo from './admin-logo'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
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
          <div className="container flex h-16 items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3 group">
              <AdminLogo />
              <span className="font-semibold text-lg">Painel Admin</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {session?.user?.name || session?.user?.email}
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
