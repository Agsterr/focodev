'use client'

import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import {
  trackCtaClick,
  trackMailtoClick,
  trackWhatsAppClick,
} from '@/lib/analytics'

type TrackKind = 'whatsapp' | 'cta' | 'mailto'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> & {
  kind: TrackKind
  source: string
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

/**
 * Link com disparo de evento Google Ads no clique
 * (WhatsApp, CTAs de orçamento, mailto).
 */
const TrackedAnchor = forwardRef<HTMLAnchorElement, Props>(function TrackedAnchor(
  { kind, source, children, onClick, href, ...rest },
  ref
) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (kind === 'whatsapp') {
      trackWhatsAppClick(source)
    } else if (kind === 'mailto') {
      trackMailtoClick(source)
    } else {
      trackCtaClick(source, typeof href === 'string' ? href : undefined)
    }
    onClick?.(e)
  }

  return (
    <a ref={ref} href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
})

export default TrackedAnchor
