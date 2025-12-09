import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { jsonResponse, errorResponse, parsePagination, requireAuth } from '@/lib/api'
import { imageSchema } from '@/types/schemas'
import { revalidatePath } from 'next/cache'

export async function GET(req: NextRequest) {
  try {
    const { skip, take } = parsePagination(req)
    const [items, total] = await Promise.all([
      prisma.image.findMany({ skip, take, orderBy: { createdAt: 'desc' } }),
      prisma.image.count(),
    ])
    return jsonResponse({ items, total })
  } catch (e: any) {
    return errorResponse('Falha ao listar imagens', 500, e?.message)
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const body = await req.json()
    const parsed = imageSchema.safeParse(body)
    if (!parsed.success) return errorResponse('Dados inválidos', 400, parsed.error.format())
    const created = await prisma.image.create({ data: parsed.data })
    await prisma.logs.create({ data: { action: 'create_image', message: created.url, meta: { id: created.id } } })
    revalidatePath('/admin/images')
    return jsonResponse(created, 201)
  } catch (e: any) {
    return errorResponse('Falha ao criar imagem', 500, e?.message)
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return errorResponse('ID obrigatório', 400)
    const deleted = await prisma.image.delete({ where: { id } })
    await prisma.logs.create({ data: { action: 'delete_image', message: deleted.url, meta: { id } } })
    revalidatePath('/admin/images')
    return jsonResponse({ id })
  } catch (e: any) {
    return errorResponse('Falha ao excluir imagem', 500, e?.message)
  }
}
