"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
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
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/admin" className="text-2xl font-bold bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
            Painel Admin
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/login" 
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/admin/logout" 
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand transition-colors"
            >
              Logout
            </Link>
            <Link 
              href="/" 
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand transition-colors"
            >
              ← Voltar ao site
            </Link>
          </div>
        </div>
        <div className="flex gap-8">
          <aside className="w-64 shrink-0">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-brand to-brand-dark text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </aside>
          <div className="flex-1">
            <div className="card p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
