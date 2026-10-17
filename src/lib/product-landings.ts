export type GalleryCategory = {
  id: string
  /** Prefixo usado no alt da imagem no admin, ex.: [app], [instrutor] */
  tag: string
  title: string
  description: string
  /** Moldura dos prints: celular (app) ou navegador (sistema web) */
  frame: 'phone' | 'browser'
  /** Endereço exibido na barra do navegador (só para frame 'browser') */
  url?: string
  /** Prints padrão em /public (usados se ainda não houver fotos no admin) */
  defaultImages?: { url: string; alt: string }[]
}

export type AudienceBlock = {
  title: string
  description: string
  points: string[]
}

export type FeatureBlock = {
  title: string
  description: string
}

export type HeroChip = {
  /** Ícone: chave de HERO_CHIP_ICONS no componente */
  icon: 'check' | 'route' | 'timer' | 'map' | 'user' | 'chart'
  label: string
  value: string
}

export type ProductLandingContent = {
  slug: string
  projectSlug: string
  brand: string
  badge: string
  headline: string
  subheadline: string
  coverImage: string
  /** Números de destaque abaixo dos botões do topo */
  highlights: { value: string; label: string }[]
  /** Prints do topo (padrão: primeiros prints das galerias) */
  heroDesktop?: string
  /** Endereço exibido na barra do navegador do print do topo */
  heroDesktopUrl?: string
  heroPhones?: string[]
  /** Cartões flutuantes sobre os prints do topo */
  heroChips: HeroChip[]
  whatsappMessage: string
  contactDefaultMessage: string
  problemTitle: string
  problemText: string
  solutionTitle: string
  solutionText: string
  audiencesSubtitle: string
  audiences: AudienceBlock[]
  features: FeatureBlock[]
  benefits: string[]
  /** Subtítulo da seção de benefícios */
  benefitsSubtitle?: string
  galleries: GalleryCategory[]
  ctaTitle: string
  ctaText: string
}

