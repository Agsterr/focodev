"use client"
import useSWR from 'swr'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) return match[1]
  }
  return null
}

export default function AdminVideosPage() {
  const { data, mutate } = useSWR('/api/videos?page=1&pageSize=50', fetcher)
  const [form, setForm] = useState({ title: '', youtubeUrl: '', thumbnailUrl: '' })
  const [file, setFile] = useState<File | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  async function create() {
    if (!form.title || !form.youtubeUrl) {
      alert('Preencha o título e a URL do YouTube')
      return
    }
    setIsCreating(true)
    try {
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
      const res = await fetch('/api/videos', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ ...form, thumbnailUrl }) 
      })
      if (res.ok) {
        setForm({ title: '', youtubeUrl: '', thumbnailUrl: '' })
        setFile(null)
        mutate()
        alert('Vídeo criado com sucesso!')
      } else {
        const error = await res.json()
        alert(`Erro ao criar vídeo: ${error.message || 'Erro desconhecido'}`)
      }
    } catch (error) {
      alert('Erro ao criar vídeo')
    } finally {
      setIsCreating(false)
    }
  }

  async function remove(id: string) {
    if (!confirm('Tem certeza que deseja excluir este vídeo?')) return
    const res = await fetch(`/api/videos?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      mutate()
      alert('Vídeo excluído com sucesso!')
    } else {
      alert('Erro ao excluir vídeo')
    }
  }

  const videoId = form.youtubeUrl ? getYouTubeVideoId(form.youtubeUrl) : null
  const previewThumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vídeos</h1>
      <div className="grid gap-4 max-w-2xl mb-8 p-6 border rounded-lg dark:border-gray-800 bg-white dark:bg-gray-900">
        <div>
          <label className="block text-sm font-medium mb-2">Título do Vídeo</label>
          <Input 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
            placeholder="Ex: Apresentação do Projeto X" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">URL do YouTube</label>
          <Input 
            value={form.youtubeUrl} 
            onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })} 
            placeholder="https://www.youtube.com/watch?v=..." 
          />
          {videoId && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ID do vídeo detectado: {videoId}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Thumbnail (opcional)</label>
          <Input 
            type="file" 
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Se não enviar uma thumbnail, será usada a do YouTube automaticamente
          </p>
        </div>
        {previewThumbnail && (
          <div className="mt-2">
            <p className="text-sm font-medium mb-2">Preview da Thumbnail:</p>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border dark:border-gray-800">
              <Image
                src={previewThumbnail}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        <Button onClick={create} disabled={isCreating}>
          {isCreating ? 'Criando...' : 'Criar Vídeo'}
        </Button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left border-b dark:border-gray-800">
              <th className="pb-3">Thumbnail</th>
              <th className="pb-3">Título</th>
              <th className="pb-3">URL</th>
              <th className="pb-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.items?.map((v: any) => {
              const vidId = getYouTubeVideoId(v.youtubeUrl)
              const thumb = v.thumbnailUrl || (vidId ? `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg` : null)
              return (
                <tr key={v.id} className="border-t dark:border-gray-800">
                  <td className="py-3">
                    {thumb ? (
                      <div className="relative w-24 h-16 rounded overflow-hidden">
                        <Image
                          src={thumb}
                          alt={v.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-16 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-400">Sem imagem</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 font-medium">{v.title}</td>
                  <td className="py-3">
                    <a 
                      href={v.youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-xs truncate block max-w-xs"
                    >
                      {v.youtubeUrl}
                    </a>
                  </td>
                  <td className="py-3 text-right">
                    <Button variant="outline" size="sm" onClick={() => remove(v.id)}>
                      Excluir
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {!data?.data?.items?.length && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Nenhum vídeo cadastrado ainda
          </p>
        )}
      </div>
    </div>
  )
}
