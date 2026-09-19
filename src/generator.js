import { RACES, CLASSES, RACE_KEYS, CLASS_KEYS } from './data.js'

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
  const offset = complexity - 3 // complexity 1..5, 3 is each race's natural baseline
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

export function buildName(raceKey, classKey, opts, complexity) {
  const rKey = raceKey === 'random' ? pick(RACE_KEYS) : raceKey
  const cKey = classKey === 'random' ? pick(CLASS_KEYS) : classKey
  const race = RACES[rKey]
  const cls = CLASSES[cKey]

  let first = null
  let middle = null
  let surname = null
  let title = null
  const parts = []

  if (opts.first) {
    first = forgePersonalName(race.syll, null, complexity)
    parts.push(first)
  }
  if (opts.middle) {
    middle = forgePersonalName(race.syll, first, complexity)
    parts.push(middle)
  }
  if (opts.surname) {
    surname = forgeCompound(race.surname, complexity)
    parts.push(surname)
  }

  const base = parts.join(' ')
  let full

  if (opts.title) {
    title = forgeCompound(cls.title, complexity)
    full = base ? `${base}, the ${title}` : `The ${title}`
  } else {
    full = base
  }

  return { full: full || '', raceLabel: race.label, classLabel: cls.label, key: `${rKey}-${cKey}` }
}
