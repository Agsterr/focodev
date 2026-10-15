"use client"
import useSWR from 'swr'
import { useState } from 'react'
import { BellRing } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/admin/toast'
import { fetcher } from '@/components/admin/form'

function Badge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        ok
          ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200'
          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? 'bg-green-500' : 'bg-amber-500'}`} />
      {label}: {ok ? 'configurado' : 'não configurado'}
    </span>
  )
}

/** Mostra se os avisos de novo contato (e-mail e WhatsApp) estão configurados e permite enviar um teste. */
export default function NotificationStatus() {
  const { data } = useSWR('/api/notifications/test', fetcher)
  const toast = useToast()
  const [sending, setSending] = useState(false)
  const status = data?.data

  async function sendTest() {
    setSending(true)
    try {
      const res = await fetch('/api/notifications/test', { method: 'POST' })
      const json = await res.json().catch(() => null)
      if (!res.ok) return toast.error(json?.error?.message || 'Falha ao enviar teste')
      const { email, whatsapp } = json.data
      if (email.success) toast.success('E-mail de teste enviado')
      else toast.error(`E-mail falhou: ${email.error}`)
      if (whatsapp.success) toast.success('WhatsApp de teste enviado')
      else toast.error(`WhatsApp falhou: ${whatsapp.error}`)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mb-6 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
          <BellRing className="w-4 h-4 text-brand" />
          Avisos de novo contato
        </div>
        {status ? (
          <div className="flex flex-wrap gap-2">
            <Badge ok={status.email.configured} label="E-mail" />
            <Badge ok={status.whatsapp.configured} label="WhatsApp" />
          </div>
        ) : (
          <div className="text-xs text-gray-500">Verificando...</div>
        )}
        {status?.email?.recipients && (
          <div className="text-xs text-gray-500 dark:text-gray-400">E-mail para: {status.email.recipients.join(', ')}</div>
        )}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={sendTest} disabled={sending}>
        {sending ? 'Enviando...' : 'Enviar teste'}
      </Button>
    </div>
  )
}
