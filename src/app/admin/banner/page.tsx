"use client"
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminBannerPage() {
  const { data, mutate } = useSWR('/api/banner', fetcher)
  const [form, setForm] = useState({ title: '', subtitle: '', backgroundImageUrl: '', ctaText: '', ctaLink: '' })
  useEffect(() => {
    if (data?.data) setForm({
      title: data.data.title || '',
      subtitle: data.data.subtitle || '',
      backgroundImageUrl: data.data.backgroundImageUrl || '',
      ctaText: data.data.ctaText || '',
      ctaLink: data.data.ctaLink || '',
    })
  }, [data])

  async function save() {
    await fetch('/api/banner', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    mutate()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Banner da Home</h1>
      <div className="grid gap-3 max-w-2xl">
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Título" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="Subtítulo" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.backgroundImageUrl} onChange={(e) => setForm({ ...form, backgroundImageUrl: e.target.value })} placeholder="Imagem de fundo (URL)" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} placeholder="CTA" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} placeholder="Link CTA" className="border p-3 rounded-md dark:border-gray-700" />
        <Button onClick={save}>Salvar</Button>
      </div>
    </div>
  )
}
