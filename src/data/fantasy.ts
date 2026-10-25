import type { Theme } from './types'

// This is the original RACES/CLASSES content from data.ts, restructured
// under the shared lineage/calling shape. Nothing about the generation
// logic changes for this theme — it's the same banks, same fusion rules.

export const fantasy: Theme = {
  label: 'Fantasy',
  lineageLabel: 'Race',
  callingLabel: 'Class',
  lineage: {
    human: {
      label: 'Human',
      syll: {
        onsets: [
          'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w',
          'br', 'cl', 'dr', 'fr', 'gr', 'st', 'th', 'wh', 'cr', 'fl', 'gl', 'pr', 'sw', 'tr', 'y', '',
        ],
        vowels: ['a', 'e', 'i', 'o', 'u', 'ae', 'io', 'ia', 'ay', 'ea', 'ei', 'el', 'or', 'ie'],
        codas: ['n', 'r', 'l', 's', 'd', 't', 'nd', 'rd', 'ric', 'wen', 'ton', 'mund', 'len', 'mar', 'wyn', 'ric', 'val', 'mere'],
        min: 2,
        max: 3,
        codaChance: 0.5,
      },
      surname: {
        prefixes: [
          'Ash', 'Black', 'Thorn', 'Winter', 'Hale', 'Fair', 'Sterling', 'Marl', 'Cross', 'Wynd',
          'Dela', 'Riven', 'Storm', 'Bright', 'Old', 'Fox', 'Raven', 'Red', 'Gold', 'Green', 'Oak',
        ],
        suffixes: [
          'ford', 'wood', 'thorne', 'ston', 'ridge', 'weather', 'cross', 'hall', 'den', 'croix',
          'field', 'worth', 'gate', 'moor', 'brook', 'well', 'mere', 'ley', 'bourne', 'barrow',
        ],
      },
    },
    elf: {
      label: 'Elf',
      syll: {
        onsets: ['th', 's', 'l', 'n', 'c', 'v', 'f', 'el', 'sil', 'cal', 'gal', 'mir', 'nim', 'fae', 'lor', 'ael', 'ith', 'lyr', 'sel', ''],
        vowels: ['a', 'ae', 'i', 'ie', 'ei', 'io', 'y', 'ia', 'e', 'ui', 'ea'],
        codas: ['l', 'n', 'r', 'th', 'rel', 'wen', 'dor', 'las', 'riel', 'lith', 'ra', 'viel'],
        min: 2,
        max: 3,
        codaChance: 0.55,
      },
      surname: {
        prefixes: [
          'Moon', 'Star', 'Silver', 'Dusk', 'Night', 'Sun', 'Ember', 'Frost', 'Wind', 'Thorn',
          'Even', 'Mist', 'Dawn', 'Shadow', 'Willow', 'River', 'Luna', 'Silverleaf', 'Green', 'Pearl',
        ],
        suffixes: [
          'whisper', 'fall', 'leaf', 'runner', 'bloom', 'ward', 'wood', 'vale', 'rider', 'weave',
          'star', 'glade', 'bough', 'brook', 'song', 'glen', 'breeze', 'dell',
        ],
      },
    },
    dwarf: {
      label: 'Dwarf',
      syll: {
        onsets: ['b', 'd', 'g', 'k', 'gr', 'br', 'dr', 'kr', 'th', 'st', 'bal', 'thor', 'dur', 'grim', 'kor', 'or', 'bar', 'brok', 'dwal', 'far', 'thra'],
        vowels: ['a', 'o', 'u', 'or', 'ur', 'ai', 'au', 'ei'],
        codas: ['k', 'g', 'd', 'n', 'm', 'r', 'rik', 'grim', 'dun', 'gar', 'bek', 'din', 'drum', 'grim', 'mar'],
        min: 2,
        max: 3,
        codaChance: 0.75,
      },
      surname: {
        prefixes: [
          'Iron', 'Stone', 'Anvil', 'Deep', 'Battle', 'Coal', 'Ember', 'Hammer', 'Steel',
          'Granite', 'Gold', 'Grim', 'Copper', 'Cinder', 'Frost', 'Red', 'Bronze', 'Oak',
        ],
        suffixes: [
          'fist', 'beard', 'heart', 'delver', 'hammer', 'forge', 'fall', 'shanks', 'hide', 'jaw',
          'vein', 'hold', 'helm', 'mantle', 'delve', 'shield', 'stone',
        ],
      },
    },
    orc: {
      label: 'Orc',
      syll: {
        onsets: ['g', 'k', 'z', 'v', 'x', 'gr', 'kr', 'vr', 'zg', 'ug', 'mor', 'thok', 'drak', 'gar', 'gor', 'rak', 'snar', 'urg'],
        vowels: ['a', 'u', 'o', 'ak', 'ug', 'ash', 'û', 'â'],
        codas: ['k', 'g', 'sh', 'z', 'gh', 'nak', 'gash', 'rok', 'zog', 'th', 'rag', 'muk', 'gar'],
        min: 2,
        max: 2,
        codaChance: 0.85,
      },
      surname: {
        prefixes: ['Blood', 'Skull', 'Iron', 'Bone', 'Death', 'Rage', 'War', 'Grim', 'Ash', 'Black', 'Doom', 'Gore', 'Crag', 'Ruin', 'Dire', 'Fell'],
        suffixes: ['fang', 'crusher', 'jaw', 'grip', 'fist', 'hide', 'tusk', 'howl', 'hold', 'bane', 'maw', 'scar', 'breaker', 'rend', 'snarl'],
      },
    },
    halfling: {
      label: 'Halfling',
      syll: {
        onsets: ['b', 'p', 't', 'd', 'w', 'br', 'fl', 'gl', 'pl', 'tob', 'pip', 'mil', 'ros', 'dai', 'bim', 'cob', 'hob', 'merry', 'posy'],
        vowels: ['i', 'o', 'a', 'e', 'ie', 'oo', 'u', 'ea', 'ai'],
        codas: ['n', 'le', 'y', 'ot', 'in', 'kle', 'by', 'wick', 'berry', 'kin', 'wise', 'well'],
        min: 2,
        max: 3,
        codaChance: 0.55,
      },
      surname: {
        prefixes: [
          'Under', 'Good', 'Bramble', 'Green', 'Tea', 'Apple', 'Meadow', 'Honey', 'Thistle',
          'Fair', 'Puddle', 'Sweet', 'Bumble', 'Clover', 'Daisy', 'Hazel', 'Merry',
        ],
        suffixes: [
          'hill', 'barrel', 'ton', 'bottle', 'leaf', 'wick', 'lark', 'pot', 'down', 'barrow',
          'foot', 'grass', 'berry', 'bloom', 'burrow', 'button',
        ],
      },
    },
    gnome: {
      label: 'Gnome',
      syll: {
        onsets: ['f', 'z', 't', 'w', 'sp', 'fl', 'fr', 'tw', 'cog', 'zig', 'tob', 'niff', 'wren', 'bix', 'diz', 'fizz', 'gim', 'quill'],
        vowels: ['i', 'e', 'o', 'izz', 'ib', 'a', 'u', 'ee'],
        codas: ['ble', 'le', 'kle', 'wick', 'et', 'ix', 'ot', 'in', 'zzle', 'wink', 'bit', 'wick'],
        min: 2,
        max: 3,
        codaChance: 0.7,
      },
      surname: {
        prefixes: [
          'Cog', 'Gear', 'Spark', 'Bristle', 'Bellow', 'Tinker', 'Rustle', 'Wicker', 'Flare',
          'Piston', 'Copper', 'Dooh', 'Brass', 'Glimmer', 'Wobble', 'Button',
        ],
        suffixes: [
          'sprocket', 'whistle', 'wrench', 'cap', 'brass', 'top', 'bottom', 'spring', 'wick',
          'whirl', 'fizz', 'icket', 'gear', 'spark', 'bobbin',
        ],
      },
    },
    tiefling: {
      label: 'Tiefling',
      syll: {
        onsets: ['z', 'x', 'v', 'k', 'd', 'dr', 'kr', 'zh', 'vh', 'ash', 'mor', 'nyr', 'sel', 'vel', 'zar', 'mal', 'ith'],
        vowels: ['a', 'i', 'o', 'ae', 'y', 'io', 'e', 'ai', 'û'],
        codas: ['th', 'x', 'z', 'riel', 'mos', 'rak', 'oth', 'ar', 'vyr', 'zael', 'rith'],
        min: 2,
        max: 3,
        codaChance: 0.65,
      },
      surname: {
        prefixes: [
          'Dusk', 'Ash', 'Ember', 'Night', 'Cinder', 'Brim', 'Hell', 'Soul', 'Shadow', 'Sin',
          'Grim', 'Void', 'Vex', 'Doom', 'Black', 'Wicked',
        ],
        suffixes: [
          'mourne', 'born', 'kin', 'flame', 'wake', 'stone', 'ward', 'rend', 'mere', 'weaver',
          'horn', 'kiss', 'curse', 'veil', 'mark', 'wrath',
        ],
      },
    },
    dragonborn: {
      label: 'Dragonborn',
      syll: {
        onsets: ['dr', 'kr', 'thr', 'vr', 'zr', 'bh', 'rh', 'kas', 'vor', 'nyv', 'ith', 'tor', 'drav', 'khar', 'vrax', 'zora'],
        vowels: ['a', 'o', 'ae', 'ax', 'ex', 'i', 'ei', 'au'],
        codas: ['ath', 'ax', 'or', 'oth', 'rax', 'vex', 'thar', 'goth', 'drax', 'kesh', 'var'],
        min: 2,
        max: 3,
        codaChance: 0.8,
      },
      surname: {
        prefixes: [
          'Ash', 'Iron', 'Storm', 'Ember', 'Flame', 'Night', 'Blood', 'Thunder', 'Sun', 'Frost',
          'Coal', 'Dusk', 'Sky', 'Crimson', 'Obsidian', 'Rime',
        ],
        suffixes: [
          'scale', 'wing', 'claw', 'hide', 'born', 'crest', 'flight', 'fang', 'storm', 'tail',
          'maw', 'spire', 'heart', 'scale', 'crown', 'fury',
        ],
      },
    },
    halforc: {
      label: 'Half-Orc',
      syll: {
        onsets: ['g', 'k', 'v', 'dr', 'thr', 'kr', 'ash', 'mol', 'dren', 'kar', 'gor', 'ruk', 'thar', 'brak'],
        vowels: ['a', 'u', 'o', 'e', 'i', 'au'],
        codas: ['k', 'sh', 'g', 'nak', 'hide', 'gar', 'rok', 'th', 'dak', 'var'],
        min: 2,
        max: 2,
        codaChance: 0.75,
      },
      surname: {
        prefixes: [
          'Iron', 'Battle', 'Storm', 'Rock', 'Ash', 'Wolf', 'Black', 'Grim', 'Thorn', 'War',
          'Ridge', 'Hollow', 'Cinder', 'Fang', 'Oak', 'Thunder',
        ],
        suffixes: [
          'scar', 'born', 'hide', 'jaw', 'claw', 'bane', 'moor', 'hold', 'fang', 'axe', 'brand',
          'fell', 'break', 'maul', 'scar', 'heart',
        ],
      },
    },
    drow: {
      label: 'Drow',
      syll: {
        onsets: ['v', 'z', 'q', 'x', 'dr', 'sh', 'ny', 'zh', 'bel', 'kael', 'ryl', 'sos', 'phae', 'zha', 'vel', 'xal'],
        vowels: ['a', 'i', 'ae', 'io', 'y', 'e', 'ei', 'ui'],
        codas: ['ra', 'th', 'el', 'dra', 'rae', 'nyth', 'lith', 'ssra', 'vrae', 'zzin'],
        min: 2,
        max: 3,
        codaChance: 0.6,
      },
      surname: {
        prefixes: [
          'Dusk', 'Shadow', 'Night', 'Void', 'Black', 'Web', 'Nether', 'Spider', 'Umbra', 'Vael',
          'Malith', 'Ny', 'Sable', 'Silk', 'Gloom', 'Onyx',
        ],
        suffixes: [
          'blade', 'veil', 'shade', 'whisper', 'mourn', 'born', 'kiss', 'leaf', 'woven', 'thorne',
          'fall', 'reign', 'fang', 'spire', 'web', 'mourne',
        ],
      },
    },
    nightelf: {
      label: 'Night Elf',
      syll: {
        onsets: ['sh', 't', 'm', 'v', 'k', 'el', 'fen', 'ony', 'ash', 'or', 'ny', 'dor', 'fur', 'wyn', 'lun', 'thal', ''],
        vowels: ['a', 'i', 'e', 'o', 'y', 'ie', 'ae', 'ia', 'u', 'ei'],
        codas: ['n', 's', 'th', 'ra', 'dor', 'ien', 'wyn', 'ah', 'riel', 'dil', 'aris'],
        min: 2,
        max: 3,
        codaChance: 0.5,
      },
      surname: {
        prefixes: [
          'Moon', 'Star', 'Shadow', 'Silver', 'Dream', 'Wind', 'Grove', 'Dawn', 'Ancient', 'Wild',
          'Whisper', 'Nightsong', 'Moon', 'Silver', 'Ashen', 'Starlight',
        ],
        suffixes: [
          'song', 'stride', 'weave', 'glen', 'leaf', 'dancer', 'sworn', 'walker', 'grove', 'wind',
          'claw', 'shade', 'bark', 'bloom', 'watcher', 'song',
        ],
      },
    },
    forsaken: {
      label: 'Forsaken',
      syll: {
        onsets: ['v', 'kr', 'gr', 'sy', 'dre', 'mor', 'bl', 'x', 'z', 'de', 'cal', 'noth', 'ves', 'thal', 'noct', 'vael'],
        vowels: ['a', 'o', 'e', 'y', 'au', 'i', 'ae', 'ui'],
        codas: ['us', 'ain', 'oth', 'ard', 'yn', 'aris', 'or', 'eth', 'vex', 'mor', 'iel'],
        min: 2,
        max: 3,
        codaChance: 0.7,
      },
      surname: {
        prefixes: [
          'Grave', 'Rot', 'Hollow', 'Wither', 'Pale', 'Grim', 'Blight', 'Dread', 'Bone', 'Mourn',
          'Shroud', 'Ash', 'Wraith', 'Pallid', 'Grave', 'Dust',
        ],
        suffixes: [
          'bane', 'hollow', 'born', 'fall', 'grasp', 'shade', 'mire', 'touched', 'soul', 'rend',
          'wither', 'crypt', 'rot', 'grave', 'mourn', 'shroud',
        ],
      },
    },
    tauren: {
      label: 'Tauren',
      syll: {
        onsets: ['ka', 'ta', 'ho', 'ma', 'ru', 'cha', 'ne', 'ah', 'oa', 'yo', 'gray', 'chief', 'ba', 'ko', 'mu', 'sha', 'taur'],
        vowels: ['a', 'o', 'u', 'ai', 'ei', 'e', 'i', 'au'],
        codas: ['ka', 'po', 'ne', 'tah', 'ah', 'wa', 'nu', 'mo', 'ra', 'to', 'sha', 'na'],
        min: 2,
        max: 3,
        codaChance: 0.5,
      },
      surname: {
        prefixes: [
          'Blood', 'Rune', 'Thunder', 'Stone', 'Wind', 'Swift', 'Sky', 'Sun', 'Earth', 'Iron',
          'High', 'Moon', 'Tall', 'Golden', 'Red', 'Wild',
        ],
        suffixes: [
          'hoof', 'totem', 'horn', 'hide', 'walker', 'chaser', 'runner', 'song', 'strider',
          'mane', 'tail', 'claw', 'grass', 'river', 'earth', 'sage',
        ],
      },
    },
    troll: {
      label: 'Troll',
      syll: {
        onsets: ['zul', 'sen', 'vol', 'mal', 'reth', 'haz', 'ra', 'zan', 'bwon', 'de', 'gaz', 'jan', 'jin', 'kal', 'mok', 'vaz'],
        vowels: ['a', 'i', 'o', 'u', 'ii', 'e', 'ai', 'ua'],
        codas: ["'jin", "'gar", "'ash", "'tok", "'kai", 'gash', 'dun', 'rok', "'zan", "'vo", "'jin"],
        min: 2,
        max: 2,
        codaChance: 0.6,
      },
      surname: {
        prefixes: [
          'Jungle', 'Shadow', 'Bone', 'Spirit', 'Voodoo', 'Venom', 'Sky', 'Blood', 'Storm',
          'Dark', 'Vile', 'Sea', 'Razor', 'Black', 'Jade', 'Fever',
        ],
        suffixes: [
          'fang', 'claw', 'hex', 'spear', 'song', 'dancer', 'stalker', 'brew', 'tide', 'born',
          'skull', 'charm', 'fang', 'mask', 'spirit', 'blood',
        ],
      },
    },
  },
  calling: {
    warrior: {
      label: 'Warrior',
      title: {
        prefixes: ['Iron', 'Shield', 'Battle', 'War', 'Steel', 'Blood', 'Ashen', 'Doom', 'Ridge', 'Storm', 'Grim', 'Stone'],
        suffixes: ['clad', 'breaker', 'scarred', 'bringer', 'heart', 'guard', 'wall', 'blade', 'hammer', 'born', 'ward', 'fist'],
      },
    },
    mage: {
      label: 'Mage',
      title: {
        prefixes: ['Spell', 'Rune', 'Star', 'Tempest', 'Moon', 'Ember', 'Void', 'Glass', 'Prism', 'Astral', 'Codex', 'Arc'],
        suffixes: ['bound', 'weaver', 'caller', 'touched', 'bright', 'ward', 'hand', 'keeper', 'borne', 'wrought', 'sworn', 'wise'],
      },
    },
    rogue: {
      label: 'Rogue',
      title: {
        prefixes: ['Shadow', 'Silent', 'Night', 'Whisper', 'Cinder', 'Quick', 'Dusk', 'Veil', 'Lock', 'Wraith', 'Back', 'Grim'],
        suffixes: ['step', 'blade', 'knife', 'hand', 'runner', 'walker', 'breaker', 'ling', 'born', 'fingered', 'shade', 'ghost'],
      },
    },
    cleric: {
      label: 'Cleric',
      title: {
        prefixes: ['Light', 'Dawn', 'Faith', 'Radiant', 'Ashen', 'Sanct', 'Hallow', 'Star', 'Grave', 'Sun', 'Holy', 'Sacred'],
        suffixes: ['bringer', 'ward', 'guard', 'keeper', 'bound', 'warden', 'blessed', 'shepherd', 'light', 'born', 'hand', 'soul'],
      },
    },
    ranger: {
      label: 'Ranger',
      title: {
        prefixes: ['Wild', 'Trail', 'Hawk', 'Far', 'Beast', 'Green', 'Storm', 'Moon', 'Thorn', 'Wolf', 'Sky', 'Deep'],
        suffixes: ['walker', 'warden', 'eyed', 'strider', 'friend', 'ward', 'tracker', 'hunter', 'guide', 'kin', 'scout', 'watch'],
      },
    },
    paladin: {
      label: 'Paladin',
      title: {
        prefixes: ['Oath', 'Radiant', 'Vow', 'Light', 'Dawn', 'Sworn', 'Sanct', 'Iron', 'Hallow', 'Faith', 'Justice', 'Holy'],
        suffixes: ['keeper', 'shield', 'bound', 'ward', 'breaker', 'blade', 'guard', 'vow', 'bearer', 'light', 'heart', 'wing'],
      },
    },
    bard: {
      label: 'Bard',
      title: {
        prefixes: ['Song', 'Silver', 'Wander', 'Lore', 'Merry', 'Heart', 'Ballad', 'Dream', 'Twilight', 'Echo', 'Fable', 'Moon'],
        suffixes: ['weaver', 'tongue', 'verse', 'keeper', 'hand', 'string', 'eer', 'singer', 'muse', 'born', 'wright', 'minstrel'],
      },
    },
    necromancer: {
      label: 'Necromancer',
      title: {
        prefixes: ['Grave', 'Bone', 'Death', 'Shroud', 'Pale', 'Soul', 'Ash', 'Tomb', 'Wraith', 'Dust', 'Night', 'Hollow'],
        suffixes: ['caller', 'weaver', 'whisper', 'born', 'hand', 'binder', 'crypt', 'ward', 'march', 'bound', 'shade', 'wake'],
      },
    },
    druid: {
      label: 'Druid',
      title: {
        prefixes: ['Wild', 'Thorn', 'Moon', 'Root', 'Storm', 'Bark', 'Season', 'Deep', 'Moss', 'Tide', 'Sun', 'Leaf'],
        suffixes: ['heart', 'bound', 'leaf', 'ward', 'caller', 'skin', 'born', 'elder', 'kin', 'weaver', 'root', 'bloom'],
      },
    },
    barbarian: {
      label: 'Barbarian',
      title: {
        prefixes: ['Rage', 'Skull', 'Storm', 'Feral', 'Blood', 'Wild', 'Doom', 'Iron', 'Tempest', 'War', 'Bone', 'Frenzy'],
        suffixes: ['bound', 'cleaver', 'fist', 'roar', 'blood', 'rager', 'brute', 'born', 'cry', 'breaker', 'hide', 'fury'],
      },
    },
    monk: {
      label: 'Monk',
      title: {
        prefixes: ['Still', 'Iron', 'Wind', 'Silent', 'Harmony', 'Stone', 'Empty', 'Crane', 'Discipline', 'Serene', 'Whisper', 'Zenith'],
        suffixes: ['water', 'palm', 'walker', 'fist', 'bound', 'sage', 'hand', 'touched', 'step', 'blade', 'spirit', 'calm'],
      },
    },
    warlock: {
      label: 'Warlock',
      title: {
        prefixes: ['Pact', 'Void', 'Hex', 'Shadow', 'Dread', 'Star', 'Covenant', 'Abyss', 'Ashen', 'Night', 'Grim', 'Soul'],
        suffixes: ['bound', 'caller', 'weaver', 'pact', 'born', 'less', 'sworn', 'whisper', 'ward', 'forged', 'mark', 'wraith'],
      },
    },
  },
}
