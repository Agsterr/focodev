const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const SERVICES = [
  {
    title: 'Desenvolvimento Web & Mobile',
    description: 'Sites, painéis administrativos e apps nativos com React, Next.js e Flutter — rápidos, responsivos e prontos para escalar.',
  },
  {
    title: 'Infraestrutura & Deploy',
    description: 'Docker, CI/CD, Cloudflare Tunnel e servidores Hetzner configurados para alta disponibilidade e deploy automático.',
  },
  {
    title: 'Automação de Processos',
    description: 'Integrações, APIs e fluxos que eliminam tarefas manuais e conectam estoque, vendas, rotas e comunicação.',
  },
  {
    title: 'UI/UX & Identidade Visual',
    description: 'Interfaces modernas, acessíveis e alinhadas à sua marca — do wireframe ao produto final publicado.',
  },
  {
    title: 'Consultoria Técnica',
    description: 'Auditoria de performance, segurança e arquitetura para sistemas legados ou projetos em crescimento.',
  },
  {
    title: 'PWA & Apps Instaláveis',
    description: 'Transforme seu sistema em app instalável no celular, com login salvo e experiência offline quando necessário.',
  },
]

const PROJECTS = [
  {
    slug: 'gerenciamento-estoque',
    title: 'Gerenciamento de Estoque',
    description: 'Plataforma completa para controle de produtos, vendas e estoque online — em produção em focodev.com.br.',
    coverImageUrl: '/portfolio/focomarket.svg',
  },
  {
    slug: 'app-rotas',
    title: 'App Rotas',
    description: 'App mobile Flutter para planejamento de rotas de entrega, GPS e uso em campo por equipes operacionais.',
    coverImageUrl: '/portfolio/app-rotas.svg',
  },
  {
    slug: 'fintrack',
    title: 'FinTrack',
    description: 'Controle financeiro pessoal e empresarial com dashboards, categorias e relatórios visuais intuitivos.',
    coverImageUrl: '/portfolio/fintrack.svg',
  },
  {
    slug: 'fastburger',
    title: 'FastBurger',
    description: 'Sistema de pedidos para restaurantes com cardápio digital, gestão de fila e painel da cozinha.',
    coverImageUrl: '/portfolio/fastburger.svg',
  },
  {
    slug: 'educapro',
    title: 'EducaPro',
    description: 'Plataforma educacional com aulas, progresso do aluno e área do professor em interface moderna.',
    coverImageUrl: '/portfolio/educapro.svg',
  },
  {
    slug: 'fitlife',
    title: 'FitLife',
    description: 'App de treinos e acompanhamento fitness com planos personalizados e métricas de evolução.',
    coverImageUrl: '/portfolio/fitlife.svg',
  },
]

async function main() {
  const adminEmail = 'admin@focodev.com'
  const adminPassword = 'admin123'
  const hash = await bcrypt.hash(adminPassword, 10)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { name: 'Administrador', email: adminEmail, passwordHash: hash, role: 'ADMIN' },
  })

  await prisma.companyInfo.upsert({
    where: { id: 'company-singleton' },
    update: { name: 'FocoDev Sistemas' },
    create: {
      id: 'company-singleton',
      name: 'FocoDev Sistemas',
      email: 'contato@focodev.com',
      phone: '+55 00 0000-0000',
      instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'focodev',
      address: 'Brasil',
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
      aboutText: 'A FocoDev cria soluções de software robustas e seguras, com foco em performance e experiência do usuário.',
    },
  })

  await prisma.homeBanner.upsert({
    where: { id: 'home-banner' },
    update: {
      title: 'Soluções digitais para impulsionar seu negócio',
      subtitle: 'Software sob medida, veloz e seguro — do site institucional ao app mobile em produção.',
      ctaText: 'Solicitar orçamento',
      ctaLink: '/#contato',
    },
    create: {
      id: 'home-banner',
      title: 'Soluções digitais para impulsionar seu negócio',
      subtitle: 'Software sob medida, veloz e seguro — do site institucional ao app mobile em produção.',
      ctaText: 'Solicitar orçamento',
      ctaLink: '/#contato',
    },
  })

  for (const service of SERVICES) {
    const existing = await prisma.service.findFirst({ where: { title: service.title } })
    if (existing) {
      await prisma.service.update({
        where: { id: existing.id },
        data: { description: service.description },
      })
    } else {
      await prisma.service.create({ data: service })
    }
  }

  for (const project of PROJECTS) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        description: project.description,
        coverImageUrl: project.coverImageUrl,
      },
      create: project,
    })
  }

  console.log('Seed concluído. Admin: admin@focodev.com / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
