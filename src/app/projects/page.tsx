import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/db'

export const metadata = { title: 'Portfólio' }
export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ 
    orderBy: { createdAt: 'desc' },
    include: { images: true }
  })
  
  return (
    <div className="container py-12 md:py-20">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          Nosso Portfólio
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Conheça alguns dos projetos que desenvolvemos com dedicação e excelência
        </p>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-400 text-lg">Nenhum projeto disponível no momento.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p: typeof projects[number], index: number) => {
            const coverImageUrl = p.coverImageUrl || (p.images && p.images.length > 0 ? p.images[0].url : null)
            
            return (
              <Link 
                key={p.id} 
                href={`/projects/${p.slug}`} 
                className="card p-0 group block overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {coverImageUrl && (
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={coverImageUrl}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-4">
                    {p.description}
                  </p>
                  <div className="text-brand text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    Ver projeto
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
