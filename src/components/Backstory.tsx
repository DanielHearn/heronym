import { useEffect, useRef, useState } from 'react'
import { generateBackstory, isConfigured } from '../gemini'

type BackstoryProps = {
  name: string
  lineageLabel: string
  callingLabel: string | null
  themeLabel: string
}

type Status = 'idle' | 'loading' | 'done' | 'error' | 'unconfigured'

export default function Backstory({
  name,
  lineageLabel,
  callingLabel,
  themeLabel,
}: BackstoryProps) {
  const [status, setStatus] = useState<Status>(() => (isConfigured() ? 'idle' : 'unconfigured'))
  const [text, setText] = useState('')
  const [error, setError] = useState('')

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

  async function generate() {
    const id = ++requestId.current
    setStatus('loading')
    setText('')
    setError('')

    try {
      const result = await generateBackstory({ name, lineageLabel, callingLabel, themeLabel })
      setText(result)
      setStatus('done')
    } catch (err) {
      console.error(err)
      setError('Error generating backstory')
      setStatus('error')
    }
  }

  return (
    <div className="backstory">
      {status === 'idle' && (
        <button type="button" className="backstory-btn" onClick={generate}>
          Generate a backstory
        </button>
      )}

      {status === 'loading' && <p className="backstory-hint">Generating backstory</p>}

      {status === 'done' && <p className="backstory-text">{text}</p>}

      {status === 'error' && <p className="backstory-error">{error}</p>}

      {(status === 'done' || status === 'error') && (
        <button type="button" className="backstory-btn backstory-btn-small" onClick={generate}>
          Regenerate
        </button>
      )}
    </div>
  )
}
