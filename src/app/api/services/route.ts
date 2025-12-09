import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { jsonResponse, errorResponse, parsePagination, requireAuth } from '@/lib/api'
import { serviceSchema } from '@/types/schemas'
import { sanitize } from '@/lib/sanitize'

export async function GET(req: NextRequest) {
  try {
    const { skip, take } = parsePagination(req)
    const [items, total] = await Promise.all([
      prisma.service.findMany({ skip, take, orderBy: { createdAt: 'desc' } }),
      prisma.service.count(),
    ])
    return jsonResponse({ items, total })
  } catch (e: any) {
    return errorResponse('Falha ao listar serviços', 500, e?.message)
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const body = await req.json()
    const parsed = serviceSchema.safeParse(body)
    if (!parsed.success) return errorResponse('Dados inválidos', 400, parsed.error.format())
    const created = await prisma.service.create({ data: { ...parsed.data, title: sanitize(parsed.data.title), description: sanitize(parsed.data.description || '') } })
    await prisma.logs.create({ data: { action: 'create_service', message: created.title, meta: { id: created.id } } })
    return jsonResponse(created, 201)
  } catch (e: any) {
    return errorResponse('Falha ao criar serviço', 500, e?.message)
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const body = await req.json()
    const { id, ...rest } = body
    if (!id) return errorResponse('ID obrigatório', 400)
    const parsed = serviceSchema.partial().safeParse(rest)
    if (!parsed.success) return errorResponse('Dados inválidos', 400, parsed.error.format())
    const updated = await prisma.service.update({ where: { id }, data: { ...parsed.data, title: parsed.data.title ? sanitize(parsed.data.title) : undefined, description: parsed.data.description ? sanitize(parsed.data.description) : undefined } })
    await prisma.logs.create({ data: { action: 'update_service', message: updated.title, meta: { id } } })
    return jsonResponse(updated)
  } catch (e: any) {
    return errorResponse('Falha ao atualizar serviço', 500, e?.message)
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return errorResponse('ID obrigatório', 400)
    const deleted = await prisma.service.delete({ where: { id } })
    await prisma.logs.create({ data: { action: 'delete_service', message: deleted.title, meta: { id } } })
    return jsonResponse({ id })
  } catch (e: any) {
    return errorResponse('Falha ao excluir serviço', 500, e?.message)
  }
}
