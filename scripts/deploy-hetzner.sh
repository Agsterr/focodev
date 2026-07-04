#!/usr/bin/env bash
# Deploy no servidor Hetzner: git pull + docker compose rebuild.
set -euo pipefail

APP_DIR="/opt/focodev-site"
BRANCH="${DEPLOY_BRANCH:-main}"
DEPLOY_KEY="/root/.ssh/github_deploy_focodev_site"

cd "$APP_DIR"

if [[ ! -d .git ]]; then
  echo "ERRO: ${APP_DIR} nao e um repositorio git."
  echo "Execute uma vez: bash ${APP_DIR}/scripts/setup-git-hetzner.sh"
  exit 1
fi

git remote set-url origin git@github.com-focodev-site:Agsterr/focodev.git 2>/dev/null || true

if [[ -f "$DEPLOY_KEY" ]]; then
  export GIT_SSH_COMMAND="ssh -i ${DEPLOY_KEY} -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"
fi

echo "==> Atualizando codigo (origin/${BRANCH})"
git fetch origin "$BRANCH"
git reset --hard "origin/${BRANCH}"

if [[ ! -f .env ]]; then
  echo "ERRO: .env ausente em ${APP_DIR}. Copie .env.production.example e preencha os valores."
  exit 1
fi

echo "==> Rebuild e restart (docker compose)"
docker compose up -d --build

echo "==> Seed (servicos e portfolio)"
bash "${APP_DIR}/scripts/seed-hetzner.sh" || echo "AVISO: seed falhou (pode rodar manualmente)"

echo "==> Status dos containers"
docker ps --filter name=focodev-site --format 'table {{.Names}}\t{{.Status}}'

echo "Deploy concluido em $(date -u +'%Y-%m-%dT%H:%M:%SZ')."
