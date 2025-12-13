"use client"

import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * Componente que exibe notificação de mensagens novas no layout admin
 */
export default function ContactsNotification() {
  const { data } = useSWR('/api/contacts?page=1&pageSize=1&status=NOVO', fetcher, {
    refreshInterval: 30000, // Atualizar a cada 30 segundos
  })

  const newMessagesCount = data?.data?.pagination?.total || 0

  if (newMessagesCount === 0) {
    return null
  }

  return (
    <Link
      href="/admin/contacts"
      className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
    >
      <span className="text-sm font-semibold">
        {newMessagesCount} nova{newMessagesCount > 1 ? 's' : ''} mensagem{newMessagesCount > 1 ? 'ns' : ''}
      </span>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
    </Link>
  )
}

