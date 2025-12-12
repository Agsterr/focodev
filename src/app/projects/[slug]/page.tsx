import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'

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
    <div className="container py-12 md:py-20">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar ao portfólio
        </Link>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          {project.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </div>

      {/* Images Gallery */}
      {project.images.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.images.map((img: typeof project.images[number], index: number) => (
            <div 
              key={img.id} 
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={img.url}
                  alt={img.alt || project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {img.alt && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">{img.alt}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to Portfolio Button */}
      <div className="mt-12 text-center">
        <Button asChild size="lg" variant="outline" className="rounded-xl">
          <Link href="/projects">Ver mais projetos</Link>
        </Button>
      </div>
    </div>
  )
}
