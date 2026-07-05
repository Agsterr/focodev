# Deploy Hetzner — focodev-site

Site institucional Next.js no mesmo servidor das demais apps FocoDev.

## Arquitetura

| Hostname | Destino | Servico |
|----------|---------|---------|
| `https://focodev.com.br` | localhost:80 | Gerenciamento de Estoque |
| `https://www.focodev.com.br` | localhost:8082 | Site institucional (este repo) |
| `https://painel.focodev.com.br` | localhost:8082 | Painel admin (fotos, projetos, vídeos) |
| `https://rotas.focodev.com.br` | localhost:8081 | App Rotas API |
| `https://admin.rotas.focodev.com.br` | localhost:8081 | Admin Rotas |

Tunel Cloudflare unico: `gerenciamento-estoque` (container em `/opt/gerenciamento-estoque`).

## Setup unico no servidor

```bash
ssh hetzner
mkdir -p /opt/focodev-site
# Copiar .env.production.example -> /opt/focodev-site/.env e preencher
bash /opt/focodev-site/scripts/setup-git-hetzner.sh
bash /opt/focodev-site/scripts/deploy-hetzner.sh
```

Cloudflare (ingress + DNS www):

```bash
export CLOUDFLARE_API_TOKEN='...'
bash /opt/focodev-site/scripts/cloudflare-add-site-hostname.sh
```

## CI/CD GitHub Actions

Secrets em https://github.com/Agsterr/focodev/settings/secrets/actions:

| Secret | Valor |
|--------|--------|
| `HETZNER_HOST` | `178.105.11.19` |
| `HETZNER_USER` | `root` |
| `HETZNER_SSH_KEY` | Chave privada CI (mesma dos outros repos) |

Deploy key read-only do servidor em **Deploy keys** do repo `Agsterr/focodev`.

## Pos-deploy

Seed inicial do admin:

```bash
docker compose -f /opt/focodev-site/docker-compose.yml exec app node prisma/seed.js
```

Após o seed, use o usuário administrador definido em `prisma/seed.js` e **troque a senha no primeiro acesso**.

## Vercel

Apos validar producao no Hetzner, remover/deploy desativar projeto na Vercel e apontar DNS restante para Cloudflare.
