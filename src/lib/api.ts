import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
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

export async function requireAuth(_req?: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return { authorized: false, admin: false }
  const admin = (session as any).role === 'ADMIN'
  return { authorized: true, admin }
}

export function parsePagination(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') || '1')
  const pageSize = Number(searchParams.get('pageSize') || '10')
  const skip = (page - 1) * pageSize
  const take = pageSize
  return { page, pageSize, skip, take }
}
