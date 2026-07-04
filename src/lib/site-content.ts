export const DEFAULT_SERVICES = [
  {
    id: 'svc-web',
    title: 'Desenvolvimento Web & Mobile',
    description: 'Sites, painéis administrativos e apps nativos com React, Next.js e Flutter — rápidos, responsivos e prontos para escalar.',
  },
  {
    id: 'svc-infra',
    title: 'Infraestrutura & Deploy',
    description: 'Docker, CI/CD, Cloudflare Tunnel e servidores Hetzner configurados para alta disponibilidade e deploy automático.',
  },
  {
    id: 'svc-auto',
    title: 'Automação de Processos',
    description: 'Integrações, APIs e fluxos que eliminam tarefas manuais e conectam estoque, vendas, rotas e comunicação.',
  },
  {
    id: 'svc-design',
    title: 'UI/UX & Identidade Visual',
    description: 'Interfaces modernas, acessíveis e alinhadas à sua marca — do wireframe ao produto final publicado.',
  },
  {
    id: 'svc-consult',
    title: 'Consultoria Técnica',
    description: 'Auditoria de performance, segurança e arquitetura para sistemas legados ou projetos em crescimento.',
  },
  {
    id: 'svc-pwa',
    title: 'PWA & Apps Instaláveis',
    description: 'Transforme seu sistema em app instalável no celular, com login salvo e experiência offline quando necessário.',
  },
] as const

export const DEFAULT_PROJECTS = [
  {
    id: 'proj-estoque',
    slug: 'gerenciamento-estoque',
    title: 'Gerenciamento de Estoque',
    description: 'Plataforma completa para controle de produtos, vendas e estoque online — em produção em focodev.com.br.',
    coverImageUrl: '/portfolio/focomarket.svg',
  },
  {
    id: 'proj-rotas',
    slug: 'app-rotas',
    title: 'App Rotas',
    description: 'App mobile Flutter para planejamento de rotas de entrega, GPS e uso em campo por equipes operacionais.',
    coverImageUrl: '/portfolio/app-rotas.svg',
  },
  {
    id: 'proj-fintrack',
    slug: 'fintrack',
    title: 'FinTrack',
    description: 'Controle financeiro pessoal e empresarial com dashboards, categorias e relatórios visuais intuitivos.',
    coverImageUrl: '/portfolio/fintrack.svg',
  },
  {
    id: 'proj-fastburger',
    slug: 'fastburger',
    title: 'FastBurger',
    description: 'Sistema de pedidos para restaurantes com cardápio digital, gestão de fila e painel da cozinha.',
    coverImageUrl: '/portfolio/fastburger.svg',
  },
  {
    id: 'proj-educapro',
    slug: 'educapro',
    title: 'EducaPro',
    description: 'Plataforma educacional com aulas, progresso do aluno e área do professor em interface moderna.',
    coverImageUrl: '/portfolio/educapro.svg',
  },
  {
    id: 'proj-fitlife',
    slug: 'fitlife',
    title: 'FitLife',
    description: 'App de treinos e acompanhamento fitness com planos personalizados e métricas de evolução.',
    coverImageUrl: '/portfolio/fitlife.svg',
  },
] as const

export const HERO_STATS = [
  { value: '10+', label: 'Projetos entregues' },
  { value: '3', label: 'Sistemas em produção' },
  { value: '100%', label: 'Foco em resultado' },
] as const

export const TECH_STACK = ['Next.js', 'React', 'Flutter', 'Docker', 'PostgreSQL', 'Cloudflare'] as const

/** Depoimentos fictícios — avatares SVG próprios, sem imagens de terceiros. */
export const TESTIMONIALS = [
  {
    id: 'dep-1',
    name: 'Ana Beatriz Silva',
    role: 'Proprietária',
    company: 'Loja Virtual Mix',
    quote:
      'O sistema de estoque transformou nossa operação. Antes perdíamos horas conferindo planilhas; hoje tudo está online e a equipe acessa de qualquer lugar.',
    avatar: '/testimonials/ana-beatriz.svg',
    rating: 5,
  },
  {
    id: 'dep-2',
    name: 'Carlos Mendes',
    role: 'Gerente',
    company: 'Restaurante Sabor Caseiro',
    quote:
      'Profissionais atenciosos e entrega no prazo. O painel ficou simples de usar — até quem não entende de tecnologia aprendeu em um dia.',
    avatar: '/testimonials/carlos-mendes.svg',
    rating: 5,
  },
  {
    id: 'dep-3',
    name: 'Fernanda Rocha',
    role: 'Coordenadora de Logística',
    company: 'TransRota Express',
    quote:
      'O app de rotas para nossa equipe de campo foi um divisor de águas. Percursos otimizados e menos tempo perdido no trânsito.',
    avatar: '/testimonials/fernanda-rocha.svg',
    rating: 5,
  },
  {
    id: 'dep-4',
    name: 'João Pedro Alves',
    role: 'Sócio',
    company: 'Academia Fit Zone',
    quote:
      'Site moderno, rápido e com formulário de contato que realmente funciona. Recebemos leads qualificados desde a primeira semana no ar.',
    avatar: '/testimonials/joao-pedro.svg',
    rating: 5,
  },
  {
    id: 'dep-5',
    name: 'Mariana Costa',
    role: 'Diretora',
    company: 'Educação Online Plus',
    quote:
      'A FocoDev entendeu nossa necessidade e propôs uma solução sob medida. Suporte pós-entrega excelente — recomendo de olhos fechados.',
    avatar: '/testimonials/mariana-costa.svg',
    rating: 5,
  },
  {
    id: 'dep-6',
    name: 'Ricardo Nunes',
    role: 'CEO',
    company: 'Distribuidora Norte',
    quote:
      'Deploy automatizado, servidor estável e zero dor de cabeça. Finalmente nosso software roda em produção como deve ser.',
    avatar: '/testimonials/ricardo-nunes.svg',
    rating: 5,
  },
] as const
