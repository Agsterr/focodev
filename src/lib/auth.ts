import type { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'focodev-secret-key-change-in-production',
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 }, // 24 horas
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    Credentials({
      name: 'Credenciais',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          // Verificar se o prisma está disponível
          if (!prisma || typeof prisma.user === 'undefined') {
            console.error('Database not configured')
            return null
          }
          const user = await prisma.user.findUnique({ where: { email: credentials.email } })
          if (!user) return null
          const ok = await bcrypt.compare(credentials.password, user.passwordHash)
          if (!ok) return null
          return { id: user.id, name: user.name, email: user.email, role: user.role }
        } catch (error: any) {
          console.error('Auth error:', error?.message || error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        const tokenAny = token as any
        if (tokenAny.role) {
          (session.user as any).role = tokenAny.role
        }
        if (tokenAny.id) {
          (session.user as any).id = tokenAny.id
        }
      }
      return session
    },
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  events: {
    async signIn({ user }) {
      try {
        if (prisma && typeof prisma.logs !== 'undefined') {
          await prisma.logs.create({ 
            data: { 
              action: 'sign_in', 
              message: user?.email || '', 
              meta: { userId: user?.id } 
            } 
          })
        }
      } catch (error: any) {
        console.error('Error logging sign in:', error?.message || error)
      }
    },
    async signOut({ session }) {
      try {
        if (prisma && typeof prisma.logs !== 'undefined') {
          await prisma.logs.create({ 
            data: { 
              action: 'sign_out', 
              message: (session as any)?.user?.email || '' 
            } 
          })
        }
      } catch (error: any) {
        console.error('Error logging sign out:', error?.message || error)
      }
    },
  },
}

export const isAdmin = (token: any) => token?.role === 'ADMIN'
