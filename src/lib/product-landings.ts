export type GalleryCategory = {
  id: string
  /** Prefixo usado no alt da imagem no admin, ex.: [app], [instrutor] */
  tag: string
  title: string
  description: string
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

export type ProductLandingContent = {
  slug: string
  projectSlug: string
  brand: string
  badge: string
  headline: string
  subheadline: string
  coverImage: string
  whatsappMessage: string
  contactDefaultMessage: string
  problemTitle: string
  problemText: string
  solutionTitle: string
  solutionText: string
  audiences: AudienceBlock[]
  features: FeatureBlock[]
  benefits: string[]
  galleries: GalleryCategory[]
  ctaTitle: string
  ctaText: string
}

export const PRODUCT_LANDINGS: Record<'fitlife' | 'rotas', ProductLandingContent> = {
  fitlife: {
    slug: 'fitlife',
    projectSlug: 'foco-academia',
    brand: 'Foco Academia',
    badge: 'App de academia e treinos',
    headline: 'Musculação, outdoor e evolução — tudo no celular.',
    subheadline:
      'O Foco Academia une app mobile, painel do instrutor e portal do aluno. Ficha semanal com séries, treino outdoor com GPS, evolução de peso, sync offline e mídia nos exercícios. Para academias, personals e quem treina por conta própria.',
    coverImage: '/portfolio/fitlife/app-menu.png',
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
        title: 'Painel do instrutor',
        description:
          'Login por código da academia, visão geral, cadastro de alunos, fichas semanais e montagem de treino com biblioteca de exercícios, séries, reps e mídia.',
        defaultImages: [
          {
            url: '/portfolio/fitlife/web-instrutor-login.png',
            alt: 'Login do Painel do Instrutor — código da academia, e-mail e senha',
          },
          {
            url: '/portfolio/fitlife/web-instrutor-inicio.png',
            alt: 'Visão geral — alunos, treinos ativos e sugestões pendentes',
          },
          {
            url: '/portfolio/fitlife/web-instrutor-alunos.png',
            alt: 'Cadastro e lista de alunos no painel',
          },
          {
            url: '/portfolio/fitlife/web-instrutor-fichas.png',
            alt: 'Fichas semanais ativas e inativas por aluno',
          },
          {
            url: '/portfolio/fitlife/web-instrutor-montar-treino.png',
            alt: 'Montar treino do dia — exercícios, séries, reps e biblioteca',
          },
        ],
      },
      {
        id: 'aluno',
        tag: 'aluno',
        title: 'Portal web do aluno',
        description:
          'Ficha semanal, evolução de peso, balança Bluetooth, sugestões para a academia e acesso pelo navegador.',
        defaultImages: [
          {
            url: '/portfolio/fitlife/web-aluno-treinos.png',
            alt: 'Portal do aluno — minha ficha semanal com dias feitos',
          },
          {
            url: '/portfolio/fitlife/web-aluno-evolucao.png',
            alt: 'Evolução de peso — gráfico, alerta do instrutor e balança Bluetooth',
          },
          {
            url: '/portfolio/fitlife/web-aluno-sugestoes.png',
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
        title: 'Painel web — criar e gerenciar rotas',
        description: 'Área do cliente/gestor para montar rotas, organizar entregas e acompanhar a operação.',
      },
    ],
    ctaTitle: 'Quer colocar suas rotas sob controle?',
    ctaText:
      'Fale com a FocoDev, peça um orçamento e veja como o App Rotas se encaixa na sua operação de entregas.',
  },
}

/** Mapeia slug de portfólio → rota da landing */
export const PROJECT_LANDING_HREFS: Record<string, string> = {
  fitlife: '/fitlife',
  'foco-academia': '/fitlife',
  'app-rotas': '/rotas',
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
