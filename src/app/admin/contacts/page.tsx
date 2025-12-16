"use client"

import useSWR from 'swr'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MessageSquare, User, Calendar, CheckCircle2, Circle, Eye, EyeOff } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminContactsPage() {
  const [statusFilter, setStatusFilter] = useState<'NOVO' | 'RESPONDIDO' | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const filterUrl = statusFilter ? `/api/contacts?page=${page}&pageSize=20&status=${statusFilter}` : `/api/contacts?page=${page}&pageSize=20`
  const { data, mutate } = useSWR(filterUrl, fetcher)

  const contacts = data?.data?.contacts || []
  const pagination = data?.data?.pagination || { total: 0, totalPages: 1, page: 1 }

  async function updateStatus(id: string, newStatus: 'NOVO' | 'RESPONDIDO') {
    const res = await fetch(`/api/contacts?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    if (res.ok) {
      mutate()
      if (selectedMessage === id) {
        setSelectedMessage(null)
      }
    }
  }

  const selectedContact = contacts.find((c: any) => c.id === selectedMessage)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mensagens de Contato</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Total: {pagination.total} mensagens
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex gap-2">
        <Button
          variant={statusFilter === null ? 'default' : 'outline'}
          onClick={() => setStatusFilter(null)}
          size="sm"
        >
          Todas
        </Button>
        <Button
          variant={statusFilter === 'NOVO' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('NOVO')}
          size="sm"
          className="relative"
        >
          Novas
          {data?.data?.pagination?.total > 0 && statusFilter !== 'NOVO' && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
              {contacts.filter((c: any) => c.status === 'NOVO').length}
            </span>
          )}
        </Button>
        <Button
          variant={statusFilter === 'RESPONDIDO' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('RESPONDIDO')}
          size="sm"
        >
          Respondidas
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Lista de mensagens */}
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma mensagem encontrada</p>
            </div>
          ) : (
            contacts.map((contact: any) => (
              <div
                key={contact.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedMessage === contact.id
                    ? 'border-brand bg-brand/5 dark:bg-brand/10'
                    : 'border-gray-200 dark:border-gray-800 hover:border-brand/50'
                }`}
                onClick={() => setSelectedMessage(selectedMessage === contact.id ? null : contact.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {contact.status === 'NOVO' ? (
                      <Circle className="w-4 h-4 text-brand" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                    <h3 className="font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      contact.status === 'NOVO'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}
                  >
                    {contact.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {contact.message}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {contact.email}
                  </span>
                  {contact.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {contact.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(contact.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ))
          )}

          {/* Paginação */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                Anterior
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Página {pagination.page} de {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
                disabled={page === pagination.totalPages}
              >
                Próxima
              </Button>
            </div>
          )}
        </div>

        {/* Detalhes da mensagem selecionada */}
        {selectedContact && (
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Detalhes da Mensagem</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMessage(null)}
              >
                <EyeOff className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1">
                  <User className="w-4 h-4" />
                  Nome
                </label>
                <p className="text-gray-900 dark:text-white">{selectedContact.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4" />
                  E-mail
                </label>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="text-brand hover:underline"
                >
                  {selectedContact.email}
                </a>
              </div>

              {selectedContact.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1">
                    <Phone className="w-4 h-4" />
                    Telefone
                  </label>
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="text-brand hover:underline"
                  >
                    {selectedContact.phone}
                  </a>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" />
                  Data/Hora
                </label>
                <p className="text-gray-900 dark:text-white">
                  {new Date(selectedContact.createdAt).toLocaleString('pt-BR', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  })}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1">
                  <MessageSquare className="w-4 h-4" />
                  Mensagem
                </label>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status:
                  </span>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedContact.status === 'NOVO'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}
                  >
                    {selectedContact.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                {selectedContact.status === 'NOVO' ? (
                  <Button
                    onClick={() => updateStatus(selectedContact.id, 'RESPONDIDO')}
                    className="flex-1"
                    variant="default"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Marcar como Respondido
                  </Button>
                ) : (
                  <Button
                    onClick={() => updateStatus(selectedContact.id, 'NOVO')}
                    className="flex-1"
                    variant="outline"
                  >
                    <Circle className="w-4 h-4 mr-2" />
                    Marcar como Novo
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {!selectedContact && contacts.length > 0 && (
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-12 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Selecione uma mensagem para ver os detalhes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


