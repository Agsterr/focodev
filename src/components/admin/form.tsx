"use client"

export const fieldClass =
  'w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand disabled:opacity-60'

export const fetcher = (url: string) => fetch(url).then((r) => r.json())

/** Envia uma requisição JSON e devolve a mensagem de erro da API (ou null em caso de sucesso). */
export async function sendJson(url: string, method: string, body?: unknown): Promise<string | null> {
  try {
    const res = await fetch(url, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    if (res.ok) return null
    const json = await res.json().catch(() => null)
    return json?.error?.message || 'Não foi possível concluir a operação'
  } catch {
    return 'Erro de conexão. Verifique sua internet e tente novamente.'
  }
}

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
      {description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>}
    </div>
  )
}

export function Field({ label, help, children }: { label: string; help?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      {children}
      {help && <span className="block text-xs text-gray-500 dark:text-gray-400">{help}</span>}
    </label>
  )
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-sm text-gray-500 dark:text-gray-400">
      {children}
    </div>
  )
}
