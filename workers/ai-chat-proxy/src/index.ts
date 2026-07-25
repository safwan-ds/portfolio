export interface Env {
  OPENCODE_ZEN_API_KEY: string
  ALLOWED_ORIGIN?: string
}

const ZEN_API = 'https://opencode.ai/zen/go/v1/chat/completions'

function err(status: number, message: string, origin?: string) {
  const cors: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  if (origin) cors['Access-Control-Allow-Origin'] = origin
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  })
}

const RATE_WINDOW = 60_000
const RATE_MAX = 30
const rateMap = new Map<string, { count: number; reset: number }>()

function checkRate(ip: string): boolean {
  const now = Date.now()
  for (const [k, v] of rateMap) {
    if (now > v.reset) rateMap.delete(k)
  }
  const entry = rateMap.get(ip)
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_MAX) return false
  entry.count++
  return true
}

function extractOrigin(request: Request): string | null {
  const origin = request.headers.get('Origin')
  if (origin) return origin
  const referer = request.headers.get('Referer')
  if (referer) {
    try {
      const u = new URL(referer)
      return `${u.protocol}//${u.host}`
    } catch {}
  }
  return null
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowed = env.ALLOWED_ORIGIN || 'https://safwan-ds.github.io'
    const reqOrigin = extractOrigin(request)
    // Reflect the request origin in CORS so the browser accepts error responses
    const corsOrigin = reqOrigin || allowed

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': corsOrigin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    if (request.method !== 'POST') {
      return err(405, 'POST only', corsOrigin)
    }

    // Block requests from unknown origins (bots, direct curl, local exploits)
    if (!reqOrigin || reqOrigin !== allowed) {
      return err(403, 'Forbidden', corsOrigin)
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    if (!checkRate(ip)) {
      return err(429, 'Too many requests. Try again in a minute.', corsOrigin)
    }

    let body: { messages: unknown[]; model?: string }
    try {
      body = await request.json()
    } catch {
      return err(400, 'Invalid JSON body', corsOrigin)
    }

    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return err(400, 'Body must include a non-empty messages array', corsOrigin)
    }

    const upstream = await fetch(ZEN_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.OPENCODE_ZEN_API_KEY}`,
      },
      body: JSON.stringify({
        model: body.model || 'deepseek-v4-flash',
        messages: body.messages,
        stream: true,
      }),
    })

    if (!upstream.ok) {
      const text = await upstream.text()
      return err(upstream.status, text, corsOrigin)
    }

    return new Response(upstream.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': corsOrigin,
      },
    })
  },
}
