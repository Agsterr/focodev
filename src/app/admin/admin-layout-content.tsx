"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'

interface NavItem {
  href: string
  label: string
  icon: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminLayoutContent({ 
  children, 
  navItems 
}: { 
  children: React.ReactNode
  navItems: NavItem[]
}) {
  const pathname = usePathname()
  
  // Buscar contagem de mensagens novas
  const { data: contactsData } = useSWR('/api/contacts?page=1&pageSize=1&status=NOVO', fetcher, {
    refreshInterval: 30000, // Atualizar a cada 30 segundos
  })
  const newMessagesCount = contactsData?.data?.pagination?.total || 0

  return (
    <div className="container px-4 py-6 sm:py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <aside className="w-full lg:w-64 lg:shrink-0">
          <nav className="space-y-1 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-2 shadow-sm max-h-[70vh] overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
              const isProfile = item.href === '/admin/profile'
              const isContacts = item.href === '/admin/contacts'
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer select-none relative ${
                    isActive
                      ? 'bg-brand/10 text-brand dark:bg-brand/20 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand'
                  } ${isProfile ? 'border-l-4 border-brand' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <span className="text-lg pointer-events-none">{item.icon}</span>
                  <span className="pointer-events-none flex-1">{item.label}</span>
                  {isContacts && newMessagesCount > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse pointer-events-none">
                      {newMessagesCount}
                    </span>
                  )}
                  {isProfile && <span className="ml-auto text-xs text-brand pointer-events-none">⚙️</span>}
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-4 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
