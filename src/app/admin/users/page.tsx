"use client"
import useSWR from 'swr'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/admin/toast'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const emptyForm = { name: '', email: '', password: '', role: 'USER' }

export default function AdminUsersPage() {
  const { data, mutate } = useSWR('/api/users?page=1&pageSize=50', fetcher)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const toast = useToast()
  const currentUserId: string | null = data?.data?.currentUserId ?? null

  async function create(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const body = await res.json().catch(() => null)
      if (!res.ok) {
        setError(body?.error?.message || 'Falha ao criar usuário')
        return
      }
      setForm(emptyForm)
      toast.success('Usuário criado')
      mutate()
    } finally {
      setSaving(false)
    }
  }

  async function remove(id: string, email: string) {
    if (!confirm(`Excluir o usuário ${email}?`)) return
    const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' })
    if (!res.ok) {
      const body = await res.json().catch(() => null)
      toast.error(body?.error?.message || 'Falha ao excluir usuário')
    } else {
      toast.success('Usuário excluído')
    }
    mutate()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Usuários</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Apenas usuários <strong>Administrador</strong> conseguem entrar no painel.
      </p>
      <form onSubmit={create} className="grid gap-3 max-w-xl mb-8">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome" required minLength={2} className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" type="email" required className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Senha (mínimo 8 caracteres)" type="password" required minLength={8} autoComplete="new-password" className="border p-3 rounded-md dark:border-gray-700" />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="border p-3 rounded-md dark:border-gray-700">
          <option value="USER">Usuário (sem acesso ao painel)</option>
          <option value="ADMIN">Administrador</option>
        </select>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        <Button type="submit" disabled={saving}>{saving ? 'Criando...' : 'Criar'}</Button>
      </form>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="text-left">
              <th>Nome</th>
              <th>Email</th>
              <th>Perfil</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.items?.map((u: any) => (
              <tr key={u.id} className="border-t dark:border-gray-800">
                <td className="py-2">
                  {u.name}
                  {u.id === currentUserId && <span className="ml-2 text-xs text-gray-500">(você)</span>}
                </td>
                <td className="py-2">{u.email}</td>
                <td className="py-2">{u.role === 'ADMIN' ? 'Administrador' : 'Usuário'}</td>
                <td className="py-2 text-right">
                  {u.id !== currentUserId && (
                    <Button variant="outline" size="sm" onClick={() => remove(u.id, u.email)}>Excluir</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
