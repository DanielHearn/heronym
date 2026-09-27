import type { Theme } from './types'
import { fantasy } from './fantasy'
import { scifi } from './scifi'
import { medieval } from './medieval'

export * from './types'

// Add a theme by creating its file (see fantasy.ts / scifi.ts / medieval.ts
// for the pattern) and adding one line here — nothing else needs to change.
export const THEMES: Record<string, Theme> = {
  fantasy,
  scifi,
  medieval,
}

export const THEME_KEYS = Object.keys(THEMES)
