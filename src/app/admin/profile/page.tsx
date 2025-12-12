"use client"
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function AdminProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validações
    if (newPassword.length < 6) {
      setError('A nova senha deve ter no mínimo 6 caracteres')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (currentPassword === newPassword) {
      setError('A nova senha deve ser diferente da senha atual')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Erro ao alterar senha')
        setLoading(false)
        return
      }

      setSuccess('Senha alterada com sucesso!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Meu Perfil
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie suas informações e altere sua senha
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Informações do usuário */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Informações da Conta
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome
              </label>
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white">
                {session?.user?.name || 'Não informado'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white">
                {session?.user?.email || 'Não informado'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Perfil
              </label>
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white">
                {(session?.user as any)?.role === 'ADMIN' 
                  ? 'Administrador' 
                  : `Usuário (${(session?.user as any)?.role || 'Sem role'})`}
              </div>
            </div>
          </div>
        </div>

        {/* Alterar senha */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Alterar Senha
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Senha Atual
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                placeholder="Digite sua senha atual"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nova Senha
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Confirmar Nova Senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                placeholder="Digite a nova senha novamente"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Alterando...
                </span>
              ) : (
                'Alterar Senha'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}



