"use client"
import useSWR from 'swr'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminVideosPage() {
  const { data, mutate } = useSWR('/api/videos?page=1&pageSize=50', fetcher)
  const [form, setForm] = useState({ title: '', youtubeUrl: '', thumbnailUrl: '' })
  const [file, setFile] = useState<File | null>(null)

  async function create() {
    let thumbnailUrl = form.thumbnailUrl
    if (file) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'videos')
      const up = await fetch('/api/upload', { method: 'POST', body: fd })
      if (up.ok) {
        const json = await up.json()
        thumbnailUrl = json.data.url
      }
    }
    const res = await fetch('/api/videos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, thumbnailUrl }) })
    if (res.ok) {
      setForm({ title: '', youtubeUrl: '', thumbnailUrl: '' })
      setFile(null)
      mutate()
    }
  }

  async function remove(id: string) {
    await fetch(`/api/videos?id=${id}`, { method: 'DELETE' })
    mutate()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vídeos</h1>
      <div className="grid gap-3 max-w-xl mb-8">
        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Título" />
        <Input value={form.youtubeUrl} onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })} placeholder="URL do YouTube" />
        <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <Button onClick={create}>Criar</Button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th>Título</th>
            <th>URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.items?.map((v: any) => (
            <tr key={v.id} className="border-t dark:border-gray-800">
              <td className="py-2">{v.title}</td>
              <td className="py-2">{v.youtubeUrl}</td>
              <td className="py-2 text-right">
                <Button variant="outline" size="sm" onClick={() => remove(v.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
