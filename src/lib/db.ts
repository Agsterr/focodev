import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

const globalForPrisma = globalThis as unknown as { prisma?: InstanceType<typeof PrismaClient> }

export const prisma = globalForPrisma.prisma || createPrisma()

function createPrisma() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString && process.env.NODE_ENV !== 'production') {
    const handler = {
      get() {
        throw new Error('DATABASE_URL não está configurada. Defina em .env.local e reinicie o servidor')
      },
    }
    return new Proxy({}, handler) as unknown as InstanceType<typeof PrismaClient>
  }
  const pool = new Pool({ connectionString: connectionString! })
  const adapter = new PrismaNeon(pool)
  type OptionsArg = ConstructorParameters<typeof PrismaClient>[0]
  const options = { adapter } as unknown as OptionsArg
  const client = new PrismaClient(options)
  return client
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
