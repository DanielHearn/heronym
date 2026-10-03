import { useEffect, useRef, useState } from 'react'
import './Backstory.less'

type BackstoryProps = {
  name: string
  lineageLabel: string
  callingLabel: string | null
  themeLabel: string
}

type Status = 'idle' | 'loading' | 'done' | 'error'

const BACKSTORY_API = 'https://heronym.hearndaniel.workers.dev/'
const BACKSTORY_LIMIT_STORAGE_KEY = 'heronym:backstory-requests:v1'
const BACKSTORY_REQUEST_LIMIT = 5
const BACKSTORY_REQUEST_WINDOW_MS = 60_000

let inMemoryRequestTimes: number[] = []
let hasWarnedStorageUnavailable = false

function reserveBackstoryRequest(): number | null {
  const now = Date.now()
  let requestTimes = inMemoryRequestTimes

  try {
    const stored = window.localStorage.getItem(BACKSTORY_LIMIT_STORAGE_KEY)
    if (stored) {
      const parsed: unknown = JSON.parse(stored)
      if (
        Array.isArray(parsed) &&
        parsed.every((time) => typeof time === 'number' && Number.isFinite(time))
      ) {
        requestTimes = parsed
      }
    }
  } catch (err) {
    if (!hasWarnedStorageUnavailable) {
      console.warn(
        'Backstory rate limit could not access local storage; using in-memory tracking.',
        err,
      )
      hasWarnedStorageUnavailable = true
    }
  }

  requestTimes = requestTimes.filter((time) => time > now - BACKSTORY_REQUEST_WINDOW_MS)
  requestTimes.sort((a, b) => a - b)
  if (requestTimes.length >= BACKSTORY_REQUEST_LIMIT) {
    inMemoryRequestTimes = requestTimes
    return requestTimes[0] + BACKSTORY_REQUEST_WINDOW_MS
  }

  requestTimes.push(now)
  inMemoryRequestTimes = requestTimes
  try {
    window.localStorage.setItem(BACKSTORY_LIMIT_STORAGE_KEY, JSON.stringify(requestTimes))
  } catch (err) {
    if (!hasWarnedStorageUnavailable) {
      console.warn(
        'Backstory rate limit could not persist to local storage; using in-memory tracking.',
        err,
      )
      hasWarnedStorageUnavailable = true
    }
  }
  return null
}

export default function Backstory({
  name,
  lineageLabel,
  callingLabel,
  themeLabel,
}: BackstoryProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [retryAt, setRetryAt] = useState<number | null>(null)
  const [retrySeconds, setRetrySeconds] = useState(0)

  // Guards against setting state after this instance is gone (unmounted
  // when a new name replaces it) or after a newer generate() call has
  // superseded an in-flight one (rapid re-clicks).
  const mountedRef = useRef(true)
  const requestId = useRef(0)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (retryAt === null) return

    function updateCountdown() {
      const remaining = Math.max(0, Math.ceil((retryAt - Date.now()) / 1000))
      setRetrySeconds(remaining)
      if (remaining === 0) setRetryAt(null)
    }

    updateCountdown()
    const interval = window.setInterval(updateCountdown, 1000)
    return () => window.clearInterval(interval)
  }, [retryAt])

  async function generate() {
    const retryAfter = reserveBackstoryRequest()
    if (retryAfter !== null) {
      setRetryAt(retryAfter)
      setRetrySeconds(Math.max(0, Math.ceil((retryAfter - Date.now()) / 1000)))
      setStatus('error')
      return
    }

    setRetryAt(null)
    setStatus('loading')
    setText('')
    setError('')

    try {
      const response = await fetch(BACKSTORY_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, lineageLabel, callingLabel, themeLabel }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error || `Backstory request failed (${response.status})`)
      }
      if (typeof data?.text !== 'string' || !data.text.trim()) {
        throw new Error('Backstory API returned an empty response.')
      }
      setText(data.text.trim())
      setStatus('done')
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Error generating backstory')
      setStatus('error')
    }
  }

  return (
    <div className="backstory">
      {status === 'idle' && (
        <button type="button" className="backstory-btn" onClick={generate}>
          Generate backstory
        </button>
      )}

      {status === 'loading' && <p className="backstory-hint">Generating backstory</p>}

      {status === 'done' && <p className="backstory-text">{text}</p>}

      {retryAt !== null && retrySeconds > 0 && (
        <p className="backstory-error">
          You can generate up to {BACKSTORY_REQUEST_LIMIT} backstories per minute. Try again in{' '}
          {retrySeconds} {retrySeconds === 1 ? 'second' : 'seconds'}.
        </p>
      )}

      {status === 'error' && retryAt === null && error && (
        <p className="backstory-error">{error}</p>
      )}

      {(status === 'done' || status === 'error') && (
        <button type="button" className="backstory-btn backstory-btn-small" onClick={generate}>
          Regenerate Backstory
        </button>
      )}
    </div>
  )
}
