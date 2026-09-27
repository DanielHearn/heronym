import type { Theme } from './types'

// A second theme to prove the shape generalizes. "Origin" stands in for
// Race here, and "Role" stands in for Class — both are just labels the
// theme chooses. A few lineages/callings as a starting point; extend
// following the same pattern.

export const scifi: Theme = {
  label: 'Sci-Fi',
  lineageLabel: 'Origin',
  callingLabel: 'Role',
  lineage: {
    colonist: {
      label: 'Colonist',
      syll: {
        onsets: ['j', 'k', 'r', 's', 't', 'v', 'br', 'kr', 'st', 'tr', 'zar', 'nov', ''],
        vowels: ['a', 'e', 'i', 'o', 'ae', 'io'],
        codas: ['n', 's', 'x', 'ra', 'ton', 'vek', 'nis'],
        min: 2,
        max: 3,
        codaChance: 0.5,
      },
      surname: {
        prefixes: ['Star', 'Void', 'Orbit', 'Nova', 'Solar', 'Drift', 'Ion', 'Vector', 'Nebula', 'Helio'],
        suffixes: ['field', 'wake', 'point', 'reach', 'span', 'drive', 'core', 'lane', 'ridge', 'strand'],
      },
    },
    android: {
      label: 'Android',
      syll: {
        onsets: ['x', 'z', 'q', 'v', 'kx', 'zr', 'un', '0', ''],
        vowels: ['i', 'o', 'e', 'y', '-'],
        codas: ['x', 'z', '9', '7', 'ex', 'on'],
        min: 1,
        max: 2,
        codaChance: 0.6,
      },
      surname: {
        prefixes: ['Unit', 'Model', 'Series', 'Core', 'Proto', 'Sync', 'Node'],
        suffixes: ['ix', 'prime', 'delta', 'zero', 'alpha', 'mark'],
      },
    },
    hiveborn: {
      label: 'Hiveborn',
      syll: {
        onsets: ['kk', 'zz', 'th', 'sk', 'chr', 'zik', 'vor'],
        vowels: ['i', 'a', 'u', 'ii'],
        codas: ['k', 'z', 'ss', 'th', 'ix'],
        min: 2,
        max: 3,
        codaChance: 0.7,
      },
      surname: {
        prefixes: ['Swarm', 'Chitin', 'Hive', 'Broodline', 'Carapace'],
        suffixes: ['born', 'kin', 'sect', 'wing', 'shell'],
      },
    },
  },
  calling: {
    pilot: {
      label: 'Pilot',
      title: {
        prefixes: ['Star', 'Void', 'Jump', 'Vector', 'Orbit'],
        suffixes: ['runner', 'jockey', 'striker', 'ace', 'wing'],
      },
    },
    engineer: {
      label: 'Engineer',
      title: {
        prefixes: ['Core', 'Reactor', 'Circuit', 'Drive', 'Ion'],
        suffixes: ['tech', 'smith', 'wright', 'hand', 'mind'],
      },
    },
    commander: {
      label: 'Commander',
      title: {
        prefixes: ['Fleet', 'Sector', 'Iron', 'High', 'Prime'],
        suffixes: ['commander', 'marshal', 'strategist', 'blade', 'voice'],
      },
    },
  },
}
