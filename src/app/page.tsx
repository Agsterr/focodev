import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/db'

export async function generateMetadata(): Promise<Metadata> {
  let banner: any = null
  let companyInfo: any = null
  
  try {
    if (prisma && typeof prisma.homeBanner !== 'undefined') {
      banner = await prisma.homeBanner.findUnique({ where: { id: 'home-banner' } })
      companyInfo = await prisma.companyInfo.findFirst()
    }
  } catch (error) {
    console.error('Error loading metadata:', error)
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://focodev.com.br'
  const title = banner?.title || 'FocoDev Sistemas - Soluções Digitais Modernas'
  const description = banner?.subtitle || 'Soluções digitais modernas e seguras para o seu negócio. Desenvolvimento web, aplicativos, sistemas personalizados e muito mais. Transforme suas ideias em realidade digital.'
  const imageUrl = banner?.backgroundImageUrl || `${siteUrl}/og-image.jpg`

  return {
    title: 'Início',
    description,
    keywords: [
      'desenvolvimento web',
      'soluções digitais',
      'aplicativos',
      'sistemas personalizados',
      'tecnologia',
      'programação',
      'software',
      'FocoDev',
      'desenvolvimento de sites',
      'desenvolvimento de aplicativos',
      'consultoria em TI',
      'ConstroiSites',
      'CorrigiBug',
      'BlendingPages',
    ],
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: 'FocoDev Sistemas',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: siteUrl,
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

export default async function HomePage() {
  let banner: any = null
  let services: any[] = []
  let projects: any[] = []
  let videos: any[] = []
  try {
    if (prisma && typeof prisma.homeBanner !== 'undefined') {
      banner = await prisma.homeBanner.findUnique({ where: { id: 'home-banner' } })
      services = await prisma.service.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
      projects = await prisma.project.findMany({ 
        take: 6, 
        orderBy: { createdAt: 'desc' },
        include: { images: { take: 1 } }
      })
      videos = await prisma.video.findMany({ take: 4, orderBy: { createdAt: 'desc' } })
    }
  } catch (error: any) {
    console.error('Error loading data:', error?.message || error)
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section com gradiente animado */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background com gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-blue-950 dark:to-cyan-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        </div>
        
        {/* Grid pattern sutil */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>
        
        <div className="container relative z-10 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Transformando ideias em realidade digital
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent leading-tight">
                {banner?.title || 'FocoDev Sistemas'}
              </h1>
              
              {banner?.subtitle && (
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl">
                  {banner.subtitle}
                </p>
              )}
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-700 hover:via-cyan-700 hover:to-teal-700 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 text-white font-bold text-lg px-8 py-6">
                  <Link href={banner?.ctaLink || '/#contato'}>
                    <span className="relative z-10 flex items-center gap-2">
                      <span>{banner?.ctaText || 'Fale conosco'}</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-blue-500/50 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold px-8 py-6">
                  <Link href="/projects" className="flex items-center gap-2">
                    <span>Ver Portfólio</span>
                    <span className="text-xl">💼</span>
                  </Link>
                </Button>
              </div>

              {/* Destaques */}
              <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <span className="text-xl">⚡</span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Soluções Personalizadas</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20">
                  <span className="text-xl">🔒</span>
                  <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Segurança Garantida</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/20">
                  <span className="text-xl">🚀</span>
                  <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">Alta Performance</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in-delay">
              {banner?.backgroundImageUrl ? (
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <Image 
                    src={banner.backgroundImageUrl} 
                    alt="Banner" 
                    width={800} 
                    height={500} 
                    className="relative rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500" 
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 p-12 shadow-2xl">
                    <div className="text-white text-4xl font-bold">🚀</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 dark:border-blue-400/20 mb-6 backdrop-blur-sm">
              <span className="text-xl">⚡</span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Nossos Serviços</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
              Serviços
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
              O que fazemos para <span className="text-blue-600 dark:text-blue-400 font-bold">impulsionar</span> seu negócio
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s: typeof services[number], index: number) => {
              const icons = ['🚀', '💡', '⚡', '🎯', '✨', '🔥', '💎', '🌟', '🎨']
              const gradients = [
                'from-blue-500 to-cyan-500',
                'from-cyan-500 to-teal-500',
                'from-teal-500 to-blue-500',
                'from-purple-500 to-pink-500',
                'from-orange-500 to-red-500',
                'from-green-500 to-emerald-500',
              ]
              const icon = icons[index % icons.length]
              const gradient = gradients[index % gradients.length]
              
              return (
                <div 
                  key={s.id} 
                  className="group relative p-8 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden"
                >
                  {/* Gradiente de fundo animado */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Efeito de brilho */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  
                  {/* Badge de número */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                    {index + 1}
                  </div>
                  
                  {/* Ícone decorativo */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                      <span className="text-white">{icon}</span>
                    </div>
                    <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 animate-ping`}></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10 text-base">
                    {s.description}
                  </p>
                  
                  {/* Linha decorativa animada */}
                  <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl`}></div>
                  
                  {/* Seta indicativa */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="sobre" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-cyan-600/5 to-teal-600/5"></div>
        {/* Elementos decorativos flutuantes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 dark:border-blue-400/20 mb-6 backdrop-blur-sm">
                <span className="text-xl">💼</span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Nossa História</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                Sobre Nós
              </h2>
            </div>
            
            <div className="relative p-8 md:p-12 rounded-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-2 border-gray-200 dark:border-gray-700 shadow-2xl hover:shadow-[0_20px_60px_rgba(14,165,233,0.3)] transition-all duration-500 transform hover:scale-[1.02]">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              {/* Badges de destaque */}
              <div className="absolute top-6 right-6 flex flex-col gap-2">
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-xs font-bold text-blue-600 dark:text-blue-400">
                  ⚡ Performance
                </div>
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  🔒 Segurança
                </div>
              </div>
              
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed relative z-10 pr-20">
                Somos especialistas em criar <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded">soluções digitais sob medida</span>, focadas em performance, segurança e experiência do usuário. Nossos projetos incluem funcionalidades como <span className="font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/30 px-2 py-1 rounded">ConstroiSites</span>, <span className="font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30 px-2 py-1 rounded">CorrigiBug</span> e <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded">BlendingPages</span>, oferecendo ferramentas eficientes para construir sites, corrigir problemas rapidamente e integrar conteúdos de forma inteligente. Cada solução é pensada para atender às necessidades específicas de cada cliente, garantindo resultados consistentes e de alta qualidade.
              </p>
              
              {/* Decoração inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-b-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 dark:border-blue-400/20 mb-4 backdrop-blur-sm">
                <span className="text-xl">🎨</span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Nossos Trabalhos</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                Portfólio
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Projetos que <span className="text-blue-600 dark:text-blue-400 font-bold">transformam</span> ideias em realidade</p>
            </div>
            <Link 
              href="/projects" 
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Ver tudo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p: typeof projects[number], index: number) => (
              <Link 
                key={p.id} 
                href={`/projects/${p.slug}`} 
                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02]"
              >
                {/* Imagem de capa se disponível */}
                {((p as any).coverImageUrl || (p as any).images?.[0]?.url) && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={(p as any).coverImageUrl || (p as any).images[0].url}
                      alt={p.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                      <span className="text-xl">👁️</span>
                    </div>
                  </div>
                )}
                
                <div className={`p-6 relative z-10 ${!(p as any).coverImageUrl && !(p as any).images?.[0]?.url ? 'pt-8' : ''}`}>
                  {!(p as any).coverImageUrl && !(p as any).images?.[0]?.url && (
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                      <span className="text-white text-2xl">💼</span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">
                      {p.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed text-sm">
                    {p.description}
                  </p>
                  
                  {/* Badge de destaque */}
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Ver projeto</span>
                    <span>→</span>
                  </div>
                </div>
                
                {/* Linha decorativa animada */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Efeito de brilho no hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Ver tudo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {videos.length > 0 && (
        <section id="videos" className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 dark:border-blue-400/20 mb-6 backdrop-blur-sm">
                <span className="text-xl">🎥</span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Conteúdo em Vídeo</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                Vídeos
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">Conteúdos e <span className="text-blue-600 dark:text-blue-400 font-bold">demonstrações</span> dos nossos projetos</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {videos.map((v: typeof videos[number]) => (
                <div 
                  key={v.id} 
                  className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <iframe
                    className="w-full aspect-video relative z-10"
                    src={v.youtubeUrl.replace('watch?v=', 'embed/')}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contato" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-teal-600/10"></div>
        {/* Elementos decorativos animados */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container relative">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 dark:border-blue-400/20 mb-6 backdrop-blur-sm">
                <span className="text-xl">📧</span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Entre em Contato</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                Contato
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">Fale com nossa <span className="text-blue-600 dark:text-blue-400 font-bold">equipe</span> e transforme suas ideias</p>
            </div>
            
            <form 
              action="/api/contact" 
              method="post" 
              className="relative p-8 md:p-12 rounded-3xl bg-white dark:bg-gray-800 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 shadow-2xl space-y-6"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 space-y-6">
                <div>
                  <input 
                    name="name" 
                    placeholder="Nome" 
                    required 
                    className="w-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm" 
                  />
                </div>
                <div>
                  <input 
                    name="email" 
                    placeholder="Email" 
                    type="email" 
                    required 
                    className="w-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm" 
                  />
                </div>
                <div>
                  <textarea 
                    name="message" 
                    placeholder="Mensagem" 
                    required 
                    className="w-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-xl min-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 resize-none placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm" 
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-700 hover:via-cyan-700 hover:to-teal-700 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 text-white font-bold text-lg py-6 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Enviar Mensagem</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
