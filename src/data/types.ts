// Shared shapes for theme data.
//
// Every theme supplies a `lineage` bank — this is what actually drives the
// phonology (first/middle names) and the surname compound, so it's required.
// A `calling` bank is optional: it only feeds the title epithet
// (", the Ironclad"), and some themes won't want that axis at all. When a
// theme omits `calling`, the UI drops the Calling dropdown and the Title
// toggle entirely instead of showing a dropdown that has nothing to offer.

export type SyllBank = {
  onsets: string[]
  vowels: string[]
  codas: string[]
  min: number
  max: number
  codaChance: number
}

export type CompoundBank = {
  prefixes: string[]
  suffixes: string[]
}

export type LineageEntry = {
  label: string
  syll: SyllBank
  surname: CompoundBank
}

export type CallingEntry = {
  label: string
  title: CompoundBank
}

export type Theme = {
  label: string
  // Display label for the lineage dropdown — "Race", "Origin", "Culture",
  // whatever fits the theme.
  lineageLabel: string
  lineage: Record<string, LineageEntry>
  // Omit both of these for a theme that has no second axis at all.
  callingLabel?: string
  calling?: Record<string, CallingEntry>
}
