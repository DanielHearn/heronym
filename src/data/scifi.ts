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
        onsets: ['j', 'k', 'r', 's', 't', 'v', 'br', 'kr', 'st', 'tr', 'zar', 'nov', 'cal', 'cy', 'ex', 'ly', 'or', ''],
        vowels: ['a', 'e', 'i', 'o', 'ae', 'io', 'u', 'y', 'ai', 'ei', 'ou'],
        codas: ['n', 's', 'x', 'ra', 'ton', 'vek', 'nis', 'den', 'ris', 'vex', 'lia', 'cor'],
        min: 2,
        max: 3,
        codaChance: 0.5,
      },
      surname: {
        prefixes: ['Star', 'Void', 'Orbit', 'Nova', 'Solar', 'Drift', 'Ion', 'Vector', 'Nebula', 'Helio', 'Lunar', 'Pulsar', 'Quantum', 'Astro', 'Cosmo', 'Red'],
        suffixes: ['field', 'wake', 'point', 'reach', 'span', 'drive', 'core', 'lane', 'ridge', 'strand', 'fall', 'light', 'flare', 'well'],
      },
    },
    android: {
      label: 'Android',
      syll: {
        onsets: ['x', 'z', 'q', 'v', 'kx', 'zr', 'un', '0', 'ax', 'cy', 'd', 'nex', 'sy', ''],
        vowels: ['i', 'o', 'e', 'y', '-', 'a', 'u', 'ae', 'ii'],
        codas: ['x', 'z', '9', '7', 'ex', 'on', '01', 'ix', 'tron', 'sys'],
        min: 1,
        max: 2,
        codaChance: 0.6,
      },
      surname: {
        prefixes: ['Unit', 'Model', 'Series', 'Core', 'Proto', 'Sync', 'Node', 'Kernel', 'Servo', 'Cipher', 'Nexus', 'Vector'],
        suffixes: ['ix', 'prime', 'delta', 'zero', 'alpha', 'mark', 'omega', 'sigma', 'byte', 'core'],
      },
    },
    hiveborn: {
      label: 'Hiveborn',
      syll: {
        onsets: ['kk', 'zz', 'th', 'sk', 'chr', 'zik', 'vor', 'xik', 'kra', 'ss', 'vra', 'zha'],
        vowels: ['i', 'a', 'u', 'ii', 'e', 'ai', 'oa'],
        codas: ['k', 'z', 'ss', 'th', 'ix', 'rr', 'kk', 'za', 'nix'],
        min: 2,
        max: 3,
        codaChance: 0.7,
      },
      surname: {
        prefixes: ['Swarm', 'Chitin', 'Hive', 'Broodline', 'Carapace', 'Spore', 'Queen', 'Drone', 'Amber', 'Feral'],
        suffixes: ['born', 'kin', 'sect', 'wing', 'shell', 'clade', 'brood', 'sting', 'caste'],
      },
    },
  },
  calling: {
    pilot: {
      label: 'Pilot',
      title: {
        prefixes: ['Star', 'Void', 'Jump', 'Vector', 'Orbit', 'Comet', 'Solar', 'Hyper', 'Slipstream'],
        suffixes: ['runner', 'jockey', 'striker', 'ace', 'wing', 'chaser', 'drifter', 'pilot'],
      },
    },
    engineer: {
      label: 'Engineer',
      title: {
        prefixes: ['Core', 'Reactor', 'Circuit', 'Drive', 'Ion', 'Plasma', 'Quantum', 'Nano', 'Fusion'],
        suffixes: ['tech', 'smith', 'wright', 'hand', 'mind', 'maker', 'tender', 'surgeon'],
      },
    },
    commander: {
      label: 'Commander',
      title: {
        prefixes: ['Fleet', 'Sector', 'Iron', 'High', 'Prime', 'Stellar', 'Frontier', 'Void', 'Galactic'],
        suffixes: ['commander', 'marshal', 'strategist', 'blade', 'voice', 'captain', 'admiral', 'sentinel'],
      },
    },
  },
}
