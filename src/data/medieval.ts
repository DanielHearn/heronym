import type { Theme } from './types'

// Deliberately no `callingLabel` / `calling` here — this is the example
// theme for "a Class-style dropdown doesn't always make sense." A grounded
// historical-medieval generator doesn't need a fantasy-style epithet axis,
// so the Calling dropdown and the Title toggle simply won't render for it.
// (Nothing stops a later theme from having calling — this one just shows
// the omit-it path works.)

export const medieval: Theme = {
  label: 'Medieval',
  lineageLabel: 'Culture',
  lineage: {
    anglo: {
      label: 'Anglo-Saxon',
      syll: {
        onsets: ['b', 'c', 'd', 'w', 'wulf', 'aed', 'ead', 'os', 'al', 'br', ''],
        vowels: ['a', 'e', 'i', 'o', 'ae'],
        codas: ['ric', 'wine', 'wald', 'helm', 'mund', 'gar', 'beorht'],
        min: 2,
        max: 3,
        codaChance: 0.6,
      },
      surname: {
        prefixes: ['Wood', 'Field', 'Church', 'Hollow', 'Marsh', 'Stone', 'Elm'],
        suffixes: ['ton', 'ham', 'stead', 'wick', 'ford', 'combe', 'don'],
      },
    },
    norman: {
      label: 'Norman',
      syll: {
        onsets: ['g', 'r', 'b', 'h', 'j', 'ger', 'rob', 'gil', 'hu', ''],
        vowels: ['a', 'e', 'o', 'ie', 'ou'],
        codas: ['ard', 'bert', 'mond', 'fred', 'las', 'ric'],
        min: 2,
        max: 3,
        codaChance: 0.55,
      },
      surname: {
        prefixes: ['De', 'Fitz', 'Mont', 'Beau', 'Sainte', 'Ville'],
        suffixes: ['court', 'vil', 'mont', 'val', 'bois', 'champ'],
      },
    },
  },
}
