import { SYSTEM_LINKS, SHOWCASE_PROJECTS } from '@/lib/system-links'

export type ShowcaseItem = {
  slug: string
  title: string
  tagline: string
  description: string
  features: string[]
  tech: string[]
  /** Print principal (navegador). Sem ele, o card mostra dois celulares. */
  desktop?: string
  /** Print de celular */
  mobile?: string
  /** Segundo print de celular (usado quando não há print de navegador) */
  mobile2?: string
  href: string
  external: boolean
  cta: string
  /** Classes de cor do destaque (degradê do card) */
  accent: string
  glow: string
}

/** Produtos em destaque na home, com prints reais dos sistemas. */
export const SHOWCASE: ShowcaseItem[] = [
  {
    slug: 'mercado-digital',
    title: 'Mercado Digital',
    tagline: 'Supermercado no celular do cliente',
    description: 'PWA multi-loja com catálogo, promoções, carrinho, pedidos com entrega e painel do dono para acompanhar tudo em tempo real.',
    features: ['Catálogo e promoções', 'Pedidos com entrega', 'Painel do mercado'],
    tech: ['Next.js', 'Spring Boot', 'PWA'],
    desktop: '/portfolio/mercado/loja-desktop.webp',
    mobile: '/portfolio/mercado/loja-celular.webp',
    href: SYSTEM_LINKS.mercado.href,
    external: true,
    cta: 'Acessar sistema',
    accent: 'from-emerald-400/25 via-emerald-500/10 to-transparent',
    glow: 'bg-emerald-500/30',
  },
  {
    slug: 'barbearia',
    title: 'Barbearia',
    tagline: 'Agenda cheia, sem WhatsApp lotado',
    description: 'Agendamento online para clientes, agenda de cada barbeiro e painel admin com serviços, combos e promoções.',
    features: ['Agendamento online', 'App do barbeiro', 'Combos e promoções'],
    tech: ['Next.js', 'Java Spring', 'Multi-tenant'],
    desktop: '/portfolio/barbearia/painel-admin.webp',
    mobile: '/portfolio/barbearia/app-barbeiros.webp',
    href: SYSTEM_LINKS.barbearia.href,
    external: true,
    cta: 'Acessar sistema',
    accent: 'from-amber-400/25 via-orange-500/10 to-transparent',
    glow: 'bg-amber-500/30',
  },
  {
    slug: 'gerenciamento-estoque',
    title: 'Gerenciamento de Estoque',
    tagline: 'Estoque, vendas e entregas sob controle',
    description: 'Produtos, categorias, consumidores, entregas e movimentações com alertas de estoque baixo e relatórios.',
    features: ['Alerta de estoque baixo', 'Entregas e consumidores', 'Relatórios'],
    tech: ['Angular', 'Spring Boot', 'PostgreSQL'],
    desktop: '/portfolio/estoque/painel.webp',
    mobile: '/portfolio/estoque/painel-celular.webp',
    href: SYSTEM_LINKS.estoque.href,
    external: true,
    cta: 'Acessar sistema',
    accent: 'from-sky-400/25 via-blue-500/10 to-transparent',
    glow: 'bg-sky-500/30',
  },
  {
    slug: 'foco-academia',
    title: SHOWCASE_PROJECTS.fitlife.label,
    tagline: 'Treino na palma da mão',
    description: SHOWCASE_PROJECTS.fitlife.description,
    features: [...SHOWCASE_PROJECTS.fitlife.features],
    tech: ['Flutter', 'Next.js', 'GPS'],
    desktop: '/portfolio/fitlife/web-instrutor-montar-treino.png',
    mobile: '/portfolio/fitlife/app-menu.png',
    href: SHOWCASE_PROJECTS.fitlife.href,
    external: false,
    cta: 'Conhecer e orçar',
    accent: 'from-fuchsia-400/25 via-pink-500/10 to-transparent',
    glow: 'bg-fuchsia-500/30',
  },
  {
    slug: 'app-rotas',
    title: SHOWCASE_PROJECTS.rotas.label,
    tagline: 'Entregas no melhor caminho',
    description: SHOWCASE_PROJECTS.rotas.description,
    features: [...SHOWCASE_PROJECTS.rotas.features],
    tech: ['Flutter', 'Mapas', 'Offline'],
    mobile: '/portfolio/rotas/app-inicio.png',
    mobile2: '/portfolio/rotas/app-rota-simulada.png',
    href: SHOWCASE_PROJECTS.rotas.href,
    external: false,
    cta: 'Conhecer e orçar',
    accent: 'from-violet-400/25 via-indigo-500/10 to-transparent',
    glow: 'bg-violet-500/30',
  },
]

/** Print real por slug, usado como capa quando o projeto não tem imagem própria (ou só tem uma ilustração SVG). */
export function getShowcaseCover(slug?: string | null) {
  if (!slug) return undefined
  const item = SHOWCASE.find((s) => s.slug === slug)
  return item?.desktop || item?.mobile
}
