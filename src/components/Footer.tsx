import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTION_SYSTEMS, SHOWCASE_PROJECTS, SYSTEM_LINKS } from '@/lib/system-links'
import TrackedAnchor from '@/components/TrackedAnchor'
import { getWhatsAppHref } from '@/lib/whatsapp'

export default function Footer() {
  const year = new Date().getFullYear()
  const whatsappHref = getWhatsAppHref('Olá, gostaria de fazer um orçamento')

  return (
    <footer className="relative border-t border-white/10 bg-ink-950">
      <div className="container py-12">
        <div className="gradient-border rounded-3xl p-px mb-14">
        <div className="rounded-[calc(1.5rem-1px)] p-8 md:p-10 bg-ink-950/90 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-2xl md:text-3xl font-bold text-center md:text-left">Pronto para acelerar seu projeto?</div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <TrackedAnchor
              kind="whatsapp"
              source="footer_cta"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-white text-ink-950 font-semibold px-6 py-3 hover:bg-slate-200 transition"
            >
              Solicitar orçamento
            </TrackedAnchor>
            <a href="/projects" className="inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-semibold px-6 py-3 hover:bg-white/10 transition">
              Ver portfólio
            </a>
          </div>
        </div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Image src="/logo-dark.svg" alt="FocoDev Sistemas" width={180} height={42} unoptimized className="h-10 w-auto mb-4" />
            <p className="text-sm text-slate-400">
              Empresa de sistemas em Franca/SP, com atendimento em todo o Brasil: sites, sistemas web, apps mobile e automações sob medida.
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Franca, SP · Brasil
            </p>
          </div>
          <div>
            <div className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 mb-4">Links</div>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-slate-400 hover:text-white transition-colors" href="/">Home</Link></li>
              <li><Link className="text-slate-400 hover:text-white transition-colors" href="/projects">Portfólio</Link></li>
              <li><Link className="text-slate-400 hover:text-white transition-colors" href="/#servicos">Serviços</Link></li>
              <li><Link className="text-slate-400 hover:text-white transition-colors" href="/#produtos">Produtos</Link></li>
              <li><Link className="text-slate-400 hover:text-white transition-colors" href="/#faq">FAQ</Link></li>
              {PRODUCTION_SYSTEMS.map((system) => (
                <li key={system.href}>
                  <a
                    className="text-slate-400 hover:text-white transition-colors"
                    href={system.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {system.label}
                  </a>
                </li>
              ))}
              <li><Link className="text-slate-400 hover:text-white transition-colors" href={SYSTEM_LINKS.estoque.href}>{SYSTEM_LINKS.estoque.label}</Link></li>
              <li><Link className="text-slate-400 hover:text-white transition-colors" href={SYSTEM_LINKS.academia.href}>{SYSTEM_LINKS.academia.label}</Link></li>
              <li><Link className="text-slate-400 hover:text-white transition-colors" href={SHOWCASE_PROJECTS.rotas.href}>{SHOWCASE_PROJECTS.rotas.label}</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 mb-4">Contato</div>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-500">
                Email:{' '}
                <TrackedAnchor
                  kind="mailto"
                  source="footer"
                  href="mailto:focodevsistemas@gmail.com"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  focodevsistemas@gmail.com
                </TrackedAnchor>
              </li>
              <li className="text-slate-500">
                Instagram:{' '}
                <a
                  href="https://www.instagram.com/focodevsistemas/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  @focodevsistemas
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container border-t border-white/10 py-8 text-sm text-slate-500">© {year} FocoDev Sistemas · Franca/SP</div>
    </footer>
  )
}
