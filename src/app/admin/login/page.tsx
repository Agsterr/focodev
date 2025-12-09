"use client"
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.ok) window.location.href = '/admin'
    else setError('Credenciais inválidas')
  }

  return (
    <div className="container py-12 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Login Admin</h1>
      <form onSubmit={onSubmit} className="grid gap-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password" className="border p-3 rounded-md dark:border-gray-700" />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
      </form>
    </div>
  )
}
