import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@focodev.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD
  if (!adminPassword) {
    console.log('SEED_ADMIN_PASSWORD não definida — usuário admin não será criado.')
  } else {
    const hash = await bcrypt.hash(adminPassword, 10)
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        name: 'Administrador',
        email: adminEmail,
        passwordHash: hash,
        role: 'ADMIN',
      },
    })
  }

  await prisma.companyInfo.upsert({
    where: { id: 'company-singleton' },
    update: {
      name: 'FocoDev Sistemas',
    },
    create: {
      id: 'company-singleton',
      name: 'FocoDev Sistemas',
      email: 'contato@focodev.com',
      phone: '+55 00 0000-0000',
      instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'focodev',
      address: 'Endereço de exemplo',
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
      aboutText: 'A FocoDev cria soluções de software robustas e seguras, com foco em performance e experiência do usuário.',
    },
  })

  await prisma.homeBanner.upsert({
    where: { id: 'home-banner' },
    update: {},
    create: {
      id: 'home-banner',
      title: 'Soluções digitais para impulsionar seu negócio',
      subtitle: 'Software sob medida, veloz e seguro',
      ctaText: 'Solicitar orçamento',
      ctaLink: '/#contato',
    },
  })

  console.log('Seed concluído.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
