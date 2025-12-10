import '../styles/globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import ConditionalLayout from '@/components/conditional-layout'
import SessionProviderWrapper from '@/components/session-provider-wrapper'

export const metadata: Metadata = {
  title: {
    default: 'FocoDev Sistemas',
    template: '%s | FocoDev Sistemas',
  },
  description: 'Soluções digitais modernas e seguras para o seu negócio',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <SessionProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
