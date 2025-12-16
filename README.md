## Focodev Site

Aplicação Next.js que representa o site institucional da Focodev, com painel admin para gestão de conteúdo e mensagens de contato.

### Tecnologias principais

- `Next.js` 14
- `React` 18
- `TypeScript`
- `Prisma` + banco relacional
- `NextAuth` para autenticação

### Scripts principais

- `npm run dev` – sobe o servidor de desenvolvimento
- `npm run build` – roda migrations em produção e gera o build
- `npm run start` – sobe o servidor do build
- `npm run lint` – validação de lint com `next lint`
- `npm run typecheck` – verificação de tipos com `tsc --noEmit`

### Variáveis de ambiente

Use um arquivo `.env.local` em desenvolvimento, seguindo como referência o `.env.example` existente no projeto (e o arquivo `CONTATO_SETUP.md` para o módulo de contato).

Nunca commite arquivos `.env*` ou segredos no repositório.

### Sistema de contato

O fluxo completo de contato está detalhado em `CONTATO_SETUP.md`. De forma resumida:

- Formulário público em `src/components/ContactForm.tsx`
- API pública de contato em `/api/contact`
- Persistência das mensagens na tabela `ContactMessage`
- Envio de e-mail e notificação WhatsApp (opcionais, via configuração)
- Painel admin para leitura e gestão em `/admin/contacts`

### Filtros de mensagens no painel admin

Na página `/admin/contacts` (`src/app/admin/contacts/page.tsx`) existem filtros combináveis:

- **Status**
  - `Todas` – não aplica filtro de status
  - `Não respondidas` – mensagens com status `NOVO`
  - `Respondidas` – mensagens com status `RESPONDIDO`

- **Período**
  - `Todas as datas` – histórico completo
  - `Semanal` – mensagens criadas na semana atual (a partir de segunda-feira)
  - `Mensal` – mensagens criadas no mês atual
  - `Anual` – mensagens criadas no ano atual

Os filtros são convertidos em parâmetros para a API de admin `/api/contacts` (`src/app/api/contacts/route.ts`):

- `status=NOVO|RESPONDIDO`
- `period=week|month|year`

A API aplica esses filtros sobre o campo `createdAt` da tabela `ContactMessage`.

