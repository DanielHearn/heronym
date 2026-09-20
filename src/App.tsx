import { useState, useMemo, useEffect } from 'react'
import { RACES, CLASSES, RACE_KEYS, CLASS_KEYS, type RaceKey, type ClassKey } from './data'
import { buildName, makeId } from './generator'
import PinIcon from './components/PinIcon'
import FieldSelect from './components/FieldSelect'
import ToggleGroup from './components/ToggleGroup'
import ComplexityControl from './components/ComplexityControl'
import Ledger, { type LedgerItem } from './components/Ledger'

const PIN_STORAGE_KEY = 'heronym:pinned:v1'

type NameOptions = {
  first: boolean
  middle: boolean
  surname: boolean
  title: boolean
}

type NameEntry = LedgerItem & {
  id: string
  full: string
  raceLabel: string
  classLabel: string
}

export default function App() {
  const [race, setRace] = useState<RaceKey | 'random'>('human')
  const [cls, setCls] = useState<ClassKey | 'random'>('warrior')
  const [opts, setOpts] = useState<NameOptions>({ first: true, middle: false, surname: true, title: false })
  const [current, setCurrent] = useState<NameEntry | null>(null)
  const [history, setHistory] = useState<NameEntry[]>([])
  const [pinned, setPinned] = useState<NameEntry[]>(() => {
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

  function toggle(key: keyof NameOptions) {
    setOpts((o) => ({ ...o, [key]: !o[key] }))
  }

  function generate() {
    if (!anySelected) return
    const result: NameEntry = { ...buildName(race, cls, opts, complexity), id: makeId() }
    setCurrent(result)
    setHistory((hist) => [result, ...hist].slice(0, 8))
    setReveal(false)
    requestAnimationFrame(() => setReveal(true))
  }

  function isPinned(id: string) {
    return pinned.some((p) => p.id === id)
  }
  function togglePin(item: LedgerItem | null | undefined) {
    if (!item || !item.full) return
    setPinned((p) =>
      p.some((x) => x.id === item.id) ? p.filter((x) => x.id !== item.id) : [item as NameEntry, ...p],
    )
  }
  function unpin(id: string) {
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

          <FieldSelect
            id="race-select"
            label="Race"
            value={race}
            options={[
              ...RACE_KEYS.map((k) => ({ value: k, label: RACES[k].label })),
              { value: 'random', label: 'Random' },
            ]}
            onChange={(e) => setRace(e.target.value)}
          />

          <FieldSelect
            id="class-select"
            label="Class"
            value={cls}
            options={[
              ...CLASS_KEYS.map((k) => ({ value: k, label: CLASSES[k].label })),
              { value: 'random', label: 'Random' },
            ]}
            onChange={(e) => setCls(e.target.value)}
          />

          <h2 style={{ marginTop: '26px' }}>Name Parts</h2>
          <ToggleGroup opts={opts} onToggle={toggle} />

          <h2 style={{ marginTop: '26px' }}>Complexity</h2>
          <ComplexityControl value={complexity} onChange={setComplexity} />

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

          <Ledger
            title="Recently Forged"
            items={history}
            isPinned={isPinned}
            onTogglePin={togglePin}
            emptyText="Names you forge will be recorded here."
          />

          <Ledger
            title="Pinned"
            items={pinned}
            isPinned={isPinned}
            onUnpin={unpin}
            emptyText="Pin a name to keep it safe — pinned names are saved in this browser and will still be here next time."
            className="pinned-ledger"
          />
        </div>
      </div>
    </div>
  )
}
