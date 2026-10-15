import NextAuth from 'next-auth'
import type { NextRequest } from 'next/server'
import { authOptions } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'

const handler = NextAuth(authOptions)

type RouteContext = { params: { nextauth: string[] } }

async function POST(req: NextRequest, ctx: RouteContext) {
  // Limita tentativas de login por IP (proteção contra força bruta)
  if (req.nextUrl.pathname.endsWith('/callback/credentials')) {
    const rl = rateLimit(req, 'login', 10, 15 * 60_000)
    if (rl.limited) {
      return Response.json({ error: 'Muitas tentativas. Aguarde alguns minutos.' }, { status: 429 })
    }
  }
  return handler(req, ctx)
}

export { handler as GET, POST }
