import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  
  // Extrair apenas valores primitivos para evitar problemas de serialização
  const userName = session?.user?.name || session?.user?.email || ''
  const userEmail = session?.user?.email || ''
  
  let services = 0
  let projects = 0
  let videos = 0
  let images = 0
  let dbWarning: string | null = null
  try {
    const counts = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.video.count(),
      prisma.image.count(),
    ])
    ;[services, projects, videos, images] = counts
  } catch (e: any) {
    dbWarning = 'DATABASE_URL não está configurada. Defina em .env.local e reinicie o servidor'
  }
  
  const stats = [
    { title: 'Serviços', value: services, icon: '⚙️', href: '/admin/services', color: 'blue' },
    { title: 'Projetos', value: projects, icon: '💼', href: '/admin/projects', color: 'green' },
    { title: 'Vídeos', value: videos, icon: '🎥', href: '/admin/videos', color: 'purple' },
    { title: 'Imagens', value: images, icon: '🖼️', href: '/admin/images', color: 'orange' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Bem-vindo, <span className="font-semibold text-gray-900 dark:text-white">{userName}</span>
        </p>
      </div>

      {dbWarning && (
        <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 text-yellow-900 p-4 dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-200">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <p>{dbWarning}</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="group"
          >
            <CardStat
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Acesso Rápido
          </h2>
          <div className="space-y-2">
            <QuickLink href="/admin/company" label="Configurações da Empresa" />
            <QuickLink href="/admin/banner" label="Banner da Home" />
            <QuickLink href="/admin/texts" label="Textos do Site" />
            <QuickLink href="/admin/users" label="Gerenciar Usuários" />
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Informações
          </h2>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Email:</span> {userEmail}
            </div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Perfil:</span> Administrador
            </div>
            <div>
              <Link href="/" className="text-brand hover:underline">
                Ver site público →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CardStat({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  }

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 group-hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
      </div>
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
    </div>
  )
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand transition-colors"
    >
      → {label}
    </Link>
  )
}
