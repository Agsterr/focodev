import { NextRequest } from 'next/server'
import { jsonResponse, errorResponse, requireAuth, parsePagination } from '@/lib/api'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const updateContactSchema = z.object({
  status: z.enum(['NOVO', 'RESPONDIDO']),
})

/**
 * GET /api/contacts
 * Lista mensagens de contato (apenas admin)
 * Query params: page, pageSize, status
 */
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) {
    return errorResponse('Não autorizado', 401)
  }

  try {
    const { page, pageSize, skip, take } = parsePagination(req)
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') as 'NOVO' | 'RESPONDIDO' | null

    const where = status ? { status } : {}

    const [contacts, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.contactMessage.count({ where }),
    ])

    return jsonResponse({
      contacts,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (e: any) {
    console.error('[Contacts API] Erro ao listar contatos:', e)
    return errorResponse('Falha ao listar mensagens', 500, e?.message)
  }
}

/**
 * PUT /api/contacts/:id
 * Atualiza status de uma mensagem (apenas admin)
 */
export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) {
    return errorResponse('Não autorizado', 401)
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return errorResponse('ID da mensagem é obrigatório', 400)
    }

    const body = await req.json()
    const parsed = updateContactSchema.safeParse(body)

    if (!parsed.success) {
      return errorResponse('Dados inválidos', 400, parsed.error.format())
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status: parsed.data.status },
    })

    // Log da ação
    await prisma.logs.create({
      data: {
        action: 'contact_status_updated',
        message: `Status atualizado para ${parsed.data.status}`,
        meta: { contactId: id, status: parsed.data.status },
      },
    }).catch(() => {})

    return jsonResponse(updated)
  } catch (e: any) {
    if (e.code === 'P2025') {
      return errorResponse('Mensagem não encontrada', 404)
    }
    console.error('[Contacts API] Erro ao atualizar contato:', e)
    return errorResponse('Falha ao atualizar mensagem', 500, e?.message)
  }
}


