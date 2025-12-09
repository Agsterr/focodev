import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
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
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {dbWarning && (
        <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 text-yellow-900 p-4 dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-200">
          {dbWarning}
        </div>
      )}
      <div className="grid md:grid-cols-4 gap-6">
        <CardStat title="Serviços" value={services} />
        <CardStat title="Projetos" value={projects} />
        <CardStat title="Vídeos" value={videos} />
        <CardStat title="Imagens" value={images} />
      </div>
      <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">Bem-vindo, {session?.user?.name}</div>
    </div>
  )
}

function CardStat({ title, value }: { title: string; value: number }) {
  return (
    <div className="border rounded-lg p-4 dark:border-gray-800">
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}
