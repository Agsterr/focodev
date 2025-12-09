import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

const globalForPrisma = globalThis as unknown as { prisma?: InstanceType<typeof PrismaClient> }

export const prisma = globalForPrisma.prisma || createPrisma()

function createPrisma() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    // Retorna um objeto mock que não quebra quando o banco não está configurado
    // Os erros serão tratados nos try/catch das páginas
    const errorMessage = 'DATABASE_URL não está configurada. Defina em .env.local e reinicie o servidor'
    
    const createMockModel = () => {
      return new Proxy({}, {
        get() {
          // Retorna uma função que sempre rejeita com um erro informativo
          return async () => {
            throw new Error(errorMessage)
          }
        }
      })
    }
    
    const handler: ProxyHandler<any> = {
      get(_target: any, prop: string | symbol) {
        // Permite verificação de propriedades sem erro
        if (prop === Symbol.toStringTag || prop === 'constructor' || prop === 'then' || prop === 'catch' || prop === 'finally') {
          return undefined
        }
        // Retorna um proxy para modelos (service, project, etc.)
        return createMockModel()
      },
    }
    return new Proxy({}, handler) as unknown as InstanceType<typeof PrismaClient>
  }
  const pool = new Pool({ connectionString })
  const adapter = new PrismaNeon(pool)
  type OptionsArg = ConstructorParameters<typeof PrismaClient>[0]
  const options = { adapter } as unknown as OptionsArg
  const client = new PrismaClient(options)
  return client
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
