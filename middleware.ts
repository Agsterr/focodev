import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

function parseAuthRateCookie(value: string | undefined) {
  if (!value) return { count: 0, ts: 0 }
  try {
    const [count, ts] = value.split(':').map((v) => Number(v))
    return { count: count || 0, ts: ts || 0 }
  } catch {
    return { count: 0, ts: 0 }
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/api/auth')) {
    if (req.method === 'POST') {
      const cookie = req.cookies.get('rl_auth')?.value
      const { count, ts } = parseAuthRateCookie(cookie)
      const now = Date.now()
      const windowMs = 60_000
      const limit = 10
      const newCount = now - ts > windowMs ? 1 : count + 1
      if (newCount > limit) return new NextResponse('Too Many Requests', { status: 429 })
      const res = NextResponse.next()
      res.cookies.set('rl_auth', `${newCount}:${now}`, { httpOnly: true, sameSite: 'lax', path: '/', secure: process.env.NODE_ENV === 'production' })
      return res
    }
  }
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !pathname.startsWith('/admin/logout')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token || (token as any).role !== 'ADMIN') {
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
