#!/bin/sh
set -e
if [ -n "$DATABASE_URL" ] && [ -f ./node_modules/prisma/build/index.js ]; then
  node ./node_modules/prisma/build/index.js migrate deploy
fi
exec node server.js
