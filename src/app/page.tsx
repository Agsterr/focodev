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
    <div>
      <section className="container py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{banner?.title || 'FocoDev Sistemas'}</h1>
            {banner?.subtitle && <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8">{banner.subtitle}</p>}
            <Button asChild>
              <Link href={banner?.ctaLink || '/#contato'}>{banner?.ctaText || 'Fale conosco'}</Link>
            </Button>
          </div>
          {banner?.backgroundImageUrl && (
            <Image src={banner.backgroundImageUrl} alt="Banner" width={800} height={500} className="rounded-2xl shadow-soft" />
          )}
        </div>
      </section>

      <section id="servicos" className="container py-16">
        <h2 className="section-title">Serviços</h2>
        <p className="section-subtitle">O que fazemos para impulsionar seu negócio</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s: typeof services[number]) => (
            <div key={s.id} className="card p-5">
              <div className="text-lg font-semibold mb-2">{s.title}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sobre" className="container py-16">
        <h2 className="section-title">Sobre</h2>
        <p className="section-subtitle max-w-3xl">Somos especialistas em criar soluções digitais sob medida, focadas em performance, segurança e experiência do usuário. Nossos projetos incluem funcionalidades como ConstroiSites, CorrigiBug e BlendingPages, oferecendo ferramentas eficientes para construir sites, corrigir problemas rapidamente e integrar conteúdos de forma inteligente. Cada solução é pensada para atender às necessidades específicas de cada cliente, garantindo resultados consistentes e de alta qualidade.</p>
      </section>

      <section className="container py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title mb-0">Portfólio</h2>
          <Link href="/projects" className="text-brand">Ver tudo</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p: typeof projects[number]) => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="card p-5">
              <div className="text-lg font-semibold mb-2">{p.title}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{p.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="videos" className="container py-16">
        <h2 className="section-title">Vídeos</h2>
        <p className="section-subtitle">Conteúdos e demonstrações</p>
        <div className="grid sm:grid-cols-2 gap-6">
          {videos.map((v: typeof videos[number]) => (
            <div key={v.id} className="card p-0 overflow-hidden">
              <iframe
                className="w-full aspect-video"
                src={v.youtubeUrl.replace('watch?v=', 'embed/')}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </section>

      <section id="depoimentos" className="container py-16">
        <h2 className="text-2xl font-semibold mb-6">Depoimentos</h2>
        <p className="text-gray-600 dark:text-gray-400">Em breve.</p>
      </section>

      <section id="contato" className="container py-16">
        <h2 className="section-title">Contato</h2>
        <p className="section-subtitle">Fale com nossa equipe</p>
        <form action="/api/contact" method="post" className="card p-6 max-w-xl grid gap-4">
          <input name="name" placeholder="Nome" required className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand" />
          <input name="email" placeholder="Email" type="email" required className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand" />
          <textarea name="message" placeholder="Mensagem" required className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 rounded-lg min-h-32 focus:outline-none focus:ring-2 focus:ring-brand" />
          <Button type="submit">Enviar</Button>
        </form>
      </section>
    </div>
  )
}
