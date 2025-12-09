import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { jsonResponse, errorResponse, parsePagination, requireAuth } from '@/lib/api'
import { videoSchema } from '@/types/schemas'
import { sanitize } from '@/lib/sanitize'
import { revalidatePath } from 'next/cache'

export async function GET(req: NextRequest) {
  try {
    const { skip, take } = parsePagination(req)
    const [items, total] = await Promise.all([
      prisma.video.findMany({ skip, take, orderBy: { createdAt: 'desc' } }),
      prisma.video.count(),
    ])
    return jsonResponse({ items, total })
  } catch (e: any) {
    return errorResponse('Falha ao listar vídeos', 500, e?.message)
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const body = await req.json()
    const parsed = videoSchema.safeParse(body)
    if (!parsed.success) return errorResponse('Dados inválidos', 400, parsed.error.format())
    const created = await prisma.video.create({ data: { ...parsed.data, title: sanitize(parsed.data.title), youtubeUrl: sanitize(parsed.data.youtubeUrl), thumbnailUrl: parsed.data.thumbnailUrl ? sanitize(parsed.data.thumbnailUrl) : undefined } })
    await prisma.logs.create({ data: { action: 'create_video', message: created.title, meta: { id: created.id } } })
    revalidatePath('/')
    revalidatePath('/admin/videos')
    return jsonResponse(created, 201)
  } catch (e: any) {
    return errorResponse('Falha ao criar vídeo', 500, e?.message)
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const body = await req.json()
    const { id, ...rest } = body
    if (!id) return errorResponse('ID obrigatório', 400)
    const parsed = videoSchema.partial().safeParse(rest)
    if (!parsed.success) return errorResponse('Dados inválidos', 400, parsed.error.format())
    const updated = await prisma.video.update({ where: { id }, data: { ...parsed.data, title: parsed.data.title ? sanitize(parsed.data.title) : undefined, youtubeUrl: parsed.data.youtubeUrl ? sanitize(parsed.data.youtubeUrl) : undefined, thumbnailUrl: parsed.data.thumbnailUrl ? sanitize(parsed.data.thumbnailUrl) : undefined } })
    await prisma.logs.create({ data: { action: 'update_video', message: updated.title, meta: { id } } })
    revalidatePath('/')
    revalidatePath('/admin/videos')
    return jsonResponse(updated)
  } catch (e: any) {
    return errorResponse('Falha ao atualizar vídeo', 500, e?.message)
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return errorResponse('ID obrigatório', 400)
    const deleted = await prisma.video.delete({ where: { id } })
    await prisma.logs.create({ data: { action: 'delete_video', message: deleted.title, meta: { id } } })
    revalidatePath('/')
    revalidatePath('/admin/videos')
    return jsonResponse({ id })
  } catch (e: any) {
    return errorResponse('Falha ao excluir vídeo', 500, e?.message)
  }
}
