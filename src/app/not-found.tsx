import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Página não encontrada</p>
      <Button asChild>
        <Link href="/">Voltar para a home</Link>
      </Button>
    </div>
  )
}
