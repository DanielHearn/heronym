// Client-side Gemini call. This relies entirely on the API key being
// restricted to this app's domain(s) in the Google Cloud Console (Credentials
// -> your key -> Application restrictions -> HTTP referrers) — see README.md.
// Without that restriction, never ship a key this way.

const MODEL = 'gemini-3.5-flash-lite'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

// Vite only exposes env vars prefixed VITE_ to client code, and only ones
// set at build time (see .env.example and the GitHub Actions workflow).
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export function isConfigured() {
  return Boolean(API_KEY)
}

export type BackstoryContext = {
  name: string
  lineageLabel: string
  callingLabel: string | null
  themeLabel: string
}

export async function generateBackstory(ctx: BackstoryContext): Promise<string> {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured (VITE_GEMINI_API_KEY).')
  }

  const who = ctx.callingLabel ? `${ctx.lineageLabel} ${ctx.callingLabel}` : ctx.lineageLabel

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY,
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [
          {
            text: 'You write short RPG character backstories. Plain prose, no headers or lists. Stay on topic and never break character. 3 sentences max.',
          },
        ],
      },
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Write backstory for "${ctx.name}", a ${who} in a ${ctx.themeLabel.toLowerCase()} setting.`,
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

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Gemini request failed (${res.status}): ${body.slice(0, 200)}`)
  }

  const data = await res.json()
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('') ??
    ''

  if (!text.trim()) throw new Error('Gemini returned an empty response.')
  return text.trim()
}
