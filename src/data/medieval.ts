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
    norse: {
      label: 'Norse',
      syll: {
        onsets: ['b', 'g', 'h', 'k', 'r', 's', 't', 'th', 'sv', 'ul', 'ar', 'bj', 'sig', 'ha', 'fr', 'ing', ''],
        vowels: ['a', 'i', 'o', 'u', 'e', 'y', 'ei', 'au', 'jo'],
        codas: ['r', 'nd', 'rik', 'ulf', 'mund', 'gar', 'bjorn', 'vald', 'ketil', 'gunn', 'fred', 'stein'],
        min: 2,
        max: 3,
        codaChance: 0.6,
      },
      surname: {
        prefixes: ['Sig', 'Thor', 'Hrafn', 'Ulf', 'Gunn', 'Ing', 'Stein', 'Frey', 'Bjorn', 'Haf', 'Storm', 'Eir'],
        suffixes: ['sen', 'son', 'dottir', 'by', 'thorp', 'vik', 'fjord', 'holm', 'dal', 'stad', 'berg', 'ness'],
      },
    },
    gaelic: {
      label: 'Gaelic',
      syll: {
        onsets: ['b', 'c', 'd', 'f', 'g', 'l', 'm', 'n', 'r', 's', 't', 'ch', 'fionn', 'ciar', 'dar', 'bran', 'ruad', 'ea', 'eo', 'con', ''],
        vowels: ['a', 'e', 'i', 'o', 'u', 'ai', 'ia', 'ea', 'ui', 'io'],
        codas: ['n', 'r', 'l', 'ch', 'dh', 'an', 'in', 'ach', 'ogh', 'ran'],
        min: 2,
        max: 3,
        codaChance: 0.55,
      },
      surname: {
        prefixes: ['Mac', 'O', 'Mc', 'Ui', 'Glen', 'Ben', 'Dun', 'Kil', 'Inver', 'Ard', 'Ros', 'Bally'],
        suffixes: ['an', 'ain', 'egan', 'ach', 'ock', 'rath', 'more', 'ard', 'mara', 'dhu', 'ly'],
      },
    },
    welsh: {
      label: 'Welsh',
      syll: {
        onsets: ['b', 'c', 'd', 'g', 'm', 'n', 'p', 'r', 't', 'll', 'gw', 'rh', 'cad', 'bryn', 'owen', 'myr', 'gwyn', ''],
        vowels: ['a', 'e', 'i', 'o', 'u', 'y', 'ae', 'wy', 'ai', 'au'],
        codas: ['wyn', 'ydd', 'dd', 'gan', 'll', 'aith', 'dor', 'fan', 'ion'],
        min: 2,
        max: 3,
        codaChance: 0.55,
      },
      surname: {
        prefixes: ['Ap', 'Pen', 'Llan', 'Cwm', 'Glyn', 'Tre', 'Bryn', 'Coed', 'Caer', 'Mynydd', 'Gwyn'],
        suffixes: ['wyn', 'ddu', 'fa', 'mawr', 'ydd', 'ton', 'bach', 'coed', 'ffynnon', 'dyn'],
      },
    },
    frankish: {
      label: 'Frankish',
      syll: {
        onsets: ['c', 'ch', 'd', 'f', 'g', 'h', 'l', 'r', 't', 'w', 'b', 'hil', 'lud', 'ber', 'gun', 'hro', 'wal'],
        vowels: ['a', 'e', 'i', 'o', 'u', 'ai', 'ei', 'au', 'ie', 'oi'],
        codas: ['bert', 'ric', 'hard', 'wig', 'gar', 'frid', 'hild', 'lind', 'win', 'bald', 'ulf', 'mar', 'ruth'],
        min: 2,
        max: 3,
        codaChance: 0.6,
      },
      surname: {
        prefixes: ['Carol', 'Mero', 'Ber', 'Chlod', 'Lud', 'Rhein', 'Saal', 'Wald', 'Hoch', 'Eber', 'Hard'],
        suffixes: ['ing', 'ung', 'heim', 'burg', 'feld', 'hart', 'berg', 'wald', 'dorf', 'bach', 'inger'],
      },
    },
    castilian: {
      label: 'Castilian',
      syll: {
        onsets: ['b', 'c', 'd', 'f', 'g', 'j', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'll', 'ñ', 'fern', 'alf', 'gon', 'ped', 'rod', 'sanc', 'ram', ''],
        vowels: ['a', 'e', 'i', 'o', 'u', 'ia', 'ie', 'io', 'ue', 'ai'],
        codas: ['o', 'ez', 'ando', 'ino', 'ero', 'ique', 'uel', 'iz', 'ón'],
        min: 2,
        max: 3,
        codaChance: 0.5,
      },
      surname: {
        prefixes: ['De', 'Ruiz', 'Gil', 'Vega', 'Monte', 'Sierra', 'Castro', 'Villa', 'Torre', 'Puente', 'Campo', 'Alta'],
        suffixes: ['ez', 'ara', 'ada', 'illa', 'ales', 'eda', 'ero', 'ar', 'uelo', 'illa', 'ando'],
      },
    },
    lombard: {
      label: 'Lombard',
      syll: {
        onsets: ['b', 'c', 'd', 'f', 'g', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'gu', 'ar', 'bert', 'aldo', 'gis', 'ger', 'fo', 'sta', ''],
        vowels: ['a', 'e', 'i', 'o', 'u', 'ia', 'ie', 'io', 'ai', 'ei'],
        codas: ['o', 'ino', 'ardo', 'one', 'ulf', 'berto', 'aldo', 'ari', 'ezzo', 'ulo', 'ano'],
        min: 2,
        max: 3,
        codaChance: 0.55,
      },
      surname: {
        prefixes: ['Di', 'Da', 'Del', 'Della', 'Corte', 'Monte', 'Castel', 'Bella', 'Santo', 'Villa', 'Monti', 'Rocca'],
        suffixes: ['ini', 'etti', 'ello', 'one', 'ara', 'ano', 'ino', 'ardi', 'elli', 'anti', 'ola', 'ucci'],
      },
    },
    byzantine: {
      label: 'Byzantine',
      syll: {
        onsets: ['th', 'k', 'p', 'ph', 'ch', 'l', 'm', 'n', 's', 't', 'x', 'ar', 'kon', 'leo', 'nik', 'theo', 'dem', 'ioan', 'pa', 'ze'],
        vowels: ['a', 'e', 'i', 'o', 'u', 'ou', 'ai', 'ei', 'io', 'oi'],
        codas: ['os', 'is', 'ios', 'ides', 'ax', 'as', 'on', 'ilos', 'ikos'],
        min: 2,
        max: 3,
        codaChance: 0.5,
      },
      surname: {
        prefixes: ['Palai', 'Kom', 'Dou', 'Dra', 'Mega', 'Chry', 'Argy', 'Kala', 'Lam', 'Mavro', 'Pyr', 'Sper'],
        suffixes: ['opoulos', 'akis', 'ides', 'ikos', 'ilos', 'aris', 'idis', 'enos', 'akes', 'ianos'],
      },
    },
  },
}
