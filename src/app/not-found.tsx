import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          A página que você está procurando não existe.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">Voltar para Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/login">Painel Admin</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

