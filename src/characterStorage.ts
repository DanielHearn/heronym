import type { CharacterHookData } from './components/CharacterHook'
import type { FamilyTreeMember } from './components/FamilyTree'

const STORAGE_KEY = 'heronym:character-details:v1'
const STORAGE_VERSION = 1

export type CharacterDetails = {
  backstory?: string
  characterHook?: CharacterHookData
  familyTree?: FamilyTreeMember[]
}

type CharacterDetailsStore = {
  version: 1
  characters: Record<string, CharacterDetails>
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isCharacterHook(value: unknown): value is CharacterHookData {
  return (
    isRecord(value) &&
    typeof value.hook === 'string' &&
    typeof value.motivation === 'string' &&
    typeof value.flaw === 'string' &&
    typeof value.secret === 'string'
  )
}

function isFamilyTreeMember(value: unknown): value is FamilyTreeMember {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.relationship === 'string' &&
    typeof value.details === 'string' &&
    typeof value.generation === 'number' &&
    Array.isArray(value.parentIds) &&
    value.parentIds.every((parentId) => typeof parentId === 'string') &&
    typeof value.surname === 'string'
  )
}

function parseStore(raw: string): CharacterDetailsStore | null {
  const parsed: unknown = JSON.parse(raw)
  if (!isRecord(parsed) || parsed.version !== STORAGE_VERSION || !isRecord(parsed.characters)) {
    console.warn('Character details were not loaded: unsupported or invalid storage version.')
    return null
  }

  const characters: Record<string, CharacterDetails> = {}
  Object.entries(parsed.characters).forEach(([name, value]) => {
    if (!isRecord(value)) return

    const details: CharacterDetails = {}
    if (typeof value.backstory === 'string') details.backstory = value.backstory
    if (isCharacterHook(value.characterHook)) details.characterHook = value.characterHook
    if (Array.isArray(value.familyTree) && value.familyTree.every(isFamilyTreeMember)) {
      details.familyTree = value.familyTree
    }
    characters[name] = details
  })

  return { version: STORAGE_VERSION, characters }
}

function readStore(): CharacterDetailsStore | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? parseStore(raw) : { version: STORAGE_VERSION, characters: {} }
  } catch (error) {
    console.warn('Character details could not be read from local storage.', error)
    return null
  }
}

export function loadCharacterDetails(name: string): CharacterDetails {
  if (!name) return {}
  return readStore()?.characters[name] ?? {}
}

export function saveCharacterDetails(name: string, updates: CharacterDetails): void {
  if (!name || !Object.values(updates).some((value) => value !== undefined)) return

  const store = readStore()
  if (!store) return

  const details = { ...store.characters[name] }
  if (updates.backstory !== undefined) details.backstory = updates.backstory
  if (updates.characterHook !== undefined) details.characterHook = updates.characterHook
  if (updates.familyTree !== undefined) details.familyTree = updates.familyTree
  store.characters[name] = details

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch (error) {
    console.warn('Character details could not be saved to local storage.', error)
  }
}
