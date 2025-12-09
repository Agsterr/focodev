import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { jsonResponse, errorResponse, requireAuth } from '@/lib/api'
import { homeBannerSchema } from '@/types/schemas'
import { sanitize } from '@/lib/sanitize'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const banner = await prisma.homeBanner.findUnique({ where: { id: 'home-banner' } })
    return jsonResponse(banner)
  } catch (e: any) {
    return errorResponse('Falha ao obter banner', 500, e?.message)
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const body = await req.json()
    const parsed = homeBannerSchema.safeParse(body)
    if (!parsed.success) return errorResponse('Dados inválidos', 400, parsed.error.format())
    const data = {
      title: sanitize(parsed.data.title),
      subtitle: parsed.data.subtitle ? sanitize(parsed.data.subtitle) : undefined,
      backgroundImageUrl: parsed.data.backgroundImageUrl ? sanitize(parsed.data.backgroundImageUrl) : undefined,
      ctaText: parsed.data.ctaText ? sanitize(parsed.data.ctaText) : undefined,
      ctaLink: parsed.data.ctaLink ? sanitize(parsed.data.ctaLink) : undefined,
    }
    const updated = await prisma.homeBanner.upsert({
      where: { id: 'home-banner' },
      update: data,
      create: { id: 'home-banner', ...data },
    })
    await prisma.logs.create({ data: { action: 'update_banner', message: updated.title } })
    revalidatePath('/')
    revalidatePath('/admin/banner')
    return jsonResponse(updated)
  } catch (e: any) {
    return errorResponse('Falha ao atualizar banner', 500, e?.message)
  }
}
