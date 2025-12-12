import Link from 'next/link'
import { prisma } from '@/lib/db'

export const metadata = { title: 'Portfólio' }
export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Portfólio</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p: typeof projects[number]) => (
          <Link key={p.id} href={`/projects/${p.slug}`} className="border rounded-lg p-4 dark:border-gray-800">
            <div className="font-semibold mb-2">{p.title}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{p.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
