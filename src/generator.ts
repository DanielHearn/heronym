export function buildName(
  themeKey: string,
  lineageKey: string,
  callingKey: string | null,
  opts: NameOptions,
  complexity: number,
  lockedParts: LockedNameParts = {},
) {
  const theme = THEMES[themeKey]

  const lineageKeys = Object.keys(theme.lineage)
  // Fall back to a random key if the requested one doesn't exist in this
  // theme (e.g. a stale key carried over from a different theme).
  const lKey =
    lineageKey === 'random' || !theme.lineage[lineageKey]
      ? pick(lineageKeys)
      : lineageKey
  const lineage: LineageEntry = theme.lineage[lKey]

  const callingKeys = theme.calling ? Object.keys(theme.calling) : []
  const cKey = theme.calling
    ? callingKey === 'random' || !callingKey || !theme.calling[callingKey]
      ? pick(callingKeys)
      : callingKey
    : null
  const calling: CallingEntry | null = theme.calling && cKey ? theme.calling[cKey] : null

  let first: string | null = null
  let middle: string | null = null
  let surname: string | null = null
  let title: string | null = null
  const parts: string[] = []

  if (opts.first) {
    first = lockedParts.first?.value ?? forgePersonalName(lineage.syll, null, complexity)
    parts.push(first)
  }
  if (opts.middle) {
    middle = lockedParts.middle?.value ?? forgePersonalName(lineage.syll, first, complexity)
    parts.push(middle)
  }
  if (opts.surname) {
    surname = lockedParts.surname?.value ?? forgeCompound(lineage.surname, complexity)
    parts.push(surname)
  }

  const base = parts.join(' ')
  let full

  // Title only ever generates when the theme actually has a calling axis.
  if (opts.title && calling) {
    title = lockedParts.title?.value ?? forgeCompound(calling.title, complexity)
    full = base ? `${base}, the ${title}` : `The ${title}`
  } else {
    full = base
  }

  return {
    full: full || '',
    lineageLabel: lineage.label,
    callingLabel: calling ? calling.label : null,
    key: `${lKey}-${cKey ?? 'none'}`,
    parts: { first, middle, surname, title },
  }
}