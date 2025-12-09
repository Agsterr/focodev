import { NextRequest } from 'next/server'
import { jsonResponse, errorResponse, requireAuth } from '@/lib/api'
import { cloudinary } from '@/lib/cloudinary'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'

const folderSchema = z.enum(['services', 'projects', 'gallery', 'videos', 'company', 'banner'])

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized || !auth.admin) return errorResponse('Não autorizado', 401)
  try {
    const rl = rateLimit(req, 'upload', 20, 60_000)
    if (rl.limited) return errorResponse('Limite de requisições excedido', 429)
    const form = await req.formData()
    const file = form.get('file') as File | null
    const folderRaw = (form.get('folder') as string | null) || 'gallery'
    const folderParsed = folderSchema.safeParse(folderRaw)
    if (!folderParsed.success) return errorResponse('Pasta inválida', 400)
    const folder = folderParsed.data
    if (!file) return errorResponse('Arquivo obrigatório', 400)
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) return errorResponse('Tipo de arquivo não permitido', 400)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) return errorResponse('Arquivo excede 5MB', 413)

    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    const dataUri = `data:${file.type};base64,${base64}`

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: `focodev/${folder}`,
      transformation: [{ quality: 'auto:good', fetch_format: 'auto' }],
      overwrite: true,
    })
    return jsonResponse({ url: result.secure_url, public_id: result.public_id })
  } catch (e: any) {
    return errorResponse('Falha no upload', 500, e?.message)
  }
}
