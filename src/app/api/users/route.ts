import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { jsonResponse, errorResponse, parsePagination, requireAuth } from '@/lib/api'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const userSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
  role: z.enum(['ADMIN', 'USER']).default('USER'),
})

function isUniqueViolation(e: any) {
  return e?.code === 'P2002'
}

async function isLastAdmin(id: string) {
  const user = await prisma.user.findUnique({ where: { id }, select: { role: true } })
  if (user?.role !== 'ADMIN') return false
  return (await prisma.user.count({ where: { role: 'ADMIN' } })) <= 1
}

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const { skip, take } = parsePagination(req)
    const [items, total] = await Promise.all([
      prisma.user.findMany({ skip, take, orderBy: { createdAt: 'desc' }, select: { id: true, name: true, email: true, role: true, createdAt: true } }),
      prisma.user.count(),
    ])
    return jsonResponse({ items, total, currentUserId: (auth.user as any)?.id ?? null })
  } catch (e: any) {
    return errorResponse('Falha ao listar usuários', 500, e?.message)
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const body = await req.json()
    const parsed = userSchema.safeParse(body)
    if (!parsed.success) return errorResponse(parsed.error.issues[0]?.message || 'Dados inválidos', 400, parsed.error.format())
    const hash = await bcrypt.hash(parsed.data.password, 10)
    const created = await prisma.user.create({ data: { name: parsed.data.name, email: parsed.data.email, passwordHash: hash, role: parsed.data.role } })
    await prisma.logs.create({ data: { action: 'create_user', message: created.email, meta: { id: created.id } } })
    return jsonResponse({ id: created.id, email: created.email }, 201)
  } catch (e: any) {
    if (isUniqueViolation(e)) return errorResponse('Já existe um usuário com este e-mail', 409)
    return errorResponse('Falha ao criar usuário', 500, e?.message)
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const body = await req.json()
    const { id, password, ...rest } = body
    if (!id) return errorResponse('ID obrigatório', 400)
    const parsed = userSchema.omit({ password: true }).partial().safeParse(rest)
    if (!parsed.success) return errorResponse(parsed.error.issues[0]?.message || 'Dados inválidos', 400, parsed.error.format())
    const data: any = parsed.data
    if (password) {
      const pw = userSchema.shape.password.safeParse(password)
      if (!pw.success) return errorResponse(pw.error.issues[0].message, 400)
      data.passwordHash = await bcrypt.hash(pw.data, 10)
    }
    if (data.role === 'USER' && (await isLastAdmin(id))) {
      return errorResponse('Não é possível remover o último administrador', 400)
    }
    const updated = await prisma.user.update({ where: { id }, data })
    await prisma.logs.create({ data: { action: 'update_user', message: updated.email, meta: { id } } })
    return jsonResponse({ id: updated.id })
  } catch (e: any) {
    if (isUniqueViolation(e)) return errorResponse('Já existe um usuário com este e-mail', 409)
    if (e?.code === 'P2025') return errorResponse('Usuário não encontrado', 404)
    return errorResponse('Falha ao atualizar usuário', 500, e?.message)
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return errorResponse('ID obrigatório', 400)
    if (id === (auth.user as any)?.id) return errorResponse('Você não pode excluir a própria conta', 400)
    if (await isLastAdmin(id)) return errorResponse('Não é possível excluir o último administrador', 400)
    const deleted = await prisma.user.delete({ where: { id } })
    await prisma.logs.create({ data: { action: 'delete_user', message: deleted.email, meta: { id } } })
    return jsonResponse({ id })
  } catch (e: any) {
    if (e?.code === 'P2025') return errorResponse('Usuário não encontrado', 404)
    return errorResponse('Falha ao excluir usuário', 500, e?.message)
  }
}
