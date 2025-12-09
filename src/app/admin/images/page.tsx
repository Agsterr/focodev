"use client"
import useSWR from 'swr'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminImagesPage() {
  const { data, mutate } = useSWR('/api/images?page=1&pageSize=50', fetcher)
  const [file, setFile] = useState<File | null>(null)
  const [alt, setAlt] = useState('')

  async function uploadAndCreate() {
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', 'gallery')
    const up = await fetch('/api/upload', { method: 'POST', body: fd })
    if (!up.ok) return
    const json = await up.json()
    await fetch('/api/images', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: json.data.url, alt }) })
    setFile(null)
    setAlt('')
    mutate()
  }

  async function remove(id: string) {
    await fetch(`/api/images?id=${id}`, { method: 'DELETE' })
    mutate()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Galeria</h1>
      <div className="grid gap-3 max-w-xl mb-8">
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border p-3 rounded-md dark:border-gray-700" />
        <input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Alt" className="border p-3 rounded-md dark:border-gray-700" />
        <Button onClick={uploadAndCreate} disabled={!file}>Enviar</Button>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        {data?.data?.items?.map((img: any) => (
          <div key={img.id} className="border rounded-lg p-2 dark:border-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.alt || ''} className="w-full h-40 object-cover rounded" />
            <div className="text-sm mt-2 flex justify-between items-center">
              <span className="truncate">{img.alt}</span>
              <Button variant="outline" size="sm" onClick={() => remove(img.id)}>Excluir</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
