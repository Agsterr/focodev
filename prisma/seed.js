const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@focodev.com'
  const adminPassword = 'admin123'
  const hash = await bcrypt.hash(adminPassword, 10)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { name: 'Administrador', email: adminEmail, passwordHash: hash, role: 'ADMIN' },
  })

  await prisma.companyInfo.upsert({
    where: { id: 'company-singleton' },
    update: { name: 'FocoDev Sistemas' },
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

  console.log('Seed concluído. Usuário admin: admin@focodev.com / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
