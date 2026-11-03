import { useEffect, useState } from 'react'
import { AI_API_URL } from '../../ai'
import type { BackstoryTone } from '../Backstory'
import './CharacterHook.less'

export type CharacterHookData = {
  hook: string
  motivation: string
  flaw: string
  secret: string
}

type HookField = keyof CharacterHookData
type Status = 'idle' | 'loading' | 'done' | 'error'

const HOOK_FIELDS: { key: HookField; label: string }[] = [
  { key: 'hook', label: 'Character hook' },
  { key: 'motivation', label: 'Motivation' },
  { key: 'flaw', label: 'Flaw' },
  { key: 'secret', label: 'Secret' },
]

type CharacterHookProps = {
  name: string
  lineageLabel: string
  callingLabel: string | null
  themeLabel: string
  sourceId: string
  tone: BackstoryTone
  onHookChange: (sourceId: string, hook: CharacterHookData | null) => void
}

function isCharacterHook(value: unknown): value is CharacterHookData {
  return (
    typeof value === 'object' &&
    value !== null &&
    HOOK_FIELDS.every(
      ({ key }) => typeof (value as Record<HookField, unknown>)[key] === 'string',
    )
  )
}

export default function CharacterHook({
  name,
  lineageLabel,
  callingLabel,
  themeLabel,
  sourceId,
  tone,
  onHookChange,
}: CharacterHookProps) {
  const [hook, setHook] = useState<CharacterHookData | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    onHookChange(sourceId, hook)
  }, [hook, onHookChange, sourceId])

  async function generate(section?: HookField) {
    setStatus('loading')
    setError('')

    try {
      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'character-hook',
          ...(section ? { section } : {}),
          name,
          lineageLabel,
          callingLabel,
          themeLabel,
          tone,
        }),
      })
      const data: unknown = await response.json()
      if (!response.ok) {
        const message =
          typeof data === 'object' && data !== null && 'error' in data
            ? String(data.error)
            : `Character hook request failed (${response.status})`
        throw new Error(message)
      }

      if (section) {
        const text =
          typeof data === 'object' && data !== null && 'text' in data ? data.text : null
        if (typeof text !== 'string' || !text.trim()) {
          throw new Error('Character hook API returned an empty response.')
        }
        setHook((current) => (current ? { ...current, [section]: text.trim() } : current))
      } else {
        const generated =
          typeof data === 'object' && data !== null && 'hook' in data ? data.hook : null
        if (!isCharacterHook(generated)) {
          throw new Error('Character hook API returned an invalid response.')
        }
        setHook(generated)
      }
      setStatus('done')
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Error generating character hook')
      setStatus('error')
    }
  }

  function updateField(key: HookField, value: string) {
    setHook((current) => (current ? { ...current, [key]: value } : current))
  }

  return (
    <section className="character-hook-panel" aria-labelledby="character-hook-title">
      <div className="character-hook-heading">
        <h2 id="character-hook-title">Character Hook</h2>
        {hook && (
          <button
            type="button"
            className="character-hook-button"
            onClick={() => void generate()}
            disabled={status === 'loading'}
          >
            Regenerate all
          </button>
        )}
      </div>

      {!hook && status !== 'loading' && (
        <button
          type="button"
          className="character-hook-button"
          onClick={() => void generate()}
        >
          {status === 'error' ? 'Try again' : 'Create character hook'}
        </button>
      )}

      {status === 'loading' && <p className="character-hook-hint">Generating character hook</p>}
      {status === 'error' && <p className="character-hook-error">{error}</p>}

      {hook && (
        <div className="character-hook-fields">
          {HOOK_FIELDS.map(({ key, label }) => (
            <label className="character-hook-field" key={key}>
              <span>{label}</span>
              <textarea
                value={hook[key]}
                rows={key === 'hook' ? 3 : 2}
                onChange={(event) => updateField(key, event.target.value)}
                disabled={status === 'loading'}
              />
              <button
                type="button"
                className="character-hook-button character-hook-button-small"
                onClick={() => void generate(key)}
                disabled={status === 'loading'}
              >
                Regenerate {label.toLowerCase()}
              </button>
            </label>
          ))}
        </div>
      )}
    </section>
  )
}
