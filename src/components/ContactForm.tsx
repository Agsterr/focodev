"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { User, Mail, MessageSquare, Send, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('message', formData.message)

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error(data.error?.message || 'Erro ao enviar mensagem. Tente novamente.')
      }

      // Sucesso
      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })

      // Limpar mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 md:p-10 space-y-6 ring-1 ring-brand/20 hover:ring-brand/40">
      {/* Mensagem de sucesso */}
      {success && (
        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <p className="text-green-800 dark:text-green-200 font-medium">
            Mensagem enviada com sucesso! Entraremos em contato em breve.
          </p>
        </div>
      )}

      {/* Mensagem de erro */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
        </div>
      )}

      {/* Campo Nome */}
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand pointer-events-none" />
        <input
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Seu nome"
          required
          disabled={loading}
          className="w-full border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-gray-900 dark:text-white hover:text-brand dark:hover:text-brand hover:border-brand dark:hover:border-brand placeholder-gray-600 dark:placeholder-gray-400 shadow-soft hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Campo Email */}
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand pointer-events-none" />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Seu email"
          required
          disabled={loading}
          className="w-full border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-gray-900 dark:text-white hover:text-brand dark:hover:text-brand hover:border-brand dark:hover:border-brand placeholder-gray-600 dark:placeholder-gray-400 shadow-soft hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Campo Telefone */}
      <div className="relative">
        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand pointer-events-none" />
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Seu telefone (opcional)"
          disabled={loading}
          className="w-full border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-gray-900 dark:text-white hover:text-brand dark:hover:text-brand hover:border-brand dark:hover:border-brand placeholder-gray-600 dark:placeholder-gray-400 shadow-soft hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Campo Mensagem */}
      <div className="relative">
        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-brand pointer-events-none" />
        <textarea
          name="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Sua mensagem"
          required
          rows={6}
          disabled={loading}
          className="w-full border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 resize-none shadow-soft hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Botão de envio */}
      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full text-base py-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="inline-flex items-center gap-2">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Enviar Mensagem
            </>
          )}
        </span>
      </Button>
    </form>
  )
}


