import { NextRequest, NextResponse } from 'next/server'

function parse(value: string | undefined) {
  if (!value) return { count: 0, ts: 0 }
  const [count, ts] = value.split(':').map((v) => Number(v))
  return { count: count || 0, ts: ts || 0 }
}

export function rateLimit(req: NextRequest, key: string, limit = 30, windowMs = 60_000) {
  const cookie = req.cookies.get(`rl_${key}`)?.value
  const { count, ts } = parse(cookie)
  const now = Date.now()
  const newCount = now - ts > windowMs ? 1 : count + 1
  if (newCount > limit) return { limited: true }
  const res = NextResponse.next()
  res.cookies.set(`rl_${key}`, `${newCount}:${now}`, { httpOnly: true, sameSite: 'lax', path: '/', secure: true })
  return { limited: false, response: res }
}
