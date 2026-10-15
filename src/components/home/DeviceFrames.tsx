import Image from 'next/image'

/** Moldura de navegador para prints de sistemas web. */
export function BrowserFrame({
  src,
  alt,
  url,
  priority,
  className = '',
  sizes = '(max-width: 1024px) 100vw, 640px',
}: {
  src: string
  alt: string
  url?: string
  priority?: boolean
  className?: string
  sizes?: string
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/60 ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        {url && (
          <span className="ml-2 truncate rounded-md bg-white/[0.06] px-3 py-0.5 text-[11px] text-slate-400">{url}</span>
        )}
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
      </div>
    </div>
  )
}

/** Moldura de celular para prints de apps. */
export function PhoneFrame({
  src,
  alt,
  priority,
  className = '',
  sizes = '220px',
}: {
  src: string
  alt: string
  priority?: boolean
  className?: string
  sizes?: string
}) {
  return (
    <div className={`rounded-[2rem] border border-white/15 bg-ink-950 p-1.5 shadow-2xl shadow-black/70 ${className}`}>
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.6rem] bg-white">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
        <div className="absolute left-1/2 top-1.5 h-4 w-16 -translate-x-1/2 rounded-full bg-black/90" />
      </div>
    </div>
  )
}
