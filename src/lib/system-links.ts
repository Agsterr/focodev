export const SYSTEM_LINKS = {
  estoque: {
    label: 'Gerenciamento de Estoque',
    description: 'Controle de produtos, vendas e estoque online.',
    href: 'https://focodev.com.br',
  },
} as const

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
