import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { jsonResponse, errorResponse, requireAuth } from '@/lib/api'
import { z } from 'zod'
import { sanitize } from '@/lib/sanitize'

const textSchema = z.object({ key: z.string().min(2), content: z.string().min(1) })

export async function GET() {
  try {
    const items = await prisma.institutionalText.findMany({ orderBy: { updatedAt: 'desc' } })
    return jsonResponse(items)
  } catch (e: any) {
    return errorResponse('Falha ao listar textos', 500, e?.message)
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized) return errorResponse('Não autorizado', 401)
  try {
    const body = await req.json()
    const parsed = textSchema.safeParse(body)
    if (!parsed.success) return errorResponse('Dados inválidos', 400, parsed.error.format())
    const created = await prisma.institutionalText.create({ data: { key: sanitize(parsed.data.key), content: sanitize(parsed.data.content) } })
    return jsonResponse(created, 201)
  } catch (e: any) {
    return errorResponse('Falha ao criar texto', 500, e?.message)
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized) return errorResponse('Não autorizado', 401)
  try {
    const body = await req.json()
    const { id, ...rest } = body
    if (!id) return errorResponse('ID obrigatório', 400)
    const parsed = textSchema.partial().safeParse(rest)
    if (!parsed.success) return errorResponse('Dados inválidos', 400, parsed.error.format())
    const updated = await prisma.institutionalText.update({ where: { id }, data: { key: rest.key ? sanitize(rest.key) : undefined, content: rest.content ? sanitize(rest.content) : undefined } })
    return jsonResponse(updated)
  } catch (e: any) {
    return errorResponse('Falha ao atualizar texto', 500, e?.message)
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized) return errorResponse('Não autorizado', 401)
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return errorResponse('ID obrigatório', 400)
    await prisma.institutionalText.delete({ where: { id } })
    return jsonResponse({ id })
  } catch (e: any) {
    return errorResponse('Falha ao excluir texto', 500, e?.message)
  }
}
