"use client"
import useSWR from 'swr'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const CATEGORIES = [
  { value: '', label: 'Sem categoria (vai para a 1ª galeria)' },
  { value: 'app', label: '[app] — App mobile' },
  { value: 'instrutor', label: '[instrutor] — Painel do instrutor (FitLife)' },
  { value: 'aluno', label: '[aluno] — Portal web do aluno (FitLife)' },
  { value: 'painel', label: '[painel] — Painel web (App Rotas)' },
]

export default function AdminImagesPage() {
  const { data, mutate } = useSWR('/api/images?page=1&pageSize=100', fetcher)
  const { data: projectsData } = useSWR('/api/projects?page=1&pageSize=50', fetcher)
  const [file, setFile] = useState<File | null>(null)
  const [alt, setAlt] = useState('')
  const [projectId, setProjectId] = useState('')
  const [category, setCategory] = useState('')
  const [uploading, setUploading] = useState(false)

  const projects = projectsData?.data?.items || []

  async function uploadAndCreate() {
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'gallery')
      const up = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!up.ok) {
        alert('Falha no upload')
        return
      }
      const json = await up.json()
      const taggedAlt = category
        ? `[${category}] ${alt}`.trim()
        : alt.trim()

      const res = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: json.data.url,
          alt: taggedAlt || undefined,
          projectId: projectId || undefined,
        }),
      })
      if (!res.ok) {
        alert('Falha ao salvar imagem')
        return
      }
      setFile(null)
      setAlt('')
      mutate()
      alert('Imagem enviada! Ela aparece na landing do projeto vinculado.')
    } finally {
      setUploading(false)
    }
  }

  async function remove(id: string) {
    if (!confirm('Excluir esta imagem?')) return
    await fetch(`/api/images?id=${id}`, { method: 'DELETE' })
    mutate()
  }

  function projectLabel(id?: string | null) {
    if (!id) return '—'
    const p = projects.find((x: { id: string }) => x.id === id)
    return p ? `${p.title} (${p.slug})` : id
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Galeria de produtos</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
        Envie prints do app e dos painéis e vincule ao projeto. Use a categoria para
        separar: app mobile, painel do instrutor, portal do aluno (FitLife) ou painel web (Rotas).
        As fotos aparecem em <strong>/fitlife</strong> e <strong>/rotas</strong>.
      </p>

      <div className="grid gap-3 max-w-xl mb-8 p-5 border rounded-lg dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
        <label className="text-sm font-medium">Arquivo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-3 rounded-md dark:border-gray-700 bg-white dark:bg-gray-900"
        />

        <label className="text-sm font-medium">Projeto (landing)</label>
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="border p-3 rounded-md dark:border-gray-700 bg-white dark:bg-gray-900"
        >
          <option value="">Sem projeto</option>
          {projects.map((p: { id: string; title: string; slug: string }) => (
            <option key={p.id} value={p.id}>
              {p.title} ({p.slug})
            </option>
          ))}
        </select>

        <label className="text-sm font-medium">Categoria da galeria</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded-md dark:border-gray-700 bg-white dark:bg-gray-900"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value || 'none'} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <label className="text-sm font-medium">Legenda (opcional)</label>
        <input
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="Ex.: Tela de treino do aluno"
          className="border p-3 rounded-md dark:border-gray-700 bg-white dark:bg-gray-900"
        />

        <Button onClick={uploadAndCreate} disabled={!file || uploading}>
          {uploading ? 'Enviando...' : 'Enviar foto'}
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {data?.data?.items?.map((img: any) => (
          <div key={img.id} className="border rounded-lg p-2 dark:border-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.alt || ''} className="w-full h-40 object-cover rounded" />
            <div className="text-xs mt-2 space-y-1">
              <div className="truncate font-medium">{img.alt || 'Sem legenda'}</div>
              <div className="text-gray-500 truncate">{projectLabel(img.projectId)}</div>
            </div>
            <div className="mt-2 text-right">
              <Button variant="outline" size="sm" onClick={() => remove(img.id)}>
                Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>
      {!data?.data?.items?.length && (
        <p className="text-center text-gray-500 py-8">Nenhuma imagem ainda</p>
      )}
    </div>
  )
}
