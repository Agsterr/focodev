"use client"
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function AdminCompanyPage() {
  const { data, mutate } = useSWR('/api/company', fetcher)
  const [form, setForm] = useState({ name: '', email: '', phone: '', instagram: '', address: '', whatsappLink: '', whatsappNumber: '' })
  useEffect(() => {
    if (data?.data) setForm({
      name: data.data.name || '',
      email: data.data.email || '',
      phone: data.data.phone || '',
      instagram: data.data.instagram || '',
      address: data.data.address || '',
      whatsappLink: data.data.whatsappLink || '',
      whatsappNumber: data.data.whatsappNumber || '',
    })
  }, [data])

  async function save() {
    await fetch('/api/company', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    mutate()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dados da Empresa</h1>
      <div className="grid gap-3 max-w-2xl">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Telefone" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} placeholder="Instagram" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Endereço" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.whatsappNumber} onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })} placeholder="WhatsApp número (somente dígitos)" className="border p-3 rounded-md dark:border-gray-700" />
        <input value={form.whatsappLink} onChange={(e) => setForm({ ...form, whatsappLink: e.target.value })} placeholder="Link WhatsApp (opcional)" className="border p-3 rounded-md dark:border-gray-700" />
        <Button onClick={save}>Salvar</Button>
      </div>
    </div>
  )
}
