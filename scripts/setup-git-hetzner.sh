#!/usr/bin/env bash
# Configuracao unica no Hetzner: deploy key GitHub + git clone in-place.
set -euo pipefail

APP_DIR="/opt/focodev-site"
REPO="${FOCODEV_SITE_REPO:-git@github.com-focodev-site:Agsterr/focodev.git}"
DEPLOY_KEY="/root/.ssh/github_deploy_focodev_site"
BRANCH="${DEPLOY_BRANCH:-main}"

mkdir -p /root/.ssh
chmod 700 /root/.ssh

if ! grep -q "^github.com" /root/.ssh/known_hosts 2>/dev/null; then
  ssh-keyscan -H github.com >> /root/.ssh/known_hosts 2>/dev/null
fi

if [[ ! -f "$DEPLOY_KEY" ]]; then
  echo "==> Gerando deploy key para GitHub (read-only)"
  ssh-keygen -t ed25519 -f "$DEPLOY_KEY" -N "" -C "hetzner-deploy-focodev-site@focodev.com.br"
fi

if ! grep -q "Host github.com-focodev-site" /root/.ssh/config 2>/dev/null; then
  cat >> /root/.ssh/config <<EOF

Host github.com-focodev-site
  HostName github.com
  User git
  IdentityFile ${DEPLOY_KEY}
  IdentitiesOnly yes
EOF
  chmod 600 /root/.ssh/config
fi

echo ""
echo "=========================================="
echo " ADICIONE ESTA CHAVE NO GITHUB (read-only)"
echo " Repo: Agsterr/focodev"
echo " Settings -> Deploy keys -> Add deploy key"
echo "=========================================="
cat "${DEPLOY_KEY}.pub"
echo "=========================================="
echo ""

auth_msg=$(ssh -T -o BatchMode=yes -o ConnectTimeout=10 git@github.com-focodev-site 2>&1) || true
if ! printf '%s\n' "$auth_msg" | grep -qi "successfully authenticated"; then
  echo "AVISO: GitHub ainda nao aceita a deploy key. Adicione a chave acima e rode este script de novo."
  exit 1
fi

mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [[ ! -d .git ]]; then
  echo "==> Inicializando repositorio git em ${APP_DIR}"
  git init
  git remote add origin "$REPO" 2>/dev/null || git remote set-url origin "$REPO"
fi

export GIT_SSH_COMMAND="ssh -i ${DEPLOY_KEY} -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"

backup_preserved_files() {
  local backup_dir
  backup_dir="/root/setup-git-focodev-site-backup-$(date +%Y%m%d%H%M%S)"
  mkdir -p "$backup_dir"
  [[ -f .env ]] && cp -a .env "$backup_dir/.env"
  echo "$backup_dir"
}

restore_preserved_files() {
  local backup_dir="$1"
  [[ -f "$backup_dir/.env" && ! -f .env ]] && cp -a "$backup_dir/.env" .env
}

git_clean_preserve_local() {
  git clean -fd -e .env -e scripts
}

sync_with_origin() {
  local backup_dir
  backup_dir=$(backup_preserved_files)

  echo "==> Sincronizando com origin/${BRANCH}"
  git fetch origin "$BRANCH"
  git checkout -B "$BRANCH" "origin/${BRANCH}" 2>/dev/null || true
  git reset --hard "origin/${BRANCH}"
  git branch -M "$BRANCH" 2>/dev/null || true

  git_clean_preserve_local
  restore_preserved_files "$backup_dir"

  echo "Repositorio alinhado com origin/${BRANCH} ($(git rev-parse --short HEAD 2>/dev/null || echo '?'))"
}

sync_with_origin

chmod +x "${APP_DIR}/scripts/"*.sh 2>/dev/null || true

echo "Setup git concluido. Deploy manual: bash ${APP_DIR}/scripts/deploy-hetzner.sh"
