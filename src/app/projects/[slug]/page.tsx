import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { getProjectStructuredData } from '@/lib/structured-data'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await prisma.project.findUnique({ 
    where: { slug: params.slug },
    include: { images: true }
  })
  
  if (!project) {
    return { 
      title: 'Projeto não encontrado',
      description: 'O projeto solicitado não foi encontrado.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://focodev.com.br'
  const projectUrl = `${siteUrl}/projects/${params.slug}`
  const imageUrl = project.coverImageUrl || project.images[0]?.url || `${siteUrl}/og-image.jpg`

  return {
    title: project.title,
    description: project.description,
    keywords: [
      project.title,
      'projeto',
      'portfólio',
      'desenvolvimento',
      'tecnologia',
      'FocoDev',
      'case de sucesso',
    ],
    openGraph: {
      title: `${project.title} | FocoDev Sistemas`,
      description: project.description,
      url: projectUrl,
      siteName: 'FocoDev Sistemas',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | FocoDev Sistemas`,
      description: project.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: projectUrl,
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

export default async function ProjectDetail({ params }: Props) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug }, include: { images: true } })
  if (!project) return notFound()
  
  const projectStructuredData = getProjectStructuredData(project)
  
  return (
    <>
      {projectStructuredData && (
        <Script
          id="project-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectStructuredData) }}
        />
      )}
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="container py-12 md:py-16">
        {/* Botão de voltar */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Voltar ao portfólio</span>
        </Link>

        {/* Header do Projeto */}
        <div className="mb-12 relative">
          {/* Decoração de fundo */}
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tr from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Badge decorativo */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 dark:border-blue-400/20 mb-6 backdrop-blur-sm">
              <span className="text-xl">🎨</span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Projeto em Destaque</span>
            </div>

            {/* Título principal com símbolos */}
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl md:text-6xl mt-2">✨</div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent mb-4">
                  {project.title}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  <span className="text-2xl">⚡</span>
                  <div className="h-1 w-20 bg-gradient-to-l from-cyan-500 to-teal-500 rounded-full"></div>
                </div>
              </div>
              <div className="text-5xl md:text-6xl mt-2">🚀</div>
            </div>

            {/* Descrição destacada */}
            <div className="relative max-w-4xl">
              <div className="absolute -left-4 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-teal-500 rounded-full"></div>
              <div className="pl-8 pr-4 py-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-l-4 border-blue-500/30 dark:border-blue-400/30 shadow-lg">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>
              {/* Decoração de canto */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Galeria de Imagens - Prints, GIFs e Cards */}
        {project.images.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <span className="text-2xl">📸</span>
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Galeria de Screenshots
                </span>
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-l from-cyan-500 to-teal-500 rounded-full"></div>
            </div>

            {/* Dica para desenvolvedores */}
            <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-300 flex items-center gap-2">
                <span className="text-lg">💡</span>
                <span><strong>Dica:</strong> Adicione prints das telas principais, GIFs das funcionalidades e cards visuais para mostrar melhor seu trabalho!</span>
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((img: typeof project.images[number], index: number) => {
                const isGif = img.url.toLowerCase().endsWith('.gif') || img.url.toLowerCase().includes('.gif')
                const isPrint = img.alt?.toLowerCase().includes('print') || img.alt?.toLowerCase().includes('tela') || img.alt?.toLowerCase().includes('screenshot')
                
                return (
                  <div 
                    key={img.id} 
                    className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02]"
                  >
                    {/* Badge de tipo */}
                    <div className="absolute top-4 left-4 z-30 flex gap-2">
                      {isGif && (
                        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                          <span>🎬</span>
                          <span>GIF</span>
                        </div>
                      )}
                      {isPrint && (
                        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                          <span>📱</span>
                          <span>Print</span>
                        </div>
                      )}
                    </div>

                    {/* Overlay no hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-500 z-10"></div>
                    
                    {/* Ícone de zoom/expandir */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 z-20 shadow-lg">
                      <span className="text-lg">🔍</span>
                    </div>

                    {/* Container da imagem com melhor proporção para prints */}
                    <div className="relative w-full bg-gray-100 dark:bg-gray-900 overflow-hidden" style={{ aspectRatio: '16/10' }}>
                      {isGif ? (
                        <img 
                          src={img.url} 
                          alt={img.alt || project.title} 
                          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <img 
                          src={img.url} 
                          alt={img.alt || project.title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                        />
                      )}
                      
                      {/* Overlay gradiente sutil */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent group-hover:from-black/20 transition-all duration-300"></div>
                    </div>
                    
                    {/* Legenda sempre visível */}
                    {img.alt && (
                      <div className="p-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{img.alt}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Screenshot do projeto</p>
                      </div>
                    )}

                    {/* Borda animada */}
                    <div className="absolute inset-0 border-2 border-blue-500/0 group-hover:border-blue-500/50 rounded-2xl transition-all duration-500 pointer-events-none"></div>
                    
                    {/* Efeito de brilho no hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
                  </div>
                )
              })}
            </div>

            {/* Informações adicionais */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span>📋</span>
                <span>Dicas para um portfólio profissional:</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span><strong>Prints de tela:</strong> Capture as principais telas do sistema (login, dashboard, funcionalidades principais)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span><strong>GIFs animados:</strong> Grave 3-5 segundos das funcionalidades em ação (use ScreenToGif, ShareX ou LICEcap)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span><strong>Cards visuais:</strong> Crie cards destacando tecnologias, funcionalidades ou resultados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span><strong>Texto objetivo:</strong> Descreva claramente o que cada imagem mostra</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Mensagem quando não há imagens */}
        {project.images.length === 0 && (
          <div className="text-center py-16 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-xl text-gray-600 dark:text-gray-400">Nenhuma imagem disponível para este projeto</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 border border-blue-500/20 dark:border-blue-400/20 backdrop-blur-sm">
            <span className="text-2xl">💡</span>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Gostou deste projeto? <Link href="/#contato" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Entre em contato</Link>
            </p>
            <span className="text-2xl">💡</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
