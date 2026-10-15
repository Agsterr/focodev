"use client"
import useSWR from 'swr'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminTextsPage() {
  const { data, mutate } = useSWR('/api/texts', fetcher)
  const [form, setForm] = useState({ key: '', content: '' })

  async function create() {
    const res = await fetch('/api/texts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) {
      setForm({ key: '', content: '' })
      mutate()
    } else {
      const body = await res.json().catch(() => null)
      alert(body?.error?.message || 'Falha ao salvar. Verifique os campos.')
    }
  }

  async function remove(id: string) {
    if (!confirm('Tem certeza que deseja excluir este texto?')) return
    const res = await fetch(`/api/texts?id=${id}`, { method: 'DELETE' })
    if (!res.ok) {
      const body = await res.json().catch(() => null)
      alert(body?.error?.message || 'Falha ao excluir')
    }
    mutate()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Textos Institucionais</h1>
      <div className="grid gap-3 max-w-xl mb-8">
        <input value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} placeholder="Chave (ex: sobre, missão)" className="border p-3 rounded-md dark:border-gray-700" />
        <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Conteúdo" className="border p-3 rounded-md dark:border-gray-700" />
        <Button onClick={create}>Criar</Button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th>Chave</th>
            <th>Conteúdo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((t: any) => (
            <tr key={t.id} className="border-t dark:border-gray-800">
              <td className="py-2">{t.key}</td>
              <td className="py-2 text-gray-600 dark:text-gray-400">{t.content}</td>
              <td className="py-2 text-right">
                <Button variant="outline" size="sm" onClick={() => remove(t.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
