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
        onsets: ['b', 'c', 'd', 'w', 'wulf', 'aed', 'ead', 'os', 'al', 'br', 'aelf', 'cyne', 'ed', 'leof', 'sae', ''],
        vowels: ['a', 'e', 'i', 'o', 'ae', 'u', 'ea', 'y'],
        codas: ['ric', 'wine', 'wald', 'helm', 'mund', 'gar', 'beorht', 'stan', 'weard', 'frith', 'sige', 'here'],
        min: 2,
        max: 3,
        codaChance: 0.6,
      },
      surname: {
        prefixes: ['Wood', 'Field', 'Church', 'Hollow', 'Marsh', 'Stone', 'Elm', 'Ash', 'Alder', 'Brook', 'Thorn', 'West', 'East'],
        suffixes: ['ton', 'ham', 'stead', 'wick', 'ford', 'combe', 'don', 'ley', 'hurst', 'mere', 'well', 'by'],
      },
    },
    norman: {
      label: 'Norman',
      syll: {
        onsets: ['g', 'r', 'b', 'h', 'j', 'ger', 'rob', 'gil', 'hu', 'al', 'ber', 'con', 'ful', 'ma', ''],
        vowels: ['a', 'e', 'o', 'ie', 'ou', 'i', 'u', 'ai', 'ei'],
        codas: ['ard', 'bert', 'mond', 'fred', 'las', 'ric', 'fray', 'gar', 'mont', 'lin', 'wine'],
        min: 2,
        max: 3,
        codaChance: 0.55,
      },
      surname: {
        prefixes: ['De', 'Fitz', 'Mont', 'Beau', 'Sainte', 'Ville', 'Chateau', 'Belle', 'La', 'D', 'Clair', 'Val'],
        suffixes: ['court', 'vil', 'mont', 'val', 'bois', 'champ', 'fort', 'fleur', 'mere', 'fontaine', 'garde'],
      },
    },
  },
}
