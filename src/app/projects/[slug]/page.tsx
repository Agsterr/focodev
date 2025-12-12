import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

interface Props { params: { slug: string } }

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } })
  if (!project) return { title: 'Projeto' }
  return { title: project.title, description: project.description }
}

export default async function ProjectDetail({ params }: Props) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug }, include: { images: true } })
  if (!project) return notFound()
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{project.description}</p>
      <div className="grid md:grid-cols-3 gap-4">
        {project.images.map((img: typeof project.images[number]) => (
          <img key={img.id} src={img.url} alt={img.alt || ''} className="rounded" />
        ))}
      </div>
    </div>
  )
}
