"use client"
import useSWR from 'swr'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminProjectsPage() {
  const { data, mutate } = useSWR('/api/projects?page=1&pageSize=50', fetcher)
  const [form, setForm] = useState({ title: '', slug: '', description: '' })

  async function create() {
    const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) {
      setForm({ title: '', slug: '', description: '' })
      mutate()
    }
  }

  async function remove(id: string) {
    await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
    mutate()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Projetos</h1>
      <div className="grid gap-3 max-w-xl mb-8">
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Título" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="border p-3 rounded-md dark:border-gray-700" />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descrição" className="border p-3 rounded-md dark:border-gray-700" />
        <Button onClick={create}>Criar</Button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th>Título</th>
            <th>Slug</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.items?.map((p: any) => (
            <tr key={p.id} className="border-t dark:border-gray-800">
              <td className="py-2">{p.title}</td>
              <td className="py-2">{p.slug}</td>
              <td className="py-2 text-right">
                <Button variant="outline" size="sm" onClick={() => remove(p.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
