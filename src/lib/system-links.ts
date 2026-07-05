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
    description: 'Treinos, avaliações e acompanhamento para alunos e instrutores.',
    href: 'https://academia.focodev.com.br',
  },
} as const satisfies Record<string, SystemLink>

/** Sistemas em produção com link externo (exibidos na seção "Nossos Sistemas"). */
export const PRODUCTION_SYSTEMS: SystemLink[] = [
  SYSTEM_LINKS.estoque,
  SYSTEM_LINKS.mercado,
  SYSTEM_LINKS.barbearia,
  SYSTEM_LINKS.academia,
]

/** URL externa por slug do portfólio (quando o projeto está online). */
export const PROJECT_EXTERNAL_URLS: Record<string, string> = {
  'gerenciamento-estoque': SYSTEM_LINKS.estoque.href,
  'mercado-digital': SYSTEM_LINKS.mercado.href,
  barbearia: SYSTEM_LINKS.barbearia.href,
  'foco-academia': SYSTEM_LINKS.academia.href,
}

/** Projetos exibidos como amostra no site — sem link externo (ex.: apps mobile). */
export const SHOWCASE_PROJECTS = {
  rotas: {
    label: 'App Rotas',
    description:
      'App mobile Flutter para planejamento e gestão de rotas de entrega. Otimização de percursos, acompanhamento em tempo real e interface pensada para equipes de campo.',
    badge: 'App mobile',
    tech: 'Flutter',
    image: '/portfolio/app-rotas.svg',
    features: ['Planejamento de rotas', 'GPS e mapas', 'Uso em campo'],
  },
} as const