export const PRODUCT_LANDINGS: Record<'fitlife' | 'rotas' | 'estoque', ProductLandingContent> = {
  fitlife: {
    slug: 'fitlife',
    projectSlug: 'foco-academia',
    brand: 'Foco Academia',
    badge: 'App de academia e treinos',
    headline: 'Musculação, outdoor e evolução — tudo no celular.',
    subheadline:
      'O Foco Academia une app mobile, painel do instrutor e portal do aluno. Ficha semanal com séries, treino outdoor com GPS, evolução de peso, sync offline e mídia nos exercícios. Para academias, personals e quem treina por conta própria.',
    coverImage: '/portfolio/fitlife/app-menu.png',
    highlights: [
      { value: 'App + Web', label: 'aluno e instrutor' },
      { value: 'GPS', label: 'treino outdoor' },
      { value: 'Offline', label: 'sincroniza depois' },
    ],
    heroDesktop: '/portfolio/fitlife/web-aluno-treinos.webp',
    heroDesktopUrl: 'academia.focodev.com.br',
    heroPhones: ['/portfolio/fitlife/app-exercicio.png', '/portfolio/fitlife/app-treino-outdoor.png'],
    heroChips: [
      { icon: 'check', label: 'Supino reto', value: 'Série 3 de 3 concluída' },
      { icon: 'route', label: 'Corrida intervalada', value: '5,2 km · 6\'12" /km' },
    ],
    whatsappMessage:
      'Olá! Quero fazer um orçamento do Foco Academia (app de academia/treinos).',
    contactDefaultMessage:
      'Olá! Tenho interesse no Foco Academia (app de academia). Gostaria de receber um orçamento e entender como contratar.',
    problemTitle: 'Treino no papel (ou no WhatsApp) trava o crescimento',
    problemText:
      'Planilhas, fotos de fichas e mensagens perdidas geram retrabalho, aluno desmotivado e instrutor sem tempo. Sem um sistema, a academia perde organização — e o aluno perde resultado.',
    solutionTitle: 'Uma plataforma completa para quem treina e quem ensina',
    solutionText:
      'No app o aluno marca séries, acompanha progresso, faz treino outdoor com GPS e sincroniza dados offline. No painel, o instrutor monta a ficha. No portal web, o aluno consulta quando quiser. Menos atrito. Mais evolução.',
    audiencesSubtitle:
      'Academia, profissional autônomo ou uso pessoal — qualquer um pode contratar.',
    audiences: [
      {
        title: 'Academias',
        description: 'Padronize treinos, reduza fila no balcão e ofereça uma experiência digital que fideliza.',
        points: [
          'Painel para a equipe de instrutores',
          'Portal web do aluno + app mobile',
          'Escalável para várias unidades ou modalidades',
        ],
      },
      {
        title: 'Instrutores e personals',
        description: 'Atenda alunos com profissionalismo sem depender de planilha ou print de treino.',
        points: [
          'Monte fichas e planos em minutos',
          'Acompanhe evolução e adesão',
          'Trabalhe como autônomo com sua própria base',
        ],
      },
      {
        title: 'Aluno ou usuário final',
        description: 'Contrate para uso pessoal: organize seus treinos e evolua com clareza, do seu jeito.',
        points: [
          'Musculação com ficha semanal e séries no app',
          'Treino outdoor com GPS, ritmo e splits',
          'Evolução de peso com balança Bluetooth e relógio',
        ],
      },
    ],
    features: [
      {
        title: 'Musculação com ficha semanal',
        description: 'Treinos por dia, exercícios, séries e mídia. O aluno marca cada série concluída e vê o progresso em tempo real.',
      },
      {
        title: 'Treino outdoor com GPS',
        description: 'Caminhada, corrida e intervalos com mapa, ritmo, distância, elevação, splits e exportação GPX/TCX.',
      },
      {
        title: 'Evolução e peso',
        description: 'Gráficos de evolução, balança Bluetooth e importação do relógio — o progresso fica visível.',
      },
      {
        title: 'Sincronização offline',
        description: 'Treine sem internet e envie os dados depois com um toque.',
      },
      {
        title: 'Painel do instrutor',
        description:
          'Cadastre alunos, crie fichas semanais, monte o treino do dia com biblioteca de exercícios, séries, reps e vídeo/foto.',
      },
      {
        title: 'Portal web do aluno',
        description:
          'Ficha semanal, evolução de peso, balança Bluetooth e canal de sugestões — tudo pelo navegador.',
      },
    ],
    benefits: [
      'Aluno sabe o que fazer no treino e marca série a série no celular',
      'Outdoor com GPS de verdade — ritmo, distância e fases intervaladas',
      'Evolução de peso e sync com balança/relógio',
      'Funciona offline e sincroniza depois',
      'Academia, personal autônomo ou uso individual',
      'Contratação sob medida — contato primeiro, acesso depois',
    ],
    galleries: [
      {
        id: 'app',
        tag: 'app',
        frame: 'phone',
        title: 'App mobile — Foco Academia',
        description: 'Telas reais: menu, musculação, execução de séries e treino outdoor com GPS.',
        defaultImages: [
          {
            url: '/portfolio/fitlife/app-menu.png',
            alt: 'Menu Foco Academia — evolução, outdoor, sync e musculação',
          },
          {
            url: '/portfolio/fitlife/app-musculacao.png',
            alt: 'Musculação — ficha semanal com dias feitos e progresso',
          },
          {
            url: '/portfolio/fitlife/app-exercicio.png',
            alt: 'Execução do treino — séries, progresso e cronômetro',
          },
          {
            url: '/portfolio/fitlife/app-treino-outdoor.png',
            alt: 'Treino outdoor — GPS, ritmo, fases e mapa',
          },
        ],
      },
      {
        id: 'instrutor',
        tag: 'instrutor',
        frame: 'browser',
        url: 'instrutor-academia.focodev.com.br',
        title: 'Painel do instrutor',
        description:
          'Login por código da academia, visão geral, cadastro de alunos, fichas semanais e montagem de treino com biblioteca de exercícios, séries, reps e mídia.',
        defaultImages: [
          {
            url: '/portfolio/fitlife/web-instrutor-montar-treino.webp',
            alt: 'Montar treino do dia — exercícios, séries, reps e biblioteca',
          },
          {
            url: '/portfolio/fitlife/web-instrutor-inicio.webp',
            alt: 'Visão geral — alunos, treinos ativos e sugestões pendentes',
          },
          {
            url: '/portfolio/fitlife/web-instrutor-alunos.webp',
            alt: 'Cadastro e lista de alunos no painel',
          },
          {
            url: '/portfolio/fitlife/web-instrutor-fichas.webp',
            alt: 'Fichas semanais ativas e inativas por aluno',
          },
          {
            url: '/portfolio/fitlife/web-instrutor-login.webp',
            alt: 'Login do Painel do Instrutor — código da academia, e-mail e senha',
          },
        ],
      },
      {
        id: 'aluno',
        tag: 'aluno',
        frame: 'browser',
        url: 'academia.focodev.com.br',
        title: 'Portal web do aluno',
        description:
          'Ficha semanal, evolução de peso, balança Bluetooth, sugestões para a academia e acesso pelo navegador.',
        defaultImages: [
          {
            url: '/portfolio/fitlife/web-aluno-treinos.webp',
            alt: 'Portal do aluno — minha ficha semanal com dias feitos',
          },
          {
            url: '/portfolio/fitlife/web-aluno-evolucao.webp',
            alt: 'Evolução de peso — gráfico, alerta do instrutor e balança Bluetooth',
          },
          {
            url: '/portfolio/fitlife/web-aluno-sugestoes.webp',
            alt: 'Sugestões — aluno envia ideias para a academia',
          },
        ],
      },
    ],
    ctaTitle: 'Pronto para levar sua academia (ou seus treinos) para o próximo nível?',
    ctaText:
      'Fale com a FocoDev, peça um orçamento e veja como o Foco Academia se encaixa no seu cenário — academia, personal ou uso pessoal.',
  },
  rotas: {
    slug: 'rotas',
    projectSlug: 'app-rotas',
    brand: 'App Rotas',
    badge: 'Logística e entregas em campo',
    headline: 'Clientes, rotas e equipe no mesmo app.',
    subheadline:
      'Cadastre clientes com CEP e GPS, crie e simule rotas, compartilhe com outros motoristas e faça backup local. Feito para quem vive a operação na rua — e para quem organiza no painel web.',
    coverImage: '/portfolio/rotas/app-inicio.png',
    highlights: [
      { value: 'CEP + GPS', label: 'cadastro de cliente' },
      { value: 'Simulação', label: 'rota antes de sair' },
      { value: 'Backup', label: 'no próprio celular' },
    ],
    heroPhones: [
      '/portfolio/rotas/app-inicio.png',
      '/portfolio/rotas/app-rota-simulada.png',
      '/portfolio/rotas/app-novo-cliente.png',
    ],
    heroChips: [
      { icon: 'map', label: 'Rota simulada', value: '8 paradas · 23 km' },
      { icon: 'user', label: 'Cliente salvo', value: 'Endereço com GPS' },
    ],
    whatsappMessage:
      'Olá! Quero fazer um orçamento do App Rotas (planejamento e gestão de entregas).',
    contactDefaultMessage:
      'Olá! Tenho interesse no App Rotas. Gostaria de um orçamento e de entender como contratar para minha operação.',
    problemTitle: 'Operação de entrega sem sistema vira apagar incêndio',
    problemText:
      'Endereços no WhatsApp, clientes sem cadastro certo e motoristas sem a rota na mão geram atraso e retrabalho. Sem ferramenta, a operação depende de memória — e memória falha.',
    solutionTitle: 'Do cadastro do cliente à rota no celular',
    solutionText:
      'No App Rotas você gerencia clientes, cria e simula rotas, envia localização ao servidor, faz backup no aparelho e repassa tudo para outro motorista. No painel web, quem organiza a operação monta o fluxo antes de sair para a rua.',
    audiencesSubtitle:
      'Empresa de entrega, comércio com frota própria ou equipe de motoristas — qualquer operação pode contratar.',
    audiences: [
      {
        title: 'Empresas de entrega e logística',
        description: 'Centralize clientes e rotas, reduza km parado e dê previsibilidade para a equipe.',
        points: [
          'App mobile para motoristas em campo',
          'Painel web para criar e organizar rotas',
          'Localização enviada ao servidor em tempo real',
        ],
      },
      {
        title: 'Comércios e operações próprias',
        description: 'Se você tem frota ou entregadores, padronize cadastro e percurso sem complicar o time.',
        points: [
          'Cadastro de cliente com CEP, endereço e GPS',
          'Criar e simular rotas antes de sair',
          'Backup local que sobrevive à desinstalação do app',
        ],
      },
      {
        title: 'Equipes de motoristas',
        description: 'Quem está na rua precisa de clareza — não de mensagem perdida.',
        points: [
          'Enviar clientes e rotas para outro motorista',
          'Recebe nas notificações e instala no app',
          'Tudo na mão: início, clientes, rotas e sugestões',
        ],
      },
    ],
    features: [
      {
        title: 'Gerenciar clientes',
        description: 'Cadastre clientes com nome, CEP, busca por endereço, rua, número, cidade, bairro e localização atual.',
      },
      {
        title: 'Criar e simular rotas',
        description: 'Monte o percurso no app e simule antes de sair — menos improviso na rua.',
      },
      {
        title: 'Localização em tempo real',
        description: 'O app envia a localização do dispositivo ao servidor enquanto a equipe está em campo.',
      },
      {
        title: 'Backup e restauração local',
        description: 'Salve em Downloads/AppRotas no celular. O backup não some se o app for desinstalado.',
      },
      {
        title: 'Enviar para outro motorista',
        description: 'Repasse clientes e rotas; o outro motorista recebe na notificação e instala no app ao aceitar.',
      },
      {
        title: 'Painel web + implantação FocoDev',
        description: 'Quem organiza cria rotas no painel; a FocoDev libera o acesso após a contratação.',
      },
    ],
    benefits: [
      'Cadastro de cliente com CEP e GPS — sem endereço pela metade',
      'Criar e simular rotas antes de sair para a entrega',
      'Compartilhe a base com outro motorista em um toque',
      'Backup local seguro no aparelho',
      'Localização sendo enviada ao servidor enquanto trabalha',
      'Orçamento sob medida — contato primeiro, acesso depois',
    ],
    galleries: [
      {
        id: 'app',
        tag: 'app',
        frame: 'phone',
        title: 'App mobile',
        description: 'Telas reais do App Rotas: início, clientes, rotas, backup e compartilhamento entre motoristas.',
        defaultImages: [
          {
            url: '/portfolio/rotas/app-inicio.png',
            alt: 'Tela Início — gerenciar clientes, criar rotas, backup e enviar para motorista',
          },
          {
            url: '/portfolio/rotas/app-novo-cliente.png',
            alt: 'Tela Novo cliente — CEP, endereço, GPS e salvar',
          },
          {
            url: '/portfolio/rotas/app-rota-simulada.png',
            alt: 'Rota simulada no mapa — prévia pelas ruas com início e paradas numeradas',
          },
        ],
      },
      {
        id: 'painel',
        tag: 'painel',
        frame: 'browser',
        title: 'Painel web — criar e gerenciar rotas',
        description: 'Área do cliente/gestor para montar rotas, organizar entregas e acompanhar a operação.',
      },
    ],
    ctaTitle: 'Quer colocar suas rotas sob controle?',
    ctaText:
      'Fale com a FocoDev, peça um orçamento e veja como o App Rotas se encaixa na sua operação de entregas.',
  },
  estoque: {
    slug: 'estoque',
    projectSlug: 'gerenciamento-estoque',
    brand: 'Gerenciamento de Estoque',
    badge: 'ERP de estoque e vendas',
    headline: 'Estoque, vendas e compras sob controle — de qualquer lugar.',
    subheadline:
      'Sistema online para lojas, distribuidoras e depósitos: produtos, clientes, vendas, compras, fornecedores e movimentações num só painel. Alerta de estoque baixo, inventário, relatórios de faturamento e acesso pelo computador ou celular.',
    coverImage: '/portfolio/estoque/painel.webp',
    highlights: [
      { value: 'Online', label: 'computador e celular' },
      { value: 'Alertas', label: 'estoque baixo' },
      { value: 'Relatórios', label: 'faturamento e giro' },
    ],
    heroDesktop: '/portfolio/estoque/painel.webp',
    heroDesktopUrl: 'focodev.com.br',
    heroPhones: ['/portfolio/estoque/painel-celular.webp'],
    heroChips: [
      { icon: 'chart', label: 'Faturamento do mês', value: 'R$ 48.230,50' },
      { icon: 'check', label: 'Pedido de venda #87', value: 'Confirmado · baixa no estoque' },
    ],
    whatsappMessage:
      'Olá! Quero fazer um orçamento do sistema de Gerenciamento de Estoque.',
    contactDefaultMessage:
      'Olá! Tenho interesse no sistema de Gerenciamento de Estoque. Gostaria de um orçamento e de entender como contratar para o meu negócio.',
    problemTitle: 'Planilha não avisa quando o produto acaba',
    problemText:
      'Estoque controlado no caderno ou em planilhas gera divergência, venda de produto que não existe, compra em excesso e horas de conferência. Sem números confiáveis, o dono decide no escuro — e o dinheiro fica parado na prateleira.',
    solutionTitle: 'Um painel com o estoque real, atualizado a cada venda',
    solutionText:
      'Cada venda, compra e movimentação atualiza o estoque na hora. O sistema avisa o que está acabando, mostra o que mais vende e quanto vale o seu estoque, e a equipe acessa de qualquer lugar com o próprio login.',
    audiencesSubtitle:
      'Para quem vende produtos e precisa saber, a qualquer momento, o que tem, o que vendeu e o que precisa comprar.',
    audiences: [
      {
        title: 'Lojas e comércio',
        description: 'Venda com segurança sabendo exatamente o que tem na prateleira e no depósito.',
        points: [
          'Pedidos de venda com baixa automática',
          'Cadastro de clientes e histórico de compras',
          'Alerta de estoque mínimo por produto',
        ],
      },
      {
        title: 'Distribuidoras e depósitos',
        description: 'Controle entradas, saídas e transferências entre depósitos sem perder nada no caminho.',
        points: [
          'Vários depósitos e movimentações',
          'Pedidos de compra e fornecedores',
          'Inventário e auditoria das alterações',
        ],
      },
      {
        title: 'Gestores e donos',
        description: 'Números confiáveis para decidir compra, preço e promoção.',
        points: [
          'Faturamento dos últimos meses',
          'Produtos mais vendidos e valor em estoque',
          'Acessos por usuário e por empresa',
        ],
      },
    ],
    features: [
      {
        title: 'Produtos e categorias',
        description: 'Cadastro completo com preço, quantidade, estoque mínimo e categoria — com busca e paginação para catálogos grandes.',
      },
      {
        title: 'Vendas e clientes',
        description: 'Pedidos de venda que dão baixa no estoque automaticamente e histórico por cliente.',
      },
      {
        title: 'Compras e fornecedores',
        description: 'Pedidos de compra, cadastro de fornecedores e pesquisa de preço antes de repor.',
      },
      {
        title: 'Movimentações e depósitos',
        description: 'Entradas, saídas e transferências entre depósitos com rastreabilidade de quem fez e quando.',
      },
      {
        title: 'Alertas e inventário',
        description: 'Aviso de estoque baixo no painel e contagem de inventário para manter o físico igual ao sistema.',
      },
      {
        title: 'Relatórios e painel',
        description: 'Faturamento do mês, valor em estoque (custo e venda), top produtos vendidos e evolução dos últimos meses.',
      },
    ],
    benefits: [
      'Estoque atualizado a cada venda, compra e movimentação',
      'Aviso antes de faltar produto — sem venda perdida',
      'Saiba quanto dinheiro está parado no estoque',
      'Equipe acessa pelo computador ou celular, cada um com seu login',
      'Auditoria de quem alterou o quê',
      'Implantação e suporte com a FocoDev, sob medida para o seu negócio',
    ],
    benefitsSubtitle: 'Menos conferência manual, mais controle sobre o dinheiro do seu negócio.',
    galleries: [
      {
        id: 'sistema',
        tag: 'sistema',
        frame: 'browser',
        url: 'focodev.com.br',
        title: 'Por dentro do sistema',
        description: 'Telas reais: painel com indicadores e gráficos, e a lista de produtos com estoque e estoque mínimo.',
        defaultImages: [
          {
            url: '/portfolio/estoque/painel.webp',
            alt: 'Painel — faturamento, valor em estoque, estoque baixo e produtos mais vendidos',
          },
          {
            url: '/portfolio/estoque/produtos.webp',
            alt: 'Produtos — quantidade, estoque mínimo, preço e ações',
          },
        ],
      },
      {
        id: 'celular',
        tag: 'celular',
        frame: 'phone',
        title: 'Também no celular',
        description: 'O mesmo sistema adaptado para a tela do celular, com menu inferior e atalhos.',
        defaultImages: [
          {
            url: '/portfolio/estoque/painel-celular.webp',
            alt: 'Painel no celular — atalhos e indicadores do mês',
          },
        ],
      },
    ],
    ctaTitle: 'Quer o estoque da sua empresa sob controle?',
    ctaText:
      'Fale com a FocoDev, peça um orçamento e veja como o sistema se adapta aos seus produtos, depósitos e equipe.',
  },
}

