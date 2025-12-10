"use client"
import { Button } from '@/components/ui/button'

export default function LogViewer({ text, title }: { text: string; title?: string }) {
  const lines = text.split(/\r?\n/)
  const urlRegex = /(https?:\/\/[^\s`]+)|(`https?:\/\/[^`]+`)/g

  function renderLine(line: string, idx: number) {
    const isError = /error:/i.test(line) || /pre-receive hook declined/i.test(line)
    const parts = [] as (string | JSX.Element)[]
    let lastIndex = 0
    const matches = Array.from(line.matchAll(urlRegex))
    for (const m of matches) {
      const match = m[0]
      const start = m.index ?? 0
      const end = start + match.length
      if (start > lastIndex) parts.push(line.slice(lastIndex, start))
      const url = match.replace(/`/g, '')
      parts.push(
        <a key={idx + '-' + start} href={url} target="_blank" rel="noreferrer" className="underline text-brand hover:text-brand-dark">
          {match}
        </a>
      )
      lastIndex = end
    }
    if (lastIndex < line.length) parts.push(line.slice(lastIndex))
    return (
      <div key={idx} className={isError ? 'text-red-300' : 'text-green-300'}>
        {parts.length ? parts : line}
      </div>
    )
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {}
  }

  return (
    <div className="card p-0 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="font-semibold">{title || 'Logs'}</div>
        <Button variant="outline" size="sm" onClick={copy}>Copiar</Button>
      </div>
      <div className="bg-black font-mono text-xs sm:text-sm whitespace-pre-wrap break-words p-4 overflow-auto">
        {lines.map(renderLine)}
      </div>
    </div>
  )
}
