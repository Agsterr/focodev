# CI/CD — GitHub Actions → Hetzner (focodev-site)

## Fluxo

```
push main → GitHub Actions → SSH → deploy-hetzner.sh
  → git pull
  → docker compose up -d --build
  → seed (serviços + portfólio)
```

## Secrets (repo `Agsterr/focodev`)

| Secret | Valor |
|--------|--------|
| `HETZNER_HOST` | `178.105.11.19` |
| `HETZNER_USER` | `root` |
| `HETZNER_SSH_KEY` | Chave privada CI (mesma dos outros repos) |

## Setup único no servidor

```bash
ssh hetzner "bash /opt/focodev-site/scripts/setup-git-hetzner.sh"
```

Cadastre a deploy key exibida em: https://github.com/Agsterr/focodev/settings/keys (read-only)

Depois rode de novo até exit 0:

```bash
ssh hetzner "bash /opt/focodev-site/scripts/setup-git-hetzner.sh"
```

## Deploy manual

```bash
ssh hetzner "bash /opt/focodev-site/scripts/deploy-hetzner.sh"
```

## URLs

| Serviço | URL |
|---------|-----|
| Site institucional | https://www.focodev.com.br |
| **Painel admin** | https://painel.focodev.com.br |
| Estoque | https://focodev.com.br |

Após o seed (`prisma/seed.js`), faça login no painel com o usuário administrador configurado no seed e **altere a senha no primeiro acesso**.

## Painel — o que você gerencia

| Seção | URL | Função |
|-------|-----|--------|
| Dashboard | `/admin` | Visão geral |
| Banner | `/admin/banner` | Título e CTA da homepage |
| Projetos | `/admin/projects` | Portfólio |
| Serviços | `/admin/services` | Cards de serviços |
| Vídeos | `/admin/videos` | YouTube embeds |
| Galeria | `/admin/images` | Upload de fotos (Cloudinary) |
| Contatos | `/admin/contacts` | Mensagens do formulário |
| Empresa | `/admin/company` | Dados e WhatsApp |

### Cloudinary (upload de fotos)

No `.env` do servidor:

```env
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NEXTAUTH_URL=https://painel.focodev.com.br
```

## Cloudflare — hostname painel

No túnel `gerenciamento-estoque` → Published application routes:

- `painel.focodev.com.br` → `127.0.0.1:8082`

DNS: CNAME `painel` → `<tunnel-id>.cfargotunnel.com` (proxied)
