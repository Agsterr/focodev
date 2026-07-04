#!/usr/bin/env bash
set -euo pipefail
cd /opt/focodev-site
PASS=$(grep '^POSTGRES_PASSWORD=' .env | cut -d= -f2-)
docker run --rm --network focodev-site_app-network \
  -v /opt/focodev-site/prisma:/work -w /work \
  -e "DATABASE_URL=postgresql://focodev:${PASS}@postgres:5432/focodev_site?schema=public" \
  node:20-alpine sh -lc '
    apk add --no-cache openssl libc6-compat
    npm install bcryptjs@2.4.3 @prisma/client@5.22.0 prisma@5.22.0
    npx prisma generate
    node seed.js
  '
