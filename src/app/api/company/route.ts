import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { jsonResponse, errorResponse, requireAuth } from '@/lib/api'
import { companyInfoSchema } from '@/types/schemas'
import { sanitize } from '@/lib/sanitize'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const info = await prisma.companyInfo.findUnique({ where: { id: 'company-singleton' } })
    return jsonResponse(info)
  } catch (e: any) {
    return errorResponse('Falha ao obter dados da empresa', 500, e?.message)
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const body = await req.json()
    const parsed = companyInfoSchema.safeParse(body)
    if (!parsed.success) return errorResponse('Dados inválidos', 400, parsed.error.format())
    const data = {
      ...parsed.data,
      name: sanitize(parsed.data.name),
      email: parsed.data.email ? sanitize(parsed.data.email) : undefined,
      phone: parsed.data.phone ? sanitize(parsed.data.phone) : undefined,
      instagram: parsed.data.instagram ? sanitize(parsed.data.instagram) : undefined,
      address: parsed.data.address ? sanitize(parsed.data.address) : undefined,
      whatsappLink: parsed.data.whatsappLink ? sanitize(parsed.data.whatsappLink) : undefined,
      whatsappNumber: parsed.data.whatsappNumber ? sanitize(parsed.data.whatsappNumber) : undefined,
    }
    const updated = await prisma.companyInfo.upsert({
      where: { id: 'company-singleton' },
      update: data,
      create: { id: 'company-singleton', ...data },
    })
    await prisma.logs.create({ data: { action: 'update_company', message: updated.name } })
    revalidatePath('/')
    revalidatePath('/admin/company')
    return jsonResponse(updated)
  } catch (e: any) {
    return errorResponse('Falha ao atualizar dados da empresa', 500, e?.message)
  }
}
