import { useState, useMemo, useEffect } from 'react'
import { THEMES, THEME_KEYS } from './data'
import { buildName, makeId } from './generator'
import PinIcon from './components/PinIcon'
import FieldSelect from './components/FieldSelect'
import ToggleGroup from './components/ToggleGroup'
import ComplexityControl from './components/ComplexityControl'
import Ledger, { type LedgerItem } from './components/Ledger'

// Bumped: pinned-name shape changed (raceLabel/classLabel -> lineageLabel/
// callingLabel), so old stored pins wouldn't match the new type anyway.
const PIN_STORAGE_KEY = 'heronym:pinned:v2'

type NameOptions = {
  first: boolean
  middle: boolean
  surname: boolean
  title: boolean
}

type NameEntry = LedgerItem & {
  id: string
  full: string
  lineageLabel: string
  callingLabel: string | null
}

export default function App() {
  const [theme, setTheme] = useState<string>('fantasy')
  const themeData = THEMES[theme]
  const lineageKeys = Object.keys(themeData.lineage)
  const callingKeys = themeData.calling ? Object.keys(themeData.calling) : []

  const [lineage, setLineage] = useState<string>('random')
  const [calling, setCalling] = useState<string>('random')
  const [opts, setOpts] = useState<NameOptions>({
    first: true,
    middle: false,
    surname: true,
    title: false,
  })
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
  const [complexity, setComplexity] = useState(1)
  const [optionsOpen, setOptionsOpen] = useState(true)
  const isMobile = useMemo(() => window.innerWidth <= 760, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(pinned))
    } catch {
      // storage unavailable (private browsing, quota, etc.) — pins just won't persist
    }
  }, [pinned])

  useEffect(() => {
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, lineage, calling, opts, complexity])

  const anySelected = opts.first || opts.middle || opts.surname || opts.title

  function changeTheme(themeKey: string) {
    const nextTheme = THEMES[themeKey]
    setTheme(themeKey)
    setLineage('random')
    setCalling('random')
    if (!nextTheme.calling) {
      setOpts((o) => (o.title ? { ...o, title: false } : o))
    }
  }

  function toggle(key: keyof NameOptions) {
    setOpts((o) => ({ ...o, [key]: !o[key] }))
  }

  function generate() {
    if (!anySelected) return
    const result: NameEntry = {
      ...buildName(theme, lineage, themeData.calling ? calling : null, opts, complexity),
      id: makeId(),
    }
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
      p.some((x) => x.id === item.id)
        ? p.filter((x) => x.id !== item.id)
        : [item as NameEntry, ...p],
    )
  }
  function unpin(id: string) {
    setPinned((p) => p.filter((x) => x.id !== id))
  }

  const kicker = useMemo(() => {
    if (!current) return 'a name awaits the forge'
    return current.callingLabel
      ? `${current.lineageLabel} \u00B7 ${current.callingLabel}`
      : current.lineageLabel
  }, [current])

  return (
    <div className="wrap">
      <div className="masthead">
        <h1>Heronym</h1>
        <p>A generator of names for heroes, villains, and everyone between</p>
      </div>

      <div className="layout">
        <div className="panel">
          <div className="panel-heading">
            <h2>Lineage &amp; Calling</h2>
            <button
              className="options-toggle"
              type="button"
              aria-expanded={optionsOpen}
              onClick={() => setOptionsOpen((open) => !open)}
            >
              {optionsOpen ? 'Hide options' : 'Show options'}
            </button>
          </div>

          <div className={`options-content${optionsOpen ? '' : ' collapsed'}`}>
            <FieldSelect
              id="theme-select"
              label="Theme"
              value={theme}
              options={THEME_KEYS.map((k) => ({ value: k, label: THEMES[k].label }))}
              onChange={(e) => changeTheme(e.target.value)}
            />

            <FieldSelect
              id="lineage-select"
              label={themeData.lineageLabel}
              value={lineage}
              options={[
                ...lineageKeys.map((k) => ({ value: k, label: themeData.lineage[k].label })),
                { value: 'random', label: 'Random' },
              ]}
              onChange={(e) => setLineage(e.target.value)}
            />

            {themeData.calling && (
              <FieldSelect
                id="calling-select"
                label={themeData.callingLabel ?? 'Calling'}
                value={calling}
                options={[
                  ...callingKeys.map((k) => ({ value: k, label: themeData.calling![k].label })),
                  { value: 'random', label: 'Random' },
                ]}
                onChange={(e) => setCalling(e.target.value)}
              />
            )}

            <h2 style={{ marginTop: '26px' }}>Name Parts</h2>
            <ToggleGroup opts={opts} onToggle={toggle} titleEnabled={!!themeData.calling} />

            <h2 style={{ marginTop: '26px' }}>Complexity</h2>
            <ComplexityControl value={complexity} max={3} onChange={setComplexity} />

            <p className="hint">Controls how many syllables and fragments are fused together</p>
          </div>
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
              Generate
            </button>
          </div>

          <Ledger
            title="Recently Generated"
            items={history}
            isPinned={isPinned}
            onTogglePin={togglePin}
            emptyText="Names you generate will be recorded here"
            maxItems={isMobile ? 4 : 8}
          />

          <Ledger
            title="Pinned"
            items={pinned}
            isPinned={isPinned}
            onUnpin={unpin}
            emptyText="Pin a name to keep it safe"
            className="pinned-ledger"
          />
        </div>
      </div>
    </div>
  )
}