/** Mapeia slug de portfólio → rota da landing */
export const PROJECT_LANDING_HREFS: Record<string, string> = {
  fitlife: '/fitlife',
  'foco-academia': '/fitlife',
  'app-rotas': '/rotas',
  'gerenciamento-estoque': '/estoque',
}

export function getProjectHref(slug: string) {
  return PROJECT_LANDING_HREFS[slug] || `/projects/${slug}`
}

export type GalleryImage = { id: string; url: string; alt: string | null }

export function groupImagesByGallery(
  images: GalleryImage[],
  galleries: GalleryCategory[],
): Record<string, GalleryImage[]> {
  const result: Record<string, GalleryImage[]> = {}
  for (const g of galleries) result[g.id] = []

  for (const img of images) {
    const alt = (img.alt || '').toLowerCase()
    const matched = galleries.find((g) => {
      const tag = g.tag.toLowerCase()
      return (
        alt.includes(`[${tag}]`) ||
        alt.startsWith(`${tag}:`) ||
        alt.startsWith(`${tag} -`) ||
        alt.includes(`(${tag})`)
      )
    })
    if (matched) {
      result[matched.id].push(img)
    } else if (galleries[0]) {
      // Sem tag: cai na primeira galeria para não “sumir” foto
      result[galleries[0].id].push(img)
    }
  }

  // Se a galeria ficou vazia, usa prints padrão do produto
  for (const g of galleries) {
    if (result[g.id].length === 0 && g.defaultImages?.length) {
      result[g.id] = g.defaultImages.map((img, i) => ({
        id: `default-${g.id}-${i}`,
        url: img.url,
        alt: img.alt,
      }))
    }
  }

  return result
}
