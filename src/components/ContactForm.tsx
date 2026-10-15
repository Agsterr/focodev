'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { User, Mail, MessageSquare, Send, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { trackFormStart, trackLeadSubmit } from '@/lib/analytics'

type ContactFormProps = {
  defaultMessage?: string
  /** Origem do formulário para o Google Ads (ex: home, fitlife, rotas) */
  trackingSource?: string
}

export default function ContactForm({
  defaultMessage = '',
  trackingSource = 'contact_form',
}: ContactFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: defaultMessage,
  })
  const [website, setWebsite] = useState('')
  const formStartedRef = useRef(false)

  function handleFormInteraction() {
    if (formStartedRef.current) return
    formStartedRef.current = true
    trackFormStart(trackingSource)
  }

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
      formDataToSend.append('website', website)

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error(data.error?.message || 'Erro ao enviar mensagem. Tente novamente.')
      }

      trackLeadSubmit(trackingSource)

      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: defaultMessage })
      formStartedRef.current = false

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
    <form onSubmit={handleSubmit} className="relative rounded-3xl border border-white/10 bg-ink-950/60 backdrop-blur-xl p-6 md:p-8 space-y-4 shadow-2xl shadow-black/40">
      {success && (
        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <p className="text-green-800 dark:text-green-200 font-medium">
            Mensagem enviada com sucesso! Entraremos em contato em breve.
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
        </div>
      )}

      {/* Honeypot anti-spam: escondido de pessoas e leitores de tela */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>
          Não preencha este campo
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>

      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-cyan pointer-events-none" />
        <input
          name="name"
          value={formData.name}
          onFocus={handleFormInteraction}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Seu nome"
          aria-label="Seu nome"
          autoComplete="name"
          maxLength={120}
          required
          disabled={loading}
          className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4 pl-12 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-500 transition focus:outline-none focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/40 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-cyan pointer-events-none" />
        <input
          name="email"
          type="email"
          value={formData.email}
          onFocus={handleFormInteraction}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Seu email"
          aria-label="Seu email"
          autoComplete="email"
          maxLength={254}
          required
          disabled={loading}
          className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4 pl-12 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-500 transition focus:outline-none focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/40 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-cyan pointer-events-none" />
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onFocus={handleFormInteraction}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Seu telefone (opcional)"
          aria-label="Seu telefone (opcional)"
          autoComplete="tel"
          maxLength={40}
          disabled={loading}
          className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4 pl-12 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-500 transition focus:outline-none focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/40 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="relative">
        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-neon-cyan pointer-events-none" />
        <textarea
          name="message"
          value={formData.message}
          onFocus={handleFormInteraction}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Sua mensagem"
          aria-label="Sua mensagem"
          minLength={10}
          maxLength={5000}
          required
          rows={6}
          disabled={loading}
          className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4 pl-12 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-500 transition focus:outline-none focus:border-neon-violet focus:ring-2 focus:ring-neon-violet/40 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        variant="gradient"
        disabled={loading}
        className="w-full text-base py-6 rounded-xl hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
