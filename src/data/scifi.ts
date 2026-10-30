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
    belter: {
      label: 'Belter',
      syll: {
        onsets: ['d', 'g', 'h', 'k', 'm', 'r', 't', 'v', 'br', 'dr', 'gr', 'sk', 'ro', 'ha', ''],
        vowels: ['a', 'o', 'u', 'e', 'i', 'ao', 'ou'],
        codas: ['k', 'n', 'ck', 'll', 'rd', 'x', 'ren', 'dak', 'ton', 'gan'],
        min: 2,
        max: 3,
        codaChance: 0.6,
      },
      surname: {
        prefixes: ['Rock', 'Dust', 'Ice', 'Gravel', 'Cinder', 'Shaft', 'Tunnel', 'Sump', 'Ore', 'Cutter', 'Hollow', 'Rubble'],
        suffixes: ['shaft', 'hole', 'rig', 'claim', 'drill', 'bore', 'cradle', 'spur', 'dock', 'ring'],
      },
    },
    martian: {
      label: 'Martian',
      syll: {
        onsets: ['m', 'r', 't', 's', 'k', 'h', 'v', 'ar', 'sol', 'ru', 'tha', 'ky', 'ma', 'ph', 'ne', ''],
        vowels: ['a', 'e', 'i', 'o', 'u', 'ai', 'ia', 'ea', 'io'],
        codas: ['s', 'n', 'th', 'rra', 'lon', 'dis', 'vek', 'tar', 'ium', 'ros'],
        min: 2,
        max: 3,
        codaChance: 0.5,
      },
      surname: {
        prefixes: ['Red', 'Dust', 'Olympus', 'Tharsis', 'Valles', 'Hellas', 'Sol', 'Ares', 'Arcadia', 'Syrtis', 'Terra', 'Dune'],
        suffixes: ['ridge', 'dome', 'basin', 'terrace', 'canyon', 'mesa', 'crater', 'vale', 'plain', 'sun'],
      },
    },
    clone: {
      label: 'Clone',
      syll: {
        onsets: ['c', 'd', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'ax', 'ver', 'cl', 'ge', 'tau', ''],
        vowels: ['a', 'e', 'i', 'o', 'u', 'y', 'ae', 'ei'],
        codas: ['x', 'n', 's', 'k', 'id', 'ion', 'ar', 'ex', 'ta', 'ro'],
        min: 2,
        max: 3,
        codaChance: 0.5,
      },
      surname: {
        prefixes: ['Batch', 'Line', 'Genome', 'Cultivar', 'Vat', 'Lot', 'Strain', 'Seed', 'Germline', 'Gene', 'Replica', 'Sibling'],
        suffixes: ['sequence', 'lineage', 'code', 'series', 'strain', 'twin', 'mark', 'line', 'born', 'grown'],
      },
    },
    psion: {
      label: 'Psion',
      syll: {
        onsets: ['th', 's', 'v', 'l', 'ph', 'm', 'n', 'ps', 'ven', 'ce', 'ar', 'ky', 'ir', 'e'],
        vowels: ['a', 'e', 'i', 'y', 'ie', 'ei', 'ae', 'o'],
        codas: ['n', 'l', 'th', 'ss', 'ris', 'vyn', 'ath', 'ion', 'iel', 'ex'],
        min: 2,
        max: 3,
        codaChance: 0.55,
      },
      surname: {
        prefixes: ['Mind', 'Thought', 'Echo', 'Resonance', 'Lucid', 'Synapse', 'Ghost', 'Sable', 'Aether', 'Signal', 'Veil', 'Psi'],
        suffixes: ['sense', 'weaver', 'mind', 'ward', 'lattice', 'bloom', 'shade', 'gate', 'tongue', 'hymn'],
      },
    },
    augment: {
      label: 'Augment',
      syll: {
        onsets: ['b', 'c', 'g', 'k', 'm', 'p', 'r', 't', 'x', 'y', 'bolt', 'cog', 'rex', 'tek', 'vx', ''],
        vowels: ['a', 'e', 'i', 'o', 'u', 'ex', 'ax', 'ix'],
        codas: ['x', 'k', 't', 'n', 'ron', 'tek', 'max', 'rix', 'dyne', 'gen'],
        min: 2,
        max: 3,
        codaChance: 0.6,
      },
      surname: {
        prefixes: ['Steel', 'Chrome', 'Titan', 'Hydra', 'Piston', 'Circuit', 'Alloy', 'Servo', 'Bionic', 'Ferro', 'Synth', 'Graft'],
        suffixes: ['gear', 'frame', 'plate', 'rig', 'weave', 'socket', 'lock', 'forge', 'bolt', 'graft'],
      },
    },
    drifter: {
      label: 'Drifter',
      syll: {
        onsets: ['b', 'd', 'f', 'g', 'j', 'k', 'l', 'n', 'r', 's', 't', 'w', 'rh', 'sh', 'ja', 'ko', 'ren', ''],
        vowels: ['a', 'e', 'i', 'o', 'u', 'ay', 'oo', 'ee'],
        codas: ['n', 'r', 's', 't', 'ck', 'll', 'dy', 'ko', 'ren', 'rin', 'gan'],
        min: 2,
        max: 3,
        codaChance: 0.55,
      },
      surname: {
        prefixes: ['Rust', 'Dustwalk', 'Gutter', 'Relay', 'Scrap', 'Wayward', 'Hollow', 'Wanderer', 'Flint', 'Ashfall', 'Tow', 'Salvage'],
        suffixes: ['jack', 'hand', 'rider', 'walker', 'wright', 'runner', 'drifter', 'cutter', 'vagrant', 'gully'],
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
    medic: {
      label: 'Medic',
      title: {
        prefixes: ['Bio', 'Trauma', 'Neuro', 'Surgical', 'Cryo', 'Triage', 'Nano', 'Vital', 'Gene', 'Sterile'],
        suffixes: ['surgeon', 'healer', 'doctor', 'medic', 'warden', 'tender', 'mender', 'chirurgeon'],
      },
    },
    navigator: {
      label: 'Navigator',
      title: {
        prefixes: ['Star', 'Warp', 'Deep', 'Vector', 'Helm', 'Route', 'Chart', 'Gyro', 'Trajectory', 'Beacon'],
        suffixes: ['pathfinder', 'helmsman', 'charter', 'navigator', 'plotter', 'steersman', 'mapper', 'wayfinder'],
      },
    },
    marine: {
      label: 'Marine',
      title: {
        prefixes: ['Drop', 'Assault', 'Boarding', 'Shock', 'Iron', 'Hard', 'Frontline', 'Ground', 'Vanguard', 'Breach'],
        suffixes: ['trooper', 'breacher', 'sergeant', 'vanguard', 'gunner', 'lancer', 'striker', 'shield'],
      },
    },
    hacker: {
      label: 'Hacker',
      title: {
        prefixes: ['Ghost', 'Zero', 'Byte', 'Null', 'Root', 'Glitch', 'Packet', 'Static', 'Cipher', 'Daemon'],
        suffixes: ['cracker', 'runner', 'phreak', 'shell', 'breaker', 'spider', 'hacker', 'ghost'],
      },
    },
    smuggler: {
      label: 'Smuggler',
      title: {
        prefixes: ['Black', 'Gray', 'Shadow', 'Dead', 'Dust', 'Quick', 'Silver', 'Rust', 'Cargo', 'Stealth'],
        suffixes: ['runner', 'dealer', 'broker', 'captain', 'dodger', 'fence', 'hauler', 'trader'],
      },
    },
    xenobiologist: {
      label: 'Xenobiologist',
      title: {
        prefixes: ['Xeno', 'Astro', 'Exo', 'Myco', 'Phyto', 'Zoo', 'Proto', 'Cell', 'Gene', 'Bio'],
        suffixes: ['biologist', 'botanist', 'naturalist', 'sampler', 'taxonomist', 'observer', 'archivist', 'dissector'],
      },
    },
  },
}
