"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  label: string
  icon: string
}

export default function AdminLayoutContent({ 
  children, 
  navItems 
}: { 
  children: React.ReactNode
  navItems: NavItem[]
}) {
  const pathname = usePathname()

  return (
    <div className="container py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 shrink-0">
          <nav className="space-y-1 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-2 shadow-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
              const isProfile = item.href === '/admin/profile'
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer select-none ${
                    isActive
                      ? 'bg-brand/10 text-brand dark:bg-brand/20 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand'
                  } ${isProfile ? 'border-l-4 border-brand' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <span className="text-lg pointer-events-none">{item.icon}</span>
                  <span className="pointer-events-none">{item.label}</span>
                  {isProfile && <span className="ml-auto text-xs text-brand pointer-events-none">⚙️</span>}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

