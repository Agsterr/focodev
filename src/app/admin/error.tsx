"use client"

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Erro no Admin:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Algo deu errado!</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {error.message || 'Ocorreu um erro inesperado no painel administrativo.'}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand/90 transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  )
}
