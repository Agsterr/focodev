import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { authOptions } from '@/lib/auth'

export function jsonResponse(data: unknown, status = 200) {
  const res = NextResponse.json({ ok: true, data }, { status })
  const origin = process.env.CORS_ORIGIN || '*'
  res.headers.set('Access-Control-Allow-Origin', origin)
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  return res
}

export function errorResponse(message: string, status = 400, meta?: any) {
  // Em produção, não expõe detalhes internos (mensagens do banco, stack) em erros 5xx
  const safeMeta = status >= 500 && process.env.NODE_ENV === 'production' ? undefined : meta
  const res = NextResponse.json({ ok: false, error: { message, meta: safeMeta } }, { status })
  const origin = process.env.CORS_ORIGIN || '*'
  res.headers.set('Access-Control-Allow-Origin', origin)
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  return res
}

export async function requireAuth(req?: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (session) {
    // A role está dentro de session.user, não na raiz da session
    const userRole = (session.user as any)?.role
    const admin = userRole === 'ADMIN'
    return { authorized: true, admin, user: session.user }
  }

  // Fallback: Tentar ler o token diretamente se a sessão falhar
  // Isso ajuda quando getServerSession tem problemas com cookies em Route Handlers
  if (req) {
    try {
      // Importante: getToken precisa do secret para decodificar
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
      if (token) {
        const admin = (token as any).role === 'ADMIN'
        return { 
          authorized: true, 
          admin, 
          user: { 
            name: token.name, 
            email: token.email, 
            image: token.picture,
            id: (token as any).id 
          } 
        }
      }
    } catch (e) {
      console.error('[requireAuth] Erro ao tentar recuperar token:', e)
    }
  }

  return { authorized: false, admin: false, user: null }
}

export function parsePagination(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Math.max(1, Math.floor(Number(searchParams.get('page')) || 1))
  const pageSize = Math.min(100, Math.max(1, Math.floor(Number(searchParams.get('pageSize')) || 10)))
  const skip = (page - 1) * pageSize
  const take = pageSize
  return { page, pageSize, skip, take }
}
