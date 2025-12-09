import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { jsonResponse, errorResponse, parsePagination, requireAuth } from '@/lib/api'
import { projectSchema } from '@/types/schemas'
import { sanitize } from '@/lib/sanitize'
import { revalidatePath } from 'next/cache'

export async function GET(req: NextRequest) {
  try {
    const { skip, take } = parsePagination(req)
    const [items, total] = await Promise.all([
      prisma.project.findMany({ skip, take, orderBy: { createdAt: 'desc' } }),
      prisma.project.count(),
    ])
    return jsonResponse({ items, total })
  } catch (e: any) {
    return errorResponse('Falha ao listar projetos', 500, e?.message)
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const body = await req.json()
    const parsed = projectSchema.safeParse(body)
    if (!parsed.success) return errorResponse('Dados inválidos', 400, parsed.error.format())
    const created = await prisma.project.create({ data: { ...parsed.data, title: sanitize(parsed.data.title), slug: sanitize(parsed.data.slug), description: sanitize(parsed.data.description) } })
    await prisma.logs.create({ data: { action: 'create_project', message: created.title, meta: { id: created.id } } })
    revalidatePath('/')
    revalidatePath('/projects')
    revalidatePath('/admin/projects')
    return jsonResponse(created, 201)
  } catch (e: any) {
    return errorResponse('Falha ao criar projeto', 500, e?.message)
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const body = await req.json()
    const { id, ...rest } = body
    if (!id) return errorResponse('ID obrigatório', 400)
    const parsed = projectSchema.partial().safeParse(rest)
    if (!parsed.success) return errorResponse('Dados inválidos', 400, parsed.error.format())
    const updated = await prisma.project.update({ where: { id }, data: { ...parsed.data, title: parsed.data.title ? sanitize(parsed.data.title) : undefined, slug: parsed.data.slug ? sanitize(parsed.data.slug) : undefined, description: parsed.data.description ? sanitize(parsed.data.description) : undefined } })
    await prisma.logs.create({ data: { action: 'update_project', message: updated.title, meta: { id } } })
    revalidatePath('/')
    revalidatePath('/projects')
    revalidatePath('/admin/projects')
    return jsonResponse(updated)
  } catch (e: any) {
    return errorResponse('Falha ao atualizar projeto', 500, e?.message)
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return errorResponse('ID obrigatório', 400)
    const project = await prisma.project.delete({ where: { id } })
    await prisma.logs.create({ data: { action: 'delete_project', message: project.title, meta: { id } } })
    revalidatePath('/')
    revalidatePath('/projects')
    revalidatePath(`/projects/${project.slug}`)
    revalidatePath('/admin/projects')
    return jsonResponse({ id })
  } catch (e: any) {
    return errorResponse('Falha ao excluir projeto', 500, e?.message)
  }
}
