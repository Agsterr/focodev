export type SystemLink = {
  label: string
  description: string
  href: string
}

export const SYSTEM_LINKS = {
  estoque: {
    label: 'Gerenciamento de Estoque',
    description: 'Controle de produtos, vendas e estoque online.',
    href: 'https://focodev.com.br',
  },
  mercado: {
    label: 'Mercado Digital',
    description: 'PWA de mercado com catálogo, pedidos, entregas e painel do dono.',
    href: 'https://mercado.focodev.com.br',
  },
  barbearia: {
    label: 'Barbearia',
    description: 'Agendamentos, fila e painel administrativo para barbearias.',
    href: 'https://barbearia.focodev.com.br',
  },
  academia: {
    label: 'Foco Academia',
    description: 'App de academia com musculação, outdoor, painel do instrutor e portal do aluno.',
    href: '/fitlife',
  },
} as const satisfies Record<string, SystemLink>

/** Sistemas em produção com link externo (exibidos na seção "Nossos Sistemas"). */
export const PRODUCTION_SYSTEMS: SystemLink[] = [
  SYSTEM_LINKS.estoque,
  SYSTEM_LINKS.mercado,
  SYSTEM_LINKS.barbearia,
]

/** URL externa por slug do portfólio (quando o projeto está online). */
export const PROJECT_EXTERNAL_URLS: Record<string, string> = {
  'gerenciamento-estoque': SYSTEM_LINKS.estoque.href,
  'mercado-digital': SYSTEM_LINKS.mercado.href,
  barbearia: SYSTEM_LINKS.barbearia.href,
}

/** Produtos com landing própria no site (contato primeiro — sem login aberto). */
export const SHOWCASE_PROJECTS = {
  rotas: {
    label: 'App Rotas',
    description:
      'App mobile e painel web para planejamento e gestão de rotas de entrega. Otimização de percursos, GPS e operação em campo.',
    badge: 'App + painel web',
    tech: 'Flutter',
    image: '/portfolio/rotas/app-inicio.png',
    features: ['Planejamento de rotas', 'GPS e mapas', 'Painel para criar rotas'],
    href: '/rotas',
  },
  fitlife: {
    label: 'Foco Academia',
    description:
      'App de academia com musculação, treino outdoor (GPS), evolução de peso, painel do instrutor e portal do aluno.',
    badge: 'App + painéis web',
    tech: 'Mobile + Web',
    image: '/portfolio/fitlife/app-menu.png',
    features: ['Musculação e séries', 'Outdoor com GPS', 'Painel do instrutor'],
    href: '/fitlife',
  },
} as const
