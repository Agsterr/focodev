#!/usr/bin/env bash
# Atualiza ingress do tunel gerenciamento-estoque para o site institucional (www).
# Com CLOUDFLARE_API_TOKEN: ingress via API + CNAME DNS (se permissao Zone DNS Edit).
set -euo pipefail

SITE_HOSTNAME="${SITE_PUBLIC_HOSTNAME:-www.focodev.com.br}"
ORIGIN="${SITE_ORIGIN:-http://127.0.0.1:8082}"
ZONE_NAME="${CLOUDFLARE_ZONE_NAME:-focodev.com.br}"
ESTOQUE_ENV="${ESTOQUE_ENV:-/opt/gerenciamento-estoque/.env}"
API_TOKEN="${CLOUDFLARE_API_TOKEN:-}"

if [[ -z "$API_TOKEN" ]]; then
  cat <<EOF
================================================================================
Cloudflare — hostname ${SITE_HOSTNAME} (tunel gerenciamento-estoque)
================================================================================

Defina CLOUDFLARE_API_TOKEN ou configure no painel Zero Trust:

  1. https://one.dash.cloudflare.com/networks/tunnels
  2. Tunel "gerenciamento-estoque" -> Public Hostname -> Add/Edit
  3. ${SITE_HOSTNAME} -> HTTP -> 127.0.0.1:8082

Mantenha focodev.com.br -> localhost:80 (Gerenciamento de Estoque).

Verificacao:
  curl -sI https://${SITE_HOSTNAME}/
================================================================================
EOF
  exit 1
fi

if [[ ! -f "$ESTOQUE_ENV" ]]; then
  echo "ERRO: $ESTOQUE_ENV nao encontrado."
  exit 1
fi

readarray -t IDS < <(ESTOQUE_ENV="$ESTOQUE_ENV" python3 - <<'PY'
import json, base64, os
env = os.environ["ESTOQUE_ENV"]
token = None
for line in open(env):
    if line.startswith("CLOUDFLARED_TUNNEL_TOKEN="):
        token = line.split("=", 1)[1].strip()
        break
if not token:
    raise SystemExit("CLOUDFLARED_TUNNEL_TOKEN ausente no estoque")
raw = token + "=" * (-len(token) % 4)
data = json.loads(base64.urlsafe_b64decode(raw))
print(data["a"])
print(data["t"])
PY
)
ACCOUNT_ID="${IDS[0]}"
TUNNEL_ID="${IDS[1]}"
TUNNEL_CNAME="${TUNNEL_ID}.cfargotunnel.com"

PAYLOAD=$(SITE_HOSTNAME="$SITE_HOSTNAME" ORIGIN="$ORIGIN" python3 - <<'PY'
import json, os
site = os.environ["SITE_HOSTNAME"]
origin = os.environ["ORIGIN"]
config = {
  "config": {
    "ingress": [
      {"hostname": "focodev.com.br", "service": "http://localhost:80"},
      {"hostname": site, "service": origin},
      {"hostname": "painel.focodev.com.br", "service": origin},
      {"hostname": "rotas.focodev.com.br", "service": "http://127.0.0.1:8081"},
      {"hostname": "admin.rotas.focodev.com.br", "service": "http://127.0.0.1:8081"},
      {"hostname": "admin-rotas.focodev.com.br", "service": "http://127.0.0.1:8081"},
      {"hostname": "portal-rotas.focodev.com.br", "service": "http://127.0.0.1:8081"},
      {"service": "http_status:404"}
    ]
  }
}
print(json.dumps(config))
PY
)

URL="https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cfd_tunnel/${TUNNEL_ID}/configurations"
HTTP=$(curl -sS -o /tmp/cf_site_tunnel_resp.json -w '%{http_code}' \
  -X PUT "$URL" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "$PAYLOAD")

if [[ "$HTTP" != "200" ]]; then
  echo "ERRO: API Cloudflare (ingress) HTTP $HTTP"
  cat /tmp/cf_site_tunnel_resp.json
  exit 1
fi

echo "OK: ingress atualizado (${SITE_HOSTNAME} -> ${ORIGIN})."

ZONE_HTTP=$(curl -sS -o /tmp/cf_site_zone.json -w '%{http_code}' \
  -G "https://api.cloudflare.com/client/v4/zones" \
  --data-urlencode "name=${ZONE_NAME}" \
  -H "Authorization: Bearer ${API_TOKEN}")

if [[ "$ZONE_HTTP" != "200" ]]; then
  echo "AVISO: nao foi possivel listar zona DNS. Crie CNAME manualmente:"
  echo "  www -> ${TUNNEL_CNAME} (proxied)"
  exit 0
fi

ZONE_ID=$(python3 -c "import json; d=json.load(open('/tmp/cf_site_zone.json')); print(d['result'][0]['id'] if d.get('success') and d.get('result') else '')")
if [[ -z "$ZONE_ID" ]]; then
  echo "AVISO: zona ${ZONE_NAME} nao encontrada."
  exit 0
fi

ensure_cname() {
  local name="$1"
  local existing
  existing=$(curl -sS -G "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
    --data-urlencode "type=CNAME" \
    --data-urlencode "name=${name}" \
    -H "Authorization: Bearer ${API_TOKEN}" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['result'][0]['id'] if d.get('result') else '')" 2>/dev/null || true)
  if [[ -n "$existing" ]]; then
    echo "DNS CNAME ${name} ja existe."
    return 0
  fi
  curl -sS -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"CNAME\",\"name\":\"${name}\",\"content\":\"${TUNNEL_CNAME}\",\"proxied\":true}" \
    | python3 -c "import json,sys; d=json.load(sys.stdin); print('OK CNAME' if d.get('success') else d)"
}

ensure_cname "www"
ensure_cname "painel"

echo "Verifique: curl -sI https://${SITE_HOSTNAME}/"
