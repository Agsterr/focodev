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
    banner = await prisma.homeBanner.findUnique({ where: { id: 'home-banner' } })
    services = await prisma.service.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
    projects = await prisma.project.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
    videos = await prisma.video.findMany({ take: 4, orderBy: { createdAt: 'desc' } })
  } catch {}

  return (
    <div className="animate-fade-in-up">
      <section className="container py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                {banner?.title || 'FocoDev Sistemas'}
              </span>
            </h1>
            {banner?.subtitle && (
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {banner.subtitle}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="text-base px-8 py-6 bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand shadow-lg hover:shadow-xl transition-all">
                <Link href={banner?.ctaLink || '/#contato'}>{banner?.ctaText || 'Fale conosco'}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 py-6">
                <Link href="/#servicos">Nossos serviços</Link>
              </Button>
            </div>
          </div>
          {banner?.backgroundImageUrl && (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand to-brand-dark rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <Image 
                src={banner.backgroundImageUrl} 
                alt="Banner" 
                width={800} 
                height={500} 
                className="relative rounded-3xl shadow-2xl transform transition duration-300 group-hover:scale-105" 
              />
            </div>
          )}
        </div>
      </section>

      <section id="servicos" className="container py-20">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Serviços</h2>
          <p className="section-subtitle mx-auto">O que fazemos para impulsionar seu negócio</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length > 0 ? (
            services.map((s: typeof services[number], index: number) => (
              <div 
                key={s.id} 
                className="card p-8 group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-brand-dark mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{s.title}</div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{s.description}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p>Nenhum serviço cadastrado ainda.</p>
            </div>
          )}
        </div>
      </section>

      <section id="sobre" className="container py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Sobre Nós</h2>
          </div>
          <div className="card p-10 md:p-12">
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center">
              Somos especialistas em criar <span className="font-semibold text-brand">soluções digitais sob medida</span>, focadas em performance, segurança e experiência do usuário. Nossos projetos incluem funcionalidades como ConstroiSites, CorrigiBug e BlendingPages, oferecendo ferramentas eficientes para construir sites, corrigir problemas rapidamente e integrar conteúdos de forma inteligente. Cada solução é pensada para atender às necessidades específicas de cada cliente, garantindo resultados consistentes e de alta qualidade.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="section-title mb-0">Portfólio</h2>
          <Link href="/projects" className="text-brand hover:text-brand-dark font-semibold transition-colors flex items-center gap-2">
            Ver tudo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((p: typeof projects[number]) => (
              <Link key={p.id} href={`/projects/${p.slug}`} className="card p-8 group">
                <div className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-brand transition-colors">{p.title}</div>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">{p.description}</p>
                <div className="mt-4 text-brand text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver projeto
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p>Nenhum projeto cadastrado ainda.</p>
            </div>
          )}
        </div>
      </section>

      <section id="videos" className="container py-20">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Vídeos</h2>
          <p className="section-subtitle mx-auto">Conteúdos e demonstrações</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {videos.length > 0 ? (
            videos.map((v: typeof videos[number]) => (
              <div key={v.id} className="card p-0 overflow-hidden group">
                <div className="relative">
                  <iframe
                    className="w-full aspect-video rounded-t-2xl"
                    src={v.youtubeUrl.replace('watch?v=', 'embed/')}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{v.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p>Nenhum vídeo cadastrado ainda.</p>
            </div>
          )}
        </div>
      </section>


      <section id="contato" className="container py-20">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Contato</h2>
          <p className="section-subtitle mx-auto">Fale com nossa equipe</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <form action="/api/contact" method="post" className="card p-8 md:p-10 grid gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome</label>
              <input 
                id="name"
                name="name" 
                placeholder="Seu nome" 
                required 
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input 
                id="email"
                name="email" 
                placeholder="seu@email.com" 
                type="email" 
                required 
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" 
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mensagem</label>
              <textarea 
                id="message"
                name="message" 
                placeholder="Sua mensagem..." 
                required 
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 rounded-xl min-h-32 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all resize-none" 
              />
            </div>
            <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand text-base py-6">
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
