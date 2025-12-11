'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const pathname = usePathname()
  
  // Não mostrar em rotas admin
  const isAdminRoute = pathname?.startsWith('/admin')

  useEffect(() => {
    if (isAdminRoute) return
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration)
        })
        .catch((error) => {
          console.log('Erro ao registrar Service Worker:', error)
        })
    }

    // Detectar evento beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [isAdminRoute])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Mostra o prompt de instalação
    deferredPrompt.prompt()

    // Espera pela resposta do usuário
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('Usuário aceitou instalar o PWA')
    } else {
      console.log('Usuário rejeitou instalar o PWA')
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  if (isAdminRoute || !showPrompt || !deferredPrompt) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-2xl shadow-2xl p-6 max-w-md mx-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl flex-shrink-0">
            📱
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Instalar FocoDev
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Instale nosso app para acesso rápido e melhor experiência!
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleInstallClick}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
              >
                Instalar
              </Button>
              <Button
                onClick={() => {
                  setShowPrompt(false)
                  setDeferredPrompt(null)
                }}
                variant="outline"
                className="border-2"
              >
                Depois
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

