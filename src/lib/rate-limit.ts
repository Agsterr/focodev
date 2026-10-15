import type { NextRequest } from 'next/server'

// Limitador em memória por IP. O site roda em um único container (Hetzner),
// então o estado local do processo é suficiente — e, ao contrário de um cookie,
// não pode ser burlado pelo cliente.
const buckets = new Map<string, { count: number; resetAt: number }>()

export function getClientIp(req: NextRequest) {
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

export function rateLimit(req: NextRequest, key: string, limit = 30, windowMs = 60_000) {
  const now = Date.now()
  if (buckets.size > 10_000) {
    buckets.forEach((b, k) => {
      if (b.resetAt <= now) buckets.delete(k)
    })
  }

  const id = `${key}:${getClientIp(req)}`
  const bucket = buckets.get(id)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(id, { count: 1, resetAt: now + windowMs })
    return { limited: false }
  }
  bucket.count += 1
  return { limited: bucket.count > limit }
}
