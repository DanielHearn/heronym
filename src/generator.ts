import { THEMES } from './data'
import type { LineageEntry, CallingEntry } from './data/types'

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10)
}

function forgeSyllable(bank) {
  let s = pick(bank.onsets) + pick(bank.vowels)
  if (Math.random() < bank.codaChance) s += pick(bank.codas)
  return s
}

export function syllableRange(bank, complexity) {
  const offset = complexity - 3 // complexity 1..5, 3 is each lineage's natural baseline
  const min = Math.max(1, bank.min + offset)
  const max = Math.min(8, Math.max(min, bank.max + offset))
  return [min, max]
}

export function forgePersonalName(bank, avoid, complexity) {
  const [minS, maxS] = syllableRange(bank, complexity)
  for (let attempt = 0; attempt < 6; attempt++) {
    const n = randInt(minS, maxS)
    let s = ''
    for (let i = 0; i < n; i++) s += forgeSyllable(bank)
    const name = capitalize(s)
    if (name !== avoid) return name
  }
  return capitalize(pick(bank.onsets) + pick(bank.vowels) + pick(bank.codas))
}

export function forgeCompound(bank, complexity) {
  // complexity 1: root only; 2-3: root + tail; 4-5: extra root fragment(s) chained in
  const extra = Math.max(0, complexity - 3)
  let s = pick(bank.prefixes)
  for (let i = 0; i < extra; i++) s += pick(bank.prefixes).toLowerCase()
  if (complexity <= 1) return s
  s += pick(bank.suffixes).toLowerCase()
  return s
}

type NameOptions = {
  first: boolean
  middle: boolean
  surname: boolean
  title: boolean
}

export function buildName(
  themeKey: string,
  lineageKey: string,
  callingKey: string | null,
  opts: NameOptions,
  complexity: number,
) {
  const theme = THEMES[themeKey]

  const lineageKeys = Object.keys(theme.lineage)
  const lKey = lineageKey === 'random' ? pick(lineageKeys) : lineageKey
  const lineage: LineageEntry = theme.lineage[lKey]

  const callingKeys = theme.calling ? Object.keys(theme.calling) : []
  const cKey = theme.calling ? (callingKey === 'random' || !callingKey ? pick(callingKeys) : callingKey) : null
  const calling: CallingEntry | null = theme.calling && cKey ? theme.calling[cKey] : null

  let first: string | null = null
  let middle: string | null = null
  let surname: string | null = null
  let title: string | null = null
  const parts: string[] = []

  if (opts.first) {
    first = forgePersonalName(lineage.syll, null, complexity)
    parts.push(first)
  }
  if (opts.middle) {
    middle = forgePersonalName(lineage.syll, first, complexity)
    parts.push(middle)
  }
  if (opts.surname) {
    surname = forgeCompound(lineage.surname, complexity)
    parts.push(surname)
  }

  const base = parts.join(' ')
  let full

  // Title only ever generates when the theme actually has a calling axis.
  if (opts.title && calling) {
    title = forgeCompound(calling.title, complexity)
    full = base ? `${base}, the ${title}` : `The ${title}`
  } else {
    full = base
  }

  return {
    full: full || '',
    lineageLabel: lineage.label,
    callingLabel: calling ? calling.label : null,
    key: `${lKey}-${cKey ?? 'none'}`,
  }
}
