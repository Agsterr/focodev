"use client"
import useSWR from 'swr'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminUsersPage() {
  const { data, mutate } = useSWR('/api/users?page=1&pageSize=50', fetcher)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER' })

  async function create() {
    const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) {
      setForm({ name: '', email: '', password: '', role: 'USER' })
      mutate()
    }
  }

  async function remove(id: string) {
    await fetch(`/api/users?id=${id}`, { method: 'DELETE' })
    mutate()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Usuários</h1>
      <div className="grid gap-3 max-w-xl mb-8">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" type="email" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Senha" type="password" className="border p-3 rounded-md dark:border-gray-700" />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="border p-3 rounded-md dark:border-gray-700">
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <Button onClick={create}>Criar</Button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="text-left">
              <th>Nome</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.items?.map((u: any) => (
              <tr key={u.id} className="border-t dark:border-gray-800">
                <td className="py-2">{u.name}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2">{u.role}</td>
                <td className="py-2 text-right">
                  <Button variant="outline" size="sm" onClick={() => remove(u.id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
