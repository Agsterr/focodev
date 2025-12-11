import Link from 'next/link'
import type { Metadata } from 'next'
import { prisma } from '@/lib/db'

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://focodev.com.br'
  
  return {
    title: 'Portfólio',
    description: 'Explore nosso portfólio de projetos desenvolvidos. Soluções digitais inovadoras, sites modernos, aplicativos e sistemas personalizados que transformam negócios.',
    keywords: [
      'portfólio',
      'projetos desenvolvidos',
      'cases de sucesso',
      'desenvolvimento web',
      'aplicativos',
      'sistemas personalizados',
      'FocoDev portfólio',
      'projetos de tecnologia',
    ],
    openGraph: {
      title: 'Portfólio | FocoDev Sistemas',
      description: 'Explore nosso portfólio de projetos desenvolvidos. Soluções digitais inovadoras que transformam negócios.',
      url: `${siteUrl}/projects`,
      siteName: 'FocoDev Sistemas',
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Portfólio FocoDev Sistemas',
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Portfólio | FocoDev Sistemas',
      description: 'Explore nosso portfólio de projetos desenvolvidos. Soluções digitais inovadoras que transformam negócios.',
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}/projects`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ 
    orderBy: { createdAt: 'desc' },
    include: { images: true }
  })
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="container py-16 md:py-24">
        {/* Header Section com símbolos */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="absolute -left-4 md:-left-8 text-4xl md:text-6xl opacity-20 dark:opacity-10">✨</div>
            <div className="absolute -right-4 md:-right-8 text-4xl md:text-6xl opacity-20 dark:opacity-10">🚀</div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent relative z-10">
              Portfólio
            </h1>
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-blue-500 to-cyan-500"></div>
            <span className="text-2xl">💼</span>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent via-cyan-500 to-teal-500"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Projetos que transformam ideias em <span className="font-semibold text-blue-600 dark:text-blue-400">soluções digitais</span> de impacto
          </p>
        </div>

        {/* Grid de Projetos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p: typeof projects[number], index: number) => (
            <Link 
              key={p.id} 
              href={`/projects/${p.slug}`} 
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradiente de fundo animado */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-blue-500/10 group-hover:via-cyan-500/10 group-hover:to-teal-500/10 transition-all duration-500"></div>
              
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
              </div>

              {/* Conteúdo do Card */}
              <div className="relative z-10 p-8">
                {/* Ícone decorativo com animação */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <span className="text-white">🎯</span>
                  </div>
                  <div className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Título com símbolo */}
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex items-start gap-2">
                  <span className="text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300 inline-block">⚡</span>
                  <span className="flex-1">{p.title}</span>
                </h2>

                {/* Descrição estilizada */}
                <div className="relative">
                  <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-cyan-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-4 leading-relaxed pl-4 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 text-sm">
                    {p.description}
                  </p>
                  
                  {/* Badge de quantidade de imagens */}
                  {(p as any).images && (p as any).images.length > 0 && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <span>📸</span>
                      <span>{(p as any).images.length} {(p as any).images.length === 1 ? 'imagem' : 'imagens'}</span>
                    </div>
                  )}
                </div>

                {/* Badge de ação */}
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  <span>Ver detalhes</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Linha decorativa inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* Decoração de canto */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          ))}
        </div>

        {/* Mensagem quando não há projetos */}
        {projects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-gray-600 dark:text-gray-400">Nenhum projeto disponível no momento</p>
          </div>
        )}
      </div>
    </div>
  )
}
