"use client"
import useSWR from 'swr'
import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/admin/toast'
import { EmptyState, Field, fetcher, fieldClass, sendJson } from '@/components/admin/form'

export type CrudField = {
  name: string
  label: string
  type?: 'text' | 'textarea' | 'url'
  placeholder?: string
  help?: string
  required?: boolean
  minLength?: number
}

type Item = Record<string, any> & { id: string }

type Props = {
  endpoint: string
  /** Texto usado nos avisos, ex: "Serviço" */
  entityName: string
  fields: CrudField[]
  columns: { key: string; label: string; muted?: boolean }[]
  /** Campo exibido na confirmação de exclusão */
  titleKey: string
}

function emptyValues(fields: CrudField[]) {
  return Object.fromEntries(fields.map((f) => [f.name, ''])) as Record<string, string>
}

export default function CrudManager({ endpoint, entityName, fields, columns, titleKey }: Props) {
  const { data, mutate, isLoading } = useSWR(`${endpoint}?page=1&pageSize=100`, fetcher)
  const toast = useToast()
  const [values, setValues] = useState(() => emptyValues(fields))
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const items: Item[] = Array.isArray(data?.data) ? data.data : data?.data?.items || []

  function startEdit(item: Item) {
    setEditingId(item.id)
    setValues(Object.fromEntries(fields.map((f) => [f.name, item[f.name] ?? ''])))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setEditingId(null)
    setValues(emptyValues(fields))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const error = editingId
      ? await sendJson(endpoint, 'PUT', { id: editingId, ...values })
      : await sendJson(endpoint, 'POST', values)
    setSaving(false)
    if (error) {
      toast.error(error)
      return
    }
    toast.success(editingId ? `${entityName} atualizado` : `${entityName} criado`)
    cancelEdit()
    mutate()
  }

  async function remove(item: Item) {
    if (!confirm(`Excluir "${item[titleKey]}"? Esta ação não pode ser desfeita.`)) return
    const error = await sendJson(`${endpoint}?id=${encodeURIComponent(item.id)}`, 'DELETE')
    if (error) {
      toast.error(error)
      return
    }
    toast.success(`${entityName} excluído`)
    if (editingId === item.id) cancelEdit()
    mutate()
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={submit}
        className={`grid gap-4 max-w-2xl rounded-xl border p-5 ${
          editingId ? 'border-brand/50 bg-brand/5' : 'border-gray-200 dark:border-gray-800'
        }`}
      >
        <div className="text-sm font-semibold text-gray-900 dark:text-white">
          {editingId ? `Editando ${entityName.toLowerCase()}` : `Novo ${entityName.toLowerCase()}`}
        </div>
        {fields.map((f) => (
          <Field key={f.name} label={f.label} help={f.help}>
            {f.type === 'textarea' ? (
              <textarea
                value={values[f.name]}
                onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                placeholder={f.placeholder}
                required={f.required}
                minLength={f.minLength}
                rows={4}
                className={fieldClass}
              />
            ) : (
              <input
                type={f.type === 'url' ? 'url' : 'text'}
                value={values[f.name]}
                onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                placeholder={f.placeholder}
                required={f.required}
                minLength={f.minLength}
                className={fieldClass}
              />
            )}
          </Field>
        ))}
        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Salvando...' : editingId ? 'Salvar alterações' : 'Criar'}
          </Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={cancelEdit}>
              Cancelar
            </Button>
          )}
        </div>
      </form>

      {isLoading ? (
        <EmptyState>Carregando...</EmptyState>
      ) : items.length === 0 ? (
        <EmptyState>Nada cadastrado ainda.</EmptyState>
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr className="text-left">
                {columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 w-28"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className={`border-t border-gray-200 dark:border-gray-800 ${editingId === item.id ? 'bg-brand/5' : ''}`}>
                  {columns.map((c) => (
                    <td key={c.key} className={`px-4 py-3 align-top ${c.muted ? 'text-gray-600 dark:text-gray-400' : ''}`}>
                      <span className="line-clamp-3">{item[c.key]}</span>
                    </td>
                  ))}
                  <td className="px-4 py-3 align-top">
                    <div className="flex justify-end gap-1">
                      <Button type="button" variant="outline" size="sm" onClick={() => startEdit(item)} aria-label={`Editar ${item[titleKey]}`}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => remove(item)} aria-label={`Excluir ${item[titleKey]}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
