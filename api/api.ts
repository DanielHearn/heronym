export interface Env {
  // Secret — set with `wrangler secret put GEMINI_API_KEY`, never in wrangler.toml.
  GEMINI_API_KEY: string
  // Comma-separated list of allowed origins, no trailing slash, e.g.
  // "https://username.github.io,http://localhost:5173"
  ALLOWED_ORIGIN: string
  RATE_LIMITER: { limit: (opts: { key: string }) => Promise<{ success: boolean }> }
}

const MODEL = 'gemini-3.5-lite'
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

// Keeps request bodies small and strips newlines, so this endpoint can't be
// used to smuggle an arbitrary long prompt through to Gemini.
const MAX_FIELD_LENGTH = 80

function allowedOrigins(env: Env): string[] {
  return env.ALLOWED_ORIGIN.split(',')
    .map((o) => o.trim())
    .filter(Boolean)
}

function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  }
}

function json(body: unknown, status: number, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  })
}

function clean(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .slice(0, MAX_FIELD_LENGTH)
    .replace(/[\r\n]+/g, ' ')
    .trim()
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') ?? ''
    const allowed = allowedOrigins(env).includes(origin)

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: allowed ? 204 : 403,
        headers: allowed ? corsHeaders(origin) : {},
      })
    }

    if (!allowed) {
      return json({ error: 'origin not allowed' }, 403)
    }

    if (request.method !== 'POST') {
      return json({ error: 'method not allowed' }, 405, corsHeaders(origin))
    }

    // Loose, best-effort per-IP throttle. Cloudflare's own docs describe this
    // binding as a filter, not an exact accounting system (counts are
    // eventually-consistent across edge locations) — good enough to blunt
    // casual abuse, not a hard guarantee.
    const clientIp = request.headers.get('cf-connecting-ip') ?? 'unknown'
    const { success } = await env.RATE_LIMITER.limit({ key: clientIp })
    if (!success) {
      return json({ error: 'rate limit exceeded, try again shortly' }, 429, corsHeaders(origin))
    }

    let payload: Record<string, unknown>
    try {
      payload = await request.json()
    } catch {
      return json({ error: 'invalid JSON body' }, 400, corsHeaders(origin))
    }

    const name = clean(payload.name)
    const lineageLabel = clean(payload.lineageLabel)
    const callingLabel = payload.callingLabel ? clean(payload.callingLabel) : null
    const themeLabel = clean(payload.themeLabel)

    if (!name || !lineageLabel || !themeLabel) {
      return json(
        { error: 'name, lineageLabel and themeLabel are required' },
        400,
        corsHeaders(origin),
      )
    }

    const who = callingLabel ? `${lineageLabel} ${callingLabel}` : lineageLabel

    const geminiRes = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text:
                'You write short RPG character backstories. Exactly two to three sentences, ' +
                'plain prose, no headers or lists. Stay on topic and never break character or ' +
                'mention that you are an AI.',
            },
          ],
        },
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Write a backstory for "${name}", a ${who} in a ${themeLabel.toLowerCase()} setting.`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 200,
        },
      }),
    })

    if (!geminiRes.ok) {
      const body = await geminiRes.text().catch(() => '')
      console.error('Gemini error', geminiRes.status, body.slice(0, 500))
      return json({ error: 'upstream generation failed' }, 502, corsHeaders(origin))
    }

    const data: {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
    } = await geminiRes.json()

    const text = data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? '')
      .join('')
      .trim()

    if (!text) {
      return json({ error: 'empty response from model' }, 502, corsHeaders(origin))
    }

    return json({ text }, 200, corsHeaders(origin))
  },
} satisfies ExportedHandler<Env>
