import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/db'

export default async function HomePage() {
  let banner: any = null
  let services: any[] = []
  let projects: any[] = []
  let videos: any[] = []
  try {
    if (prisma && typeof prisma.homeBanner !== 'undefined') {
      banner = await prisma.homeBanner.findUnique({ where: { id: 'home-banner' } })
      services = await prisma.service.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
      projects = await prisma.project.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
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
                <Button asChild size="lg" className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Link href={banner?.ctaLink || '/#contato'}>
                    <span className="relative z-10">{banner?.ctaText || 'Fale conosco'}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Link href="/projects">Ver Portfólio</Link>
                </Button>
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
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Serviços
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              O que fazemos para impulsionar seu negócio
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s: typeof services[number], index: number) => (
              <div 
                key={s.id} 
                className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Gradiente de fundo no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Ícone decorativo */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <span className="text-white">✨</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                  {s.description}
                </p>
                
                {/* Linha decorativa */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-cyan-600/5 to-teal-600/5"></div>
        <div className="container relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                Sobre Nós
              </h2>
            </div>
            
            <div className="relative p-8 md:p-12 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
              
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed relative z-10">
                Somos especialistas em criar <span className="font-semibold text-blue-600 dark:text-blue-400">soluções digitais sob medida</span>, focadas em performance, segurança e experiência do usuário. Nossos projetos incluem funcionalidades como <span className="font-semibold text-cyan-600 dark:text-cyan-400">ConstroiSites</span>, <span className="font-semibold text-teal-600 dark:text-teal-400">CorrigiBug</span> e <span className="font-semibold text-blue-600 dark:text-blue-400">BlendingPages</span>, oferecendo ferramentas eficientes para construir sites, corrigir problemas rapidamente e integrar conteúdos de forma inteligente. Cada solução é pensada para atender às necessidades específicas de cada cliente, garantindo resultados consistentes e de alta qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Portfólio
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Nossos projetos em destaque</p>
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
            {projects.map((p: typeof projects[number]) => (
              <Link 
                key={p.id} 
                href={`/projects/${p.slug}`} 
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="p-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <span className="text-white text-xl">💼</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
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

      <section id="videos" className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Vídeos
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Conteúdos e demonstrações</p>
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

      <section id="contato" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-teal-600/10"></div>
        <div className="container relative">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                Contato
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">Fale com nossa equipe</p>
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
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                >
                  Enviar Mensagem
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
