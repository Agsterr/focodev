'use client'

import { useEffect } from 'react'
import {
  trackEvent,
  trackMailtoClick,
  trackPhoneClick,
  trackWhatsAppClick,
} from '@/lib/analytics'
import { captureAttribution } from '@/lib/attribution'

type LinkType = 'whatsapp' | 'phone' | 'email' | 'external' | 'internal' | 'button'

function linkType(el: Element, href: string): LinkType {
  if (el.tagName !== 'A' || !href) return 'button'
  if (/wa\.me|whatsapp\.com|api\.whatsapp/i.test(href)) return 'whatsapp'
  if (href.startsWith('tel:')) return 'phone'
  if (href.startsWith('mailto:')) return 'email'
  try {
    return new URL(href, window.location.href).origin === window.location.origin ? 'internal' : 'external'
  } catch {
    return 'internal'
  }
}

/** Seção da página onde o clique aconteceu (id da seção ou data-section). */
function sectionOf(el: Element) {
  const tagged = el.closest('[data-section]')
  if (tagged) return tagged.getAttribute('data-section') || ''
  const landmark = el.closest('section[id], header, nav, footer, main [id]')
  if (!landmark) return ''
  return landmark.id || landmark.tagName.toLowerCase()
}

function labelOf(el: Element) {
  const text =
    el.getAttribute('data-track') ||
    el.getAttribute('aria-label') ||
    (el as HTMLElement).innerText ||
    el.getAttribute('title') ||
    ''
  return text.replace(/\s+/g, ' ').trim().slice(0, 100)
}

/**
 * Registra todo clique em links e botões do site público (evento `site_click`
 * no GA4/Ads com texto, destino e seção). Links de WhatsApp, telefone e e-mail
 * que não passam pelo TrackedAnchor também disparam a conversão correspondente.
 */
export default function ClickTracker() {
  useEffect(() => {
    if (!window.location.pathname.startsWith('/admin')) captureAttribution()

    function onClick(e: MouseEvent) {
      if (window.location.pathname.startsWith('/admin')) return
      const target = e.target as Element | null
      const el = target?.closest('a, button, [data-track]')
      if (!el || el.closest('[data-no-track]')) return

      const href = el.getAttribute('href') || ''
      const type = linkType(el, href)
      const section = sectionOf(el)
      const label = labelOf(el)

      trackEvent('site_click', {
        click_text: label,
        click_url: href.slice(0, 300),
        click_section: section,
        link_type: type,
        page_path: window.location.pathname,
      })

      // TrackedAnchor já envia a conversão específica
      if (el.hasAttribute('data-tracked')) return
      const source = `${window.location.pathname}${section ? `#${section}` : ''}`
      if (type === 'whatsapp') trackWhatsAppClick(source)
      else if (type === 'phone') trackPhoneClick(source)
      else if (type === 'email') trackMailtoClick(source)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
