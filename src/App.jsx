import { useState, useMemo, useEffect } from 'react'
import { RACES, CLASSES, RACE_KEYS, CLASS_KEYS } from './data.js'
import { buildName, makeId } from './generator.js'

const PIN_STORAGE_KEY = 'heronym:pinned:v1'
const COMPLEXITY_LABELS = ['Brief', 'Modest', 'Balanced', 'Ornate', 'Grand']

function PinIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true">
      <path
        d="M12 2c-3.3 0-6 2.7-6 6 0 4.2 6 12 6 12s6-7.8 6-12c0-3.3-2.7-6-6-6zm0 8.2c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2 2.2 1 2.2 2.2-1 2.2-2.2 2.2z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={1.6}
      />
    </svg>
  )
}

export default function App() {
  const [race, setRace] = useState('human')
  const [cls, setCls] = useState('warrior')
  const [opts, setOpts] = useState({ first: true, middle: false, surname: true, title: false })
  const [current, setCurrent] = useState(null)
  const [history, setHistory] = useState([])
  const [pinned, setPinned] = useState(() => {
    try {
      const raw = window.localStorage.getItem(PIN_STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })
  const [reveal, setReveal] = useState(false)
  const [complexity, setComplexity] = useState(3)

  useEffect(() => {
    try {
      window.localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(pinned))
    } catch {
      // storage unavailable (private browsing, quota, etc.) — pins just won't persist
    }
  }, [pinned])

  const anySelected = opts.first || opts.middle || opts.surname || opts.title

  function toggle(key) {
    setOpts((o) => ({ ...o, [key]: !o[key] }))
  }

  function generate() {
    if (!anySelected) return
    const result = { ...buildName(race, cls, opts, complexity), id: makeId() }
    setCurrent(result)
    setHistory((hist) => [result, ...hist].slice(0, 8))
    setReveal(false)
    requestAnimationFrame(() => setReveal(true))
  }

  function isPinned(id) {
    return pinned.some((p) => p.id === id)
  }
  function togglePin(item) {
    if (!item || !item.full) return
    setPinned((p) => (p.some((x) => x.id === item.id) ? p.filter((x) => x.id !== item.id) : [item, ...p]))
  }
  function unpin(id) {
    setPinned((p) => p.filter((x) => x.id !== id))
  }

  const kicker = useMemo(() => {
    if (!current) return 'a name awaits the forge'
    return `${current.raceLabel} \u00B7 ${current.classLabel}`
  }, [current])

  return (
    <div className="wrap">
      <div className="masthead">
        <h1>Heronym</h1>
        <p>A generator of names for heroes, villains, and everyone between</p>
        <div className="rule" />
      </div>

      <div className="layout">
        <div className="panel">
          <h2>Lineage &amp; Calling</h2>

          <div className="field">
            <label htmlFor="race-select">Race</label>
            <select id="race-select" value={race} onChange={(e) => setRace(e.target.value)}>
              {RACE_KEYS.map((k) => (
                <option key={k} value={k}>
                  {RACES[k].label}
                </option>
              ))}
              <option value="random">Random</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="class-select">Class</label>
            <select id="class-select" value={cls} onChange={(e) => setCls(e.target.value)}>
              {CLASS_KEYS.map((k) => (
                <option key={k} value={k}>
                  {CLASSES[k].label}
                </option>
              ))}
              <option value="random">Random</option>
            </select>
          </div>

          <h2 style={{ marginTop: '26px' }}>Name Parts</h2>
          <div className="toggles">
            <label className="toggle">
              <input type="checkbox" checked={opts.first} onChange={() => toggle('first')} />
              <span>First name</span>
            </label>
            <label className="toggle">
              <input type="checkbox" checked={opts.middle} onChange={() => toggle('middle')} />
              <span>Middle name</span>
            </label>
            <label className="toggle">
              <input type="checkbox" checked={opts.surname} onChange={() => toggle('surname')} />
              <span>Surname</span>
            </label>
            <label className="toggle">
              <input type="checkbox" checked={opts.title} onChange={() => toggle('title')} />
              <span>Title</span>
            </label>
          </div>

          <h2 style={{ marginTop: '26px' }}>Complexity</h2>
          <div className="field" style={{ marginBottom: '8px' }}>
            <div className="complexity-row">
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={complexity}
                onChange={(e) => setComplexity(Number(e.target.value))}
                className="complexity-slider"
                aria-label="Name complexity"
              />
              <span className="complexity-value">{COMPLEXITY_LABELS[complexity - 1]}</span>
            </div>
            <div className="complexity-ticks">
              {COMPLEXITY_LABELS.map((label, i) => (
                <span key={label} className={i + 1 === complexity ? 'active' : ''}>
                  {i + 1}
                </span>
              ))}
            </div>
          </div>

          <p className="hint">
            {opts.title
              ? 'Every part is forged fresh from themed sound-fragments — race shapes first, middle, and surnames; class shapes the epithet, in the manner of "Name, the Ashenblade." Complexity controls how many syllables and fragments are fused together.'
              : 'Every part is forged fresh from themed sound-fragments each time, so no two names are quite alike. Complexity controls how many syllables and fragments are fused together.'}
          </p>
        </div>

        <div className="stage">
          <div className={`scroll${reveal ? ' reveal' : ''}`}>
            {current && current.full && (
              <button
                className={`pin-btn${isPinned(current.id) ? ' pinned' : ''}`}
                onClick={() => togglePin(current)}
                aria-label={isPinned(current.id) ? 'Unpin this name' : 'Pin this name'}
                title={isPinned(current.id) ? 'Unpin' : 'Pin for safekeeping'}
              >
                <PinIcon filled={isPinned(current.id)} />
              </button>
            )}
            <div className="kicker">{kicker}</div>
            {current && current.full ? (
              <div className="name">{current.full}</div>
            ) : (
              <div className="placeholder">
                {anySelected ? 'Strike the seal to forge a name' : 'Choose at least one name part'}
              </div>
            )}
          </div>

          <div className="seal-wrap">
            <button
              className="seal"
              onClick={generate}
              disabled={!anySelected}
              style={!anySelected ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
              aria-label="Generate name"
            >
              FORGE
            </button>
          </div>

          <div className="ledger">
            <h3>Recently Forged</h3>
            {history.length ? (
              <ul className="ledger-list">
                {history.map((item) => (
                  <li key={item.id}>
                    <span className="lname">{item.full || '(empty)'}</span>
                    <span className="ltag">
                      {item.raceLabel} {item.classLabel}
                    </span>
                    <button
                      className={`row-pin${isPinned(item.id) ? ' pinned' : ''}`}
                      onClick={() => togglePin(item)}
                      aria-label={isPinned(item.id) ? 'Unpin this name' : 'Pin this name'}
                      title={isPinned(item.id) ? 'Unpin' : 'Pin for safekeeping'}
                    >
                      <PinIcon filled={isPinned(item.id)} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-ledger">Names you forge will be recorded here.</div>
            )}
          </div>

          <div className="ledger pinned-ledger">
            <h3>Pinned</h3>
            {pinned.length ? (
              <ul className="ledger-list">
                {pinned.map((item) => (
                  <li key={item.id}>
                    <span className="lname">{item.full || '(empty)'}</span>
                    <span className="ltag">
                      {item.raceLabel} {item.classLabel}
                    </span>
                    <button
                      className="row-pin pinned"
                      onClick={() => unpin(item.id)}
                      aria-label="Unpin this name"
                      title="Unpin"
                    >
                      <PinIcon filled={true} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-ledger">
                Pin a name to keep it safe — pinned names are saved in this browser and will still be here next
                time.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
