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
  const res = NextResponse.json({ ok: false, error: { message, meta } }, { status })
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
    
    if (!admin) {
      console.log('[requireAuth] Usuário não é admin:', (session.user as any)?.email, userRole)
    }
    return { authorized: true, admin, user: session.user }
  }

  // Fallback: Tentar ler o token diretamente se a sessão falhar
  // Isso ajuda quando getServerSession tem problemas com cookies em Route Handlers
  if (req) {
    try {
      // Importante: getToken precisa do secret para decodificar
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || 'focodev-secret-key-change-in-production' })
      if (token) {
        console.log('[requireAuth] Sessão recuperada via getToken (fallback)')
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

  console.log('[requireAuth] Sessão nula')
  return { authorized: false, admin: false, user: null }
}

export function parsePagination(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') || '1')
  const pageSize = Number(searchParams.get('pageSize') || '10')
  const skip = (page - 1) * pageSize
  const take = pageSize
  return { page, pageSize, skip, take }
}
