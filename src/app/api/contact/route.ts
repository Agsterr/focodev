import { NextRequest } from 'next/server'
import { jsonResponse, errorResponse } from '@/lib/api'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const message = String(form.get('message') || '')
    if (!name || !email || !message) return errorResponse('Campos obrigatórios', 400)
    await prisma.logs.create({ data: { action: 'contact_message', message: `${name} <${email}>`, meta: { message } } })
    return jsonResponse({ ok: true })
  } catch (e: any) {
    return errorResponse('Falha ao enviar contato', 500, e?.message)
  }
}
