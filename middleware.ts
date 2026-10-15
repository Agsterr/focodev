import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const host = (req.headers.get('host') || '').split(':')[0]
  const { pathname } = req.nextUrl

  // painel.focodev.com.br → área administrativa
  if (host === 'painel.focodev.com.br' && pathname === '/') {
    return NextResponse.redirect(new URL('/admin', req.url))
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
  matcher: ['/', '/admin/:path*'],
}
