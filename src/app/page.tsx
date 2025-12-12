import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/db'
import { Smartphone, Server, Cog, Palette, Gauge, Globe, User, Mail, MessageSquare, Send, Info, ShieldCheck, Sparkles } from 'lucide-react'

export const dynamic = 'force-dynamic'

function getServiceIcon(name: string) {
  const t = name.toLowerCase()
  if (t.includes('mobile') || t.includes('app')) return Smartphone
  if (t.includes('infra') || t.includes('deploy') || t.includes('hosped')) return Server
  if (t.includes('auto') || t.includes('process')) return Cog
  if (t.includes('design') || t.includes('ui')) return Palette
  if (t.includes('otimiz') || t.includes('consult')) return Gauge
  if (t.includes('pwa') || t.includes('navegador') || t.includes('web')) return Globe
  return Cog
}

function getProjectFallbackImage(p: { slug?: string; title?: string }) {
  const key = (p.slug || p.title || '').toLowerCase()
  if (key.includes('fastburger')) return '/portfolio/fastburger.svg'
  if (key.includes('fintrack')) return '/portfolio/fintrack.svg'
  if (key.includes('educapro') || key.includes('educa')) return '/portfolio/educapro.svg'
  if (key.includes('fitlife') || key.includes('fit') || key.includes('treino')) return '/portfolio/fitlife.svg'
  if (key.includes('focomarket') || key.includes('estoque') || key.includes('vendas')) return '/portfolio/focomarket.svg'
  return '/portfolio/default.svg'
}
export default async function HomePage() {
  let banner: any = null
  let services: any[] = []
  let projects: any[] = []
  try {
    banner = await prisma.homeBanner.findUnique({ where: { id: 'home-banner' } })
    services = await prisma.service.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
    projects = await prisma.project.findMany({ take: 6, orderBy: { createdAt: 'desc' } })
  } catch {}

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="container py-24 md:py-32 relative">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand/20 blur-3xl rounded-full" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-dark/20 blur-3xl rounded-full" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold">
              Soluções que geram resultado
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight">
              {banner?.title || 'FocoDev Sistemas'}
            </h1>
            {banner?.subtitle && (
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {banner.subtitle}
              </p>
            )}
            <div className="pt-4 flex flex-wrap gap-4">
              <Button asChild size="lg" variant="gradient" className="text-base px-8 py-6 rounded-xl">
                <Link href={banner?.ctaLink || '/#contato'}>{banner?.ctaText || 'Fale conosco'}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl">
                <Link href="/projects">Ver Portfólio</Link>
              </Button>
            </div>
          </div>
          {banner?.backgroundImageUrl && (
            <div className="animate-fade-in-delay">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <Image 
                  src={banner.backgroundImageUrl} 
                  alt="Banner" 
                  width={800} 
                  height={500} 
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="container py-20 relative">
        <div className="absolute -top-10 left-0 w-64 h-64 bg-brand/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 right-0 w-64 h-64 bg-brand-dark/10 blur-3xl rounded-full" />
        <div className="text-center mb-16">
          <h2 className="section-title">Serviços</h2>
          <p className="section-subtitle max-w-2xl mx-auto">O que fazemos para impulsionar seu negócio</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s: typeof services[number], index: number) => (
            <div 
              key={s.id} 
              className="card p-8 group cursor-pointer ring-1 ring-brand/20 hover:ring-brand/40 hover:border-brand"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center ring-1 ring-brand/20 mb-4 group-hover:bg-brand/15 group-hover:ring-brand/40">
                {(() => {
                  const Icon = getServiceIcon(s.title)
                  return <Icon className="w-6 h-6" />
                })()}
              </div>
              <div className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                {s.title}
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="container py-20 relative">
        <div className="absolute -top-10 left-0 w-64 h-64 bg-brand/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 right-0 w-64 h-64 bg-brand-dark/10 blur-3xl rounded-full" />
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">
            <span className="inline-flex items-center gap-3">
              <span className="h-10 w-10 rounded-xl bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30">
                <Info className="w-6 h-6 text-brand" />
              </span>
              Sobre Nós
            </span>
          </h2>
          <div className="card p-6 md:p-8 ring-1 ring-brand/20 bg-white/90 dark:bg-gray-900/90">
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Somos especialistas em criar soluções digitais sob medida, focadas em performance, segurança e experiência do usuário. Nossos projetos incluem funcionalidades como ConstroiSites, CorrigiBug e BlendingPages, oferecendo ferramentas eficientes para construir sites, corrigir problemas rapidamente e integrar conteúdos de forma inteligente. Cada solução é pensada para atender às necessidades específicas de cada cliente, garantindo resultados consistentes e de alta qualidade.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold ring-1 ring-brand/20">
              <Gauge className="w-4 h-4" />
              Performance
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold ring-1 ring-brand/20">
              <ShieldCheck className="w-4 h-4" />
              Segurança
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold ring-1 ring-brand/20">
              <Sparkles className="w-4 h-4" />
              UX de Alto Nível
            </span>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="container py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="section-title mb-0">Portfólio</h2>
          <Link 
            href="/projects" 
            className="text-brand hover:text-brand-dark font-semibold flex items-center gap-2 group transition-colors"
          >
            Ver tudo
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p: typeof projects[number], index: number) => (
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              className="group block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-soft hover:shadow-glow transition hover:border-brand">
                <Image
                  src={p.coverImageUrl || getProjectFallbackImage(p)}
                  alt={p.title}
                  width={800}
                  height={500}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                    {p.title}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">{p.description}</p>
                  <div className="mt-4 text-brand text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver projeto →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="container py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">
              <span className="inline-flex items-center gap-3">
                <span className="h-10 w-10 rounded-xl bg-gradient-to-r from-brand/20 to-brand-dark/20 flex items-center justify-center ring-1 ring-brand/30">
                  <MessageSquare className="w-6 h-6 text-brand" />
                </span>
                <span className="text-gray-900 dark:text-white font-extrabold">Contato</span>
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-semibold">Fale com nossa equipe</p>
          </div>
          <form action="/api/contact" method="post" className="card p-8 md:p-10 space-y-6 ring-1 ring-brand/20 hover:ring-brand/40">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand pointer-events-none" />
              <input 
                name="name" 
                placeholder="Seu nome" 
                required 
                className="w-full border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-gray-900 dark:text-white hover:text-brand dark:hover:text-brand hover:border-brand dark:hover:border-brand placeholder-gray-600 dark:placeholder-gray-400 shadow-soft hover:shadow-glow" 
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand pointer-events-none" />
              <input 
                name="email" 
                placeholder="Seu email" 
                type="email" 
                required 
                className="w-full border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-gray-900 dark:text-white hover:text-brand dark:hover:text-brand hover:border-brand dark:hover:border-brand placeholder-gray-600 dark:placeholder-gray-400 shadow-soft hover:shadow-glow" 
              />
            </div>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-brand pointer-events-none" />
              <textarea 
                name="message" 
                placeholder="Sua mensagem" 
                required 
                rows={6}
                className="w-full border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 resize-none shadow-soft hover:shadow-glow" 
              />
            </div>
            <Button type="submit" size="lg" className="w-full text-base py-6 rounded-xl">
              <span className="inline-flex items-center gap-2">
                <Send className="w-5 h-5" />
                Enviar Mensagem
              </span>
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
