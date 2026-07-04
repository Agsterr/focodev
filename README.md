# Focodev Site

Site institucional da **FocoDev** com painel administrativo para gestão de conteúdo, portfólio de projetos e mensagens de contato.

**Produção:** [focodev.com.br](https://focodev.com.br)

---

## O que faz

- Página pública com serviços, projetos, depoimentos e formulário de contato
- Painel admin (`/admin`) para editar textos, imagens, vídeos, banner e portfólio
- Gestão de mensagens de contato com filtros por status e período
- Notificações por e-mail (Resend) e WhatsApp (opcional)
- Upload de mídia via Cloudinary

---

## Tecnologias

| Camada | Stack |
|--------|-------|
| Framework | Next.js 14, React 18, TypeScript |
| Estilo | Tailwind CSS |
| Banco | PostgreSQL (Prisma ORM) |
| Auth | NextAuth |
| Mídia | Cloudinary |
| Infra | Docker, Hetzner, Cloudflare Tunnel |
| CI/CD | GitHub Actions |

---

## Como rodar localmente

```bash
git clone https://github.com/Agsterr/focodev.git
cd focodev
npm install
cp .env.example .env.local   # preencha as variáveis
npm run db:migrate
npm run db:seed
npm run dev
```

Acesse `http://localhost:3000`. O painel admin fica em `/admin/login`.

---

## Scripts principais

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera Prisma Client e build de produção |
| `npm run build:deploy` | Migrations + build (usado no deploy) |
| `npm run start` | Servidor do build |
| `npm run lint` | Validação ESLint |
| `npm run typecheck` | Verificação de tipos TypeScript |
| `npm run db:migrate` | Migrations do Prisma |
| `npm run db:seed` | Popula dados iniciais |

---

## Variáveis de ambiente

Use `.env.local` em desenvolvimento, seguindo o `.env.example`.

Nunca commite arquivos `.env*` ou segredos no repositório.

Para o módulo de contato (e-mail e WhatsApp), veja [CONTATO_SETUP.md](CONTATO_SETUP.md).

---

## Sistema de contato

- Formulário público: `src/components/ContactForm.tsx`
- API: `POST /api/contact`
- Mensagens salvas na tabela `ContactMessage`
- Painel admin: `/admin/contacts`

Filtros disponíveis no painel (status + período semanal/mensal/anual). Detalhes em [CONTATO_SETUP.md](CONTATO_SETUP.md).

---

## Deploy em produção

| Item | Valor |
|------|-------|
| Servidor | Hetzner (`178.105.11.19`) |
| Path | `/opt/focodev-site` |
| Domínio | `https://focodev.com.br` |

Deploy automático via push na branch `main`. Documentação: [docs/DEPLOY_HETZNER.md](docs/DEPLOY_HETZNER.md) e [docs/CICD.md](docs/CICD.md).

---

## Autor

**Agster Junior da Costa Santos** — [GitHub](https://github.com/Agsterr)
