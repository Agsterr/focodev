import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { jsonResponse, errorResponse, requireAuth } from '@/lib/api'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z.string().min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
})

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req)
  if (!auth.authorized) return errorResponse('Não autorizado', 401)

  try {
    const body = await changePasswordSchema.parse(await req.json())
    
    // Buscar usuário atual
    const user = await prisma.user.findUnique({
      where: { email: auth.user?.email || '' },
    })

    if (!user) return errorResponse('Usuário não encontrado', 404)

    // Verificar senha atual
    const isCurrentPasswordValid = await bcrypt.compare(
      body.currentPassword,
      user.passwordHash
    )

    if (!isCurrentPasswordValid) {
      return errorResponse('Senha atual incorreta', 400)
    }

    // Atualizar senha
    const newPasswordHash = await bcrypt.hash(body.newPassword, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    })

    await prisma.logs.create({
      data: {
        action: 'change_password',
        message: user.email,
        meta: { userId: user.id },
      },
    })

    return jsonResponse({ message: 'Senha alterada com sucesso' })
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return errorResponse('Dados inválidos', 400, e.format())
    }
    return errorResponse('Falha ao alterar senha', 500, e?.message)
  }
}


