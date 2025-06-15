import {
  RelicEffect,
  RelicEvolutionMap,
  RelicInformation,
  RelicKey,
  RelicTargetingSize,
} from './types';

export const RELIC_EFFECTS: Record<RelicKey, RelicEffect[]> = {
  'relic-extinguisher': [
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        tiles: ['RED'],
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'BLUE',
            length: 4,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        amount: 1,
        tiles: ['RED'],
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'BLUE',
            length: 3,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        amount: 2,
        tiles: ['RED'],
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'BLUE',
            length: 3,
          },
        ],
      },
    },
  ],
  'relic-corn': [
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        from: 'YELLOW',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'YELLOW',
            length: 4,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        from: 'YELLOW',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'YELLOW',
            length: 3,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        from: 'YELLOW',
        amount: 2,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'YELLOW',
            length: 3,
          },
        ],
      },
    },
  ],
  'relic-flashlight': [
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        tiles: ['PURPLE'],
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'YELLOW',
            length: 4,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        tiles: ['PURPLE'],
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'YELLOW',
            length: 3,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        tiles: ['PURPLE'],
        amount: 2,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'YELLOW',
            length: 3,
          },
        ],
      },
    },
  ],
  'relic-magnifying-glass': [
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'RED',
        from: 'GREEN',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'YELLOW',
            length: 4,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'RED',
        from: 'GREEN',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'YELLOW',
            length: 3,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'RED',
        from: 'GREEN',
        amount: 2,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'YELLOW',
            length: 3,
          },
        ],
      },
    },
  ],
  'relic-death-spore': [
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        tiles: ['YELLOW'],
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'PURPLE',
            length: 4,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        tiles: ['YELLOW'],
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'PURPLE',
            length: 3,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        tiles: ['YELLOW'],
        amount: 2,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'PURPLE',
            length: 3,
          },
        ],
      },
    },
  ],
  'relic-stock-pot': [
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        tiles: ['BLUE'],
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'RED',
            length: 4,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        tiles: ['BLUE'],
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'RED',
            length: 3,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        tiles: ['BLUE'],
        amount: 2,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'RED',
            length: 3,
          },
        ],
      },
    },
  ],
  'relic-milk': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'RAINBOW',
        amount: 1,
      },
      when: {
        type: 'tiles',
        tile: 'BLUE',
        amount: 20,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'RAINBOW',
        amount: 1,
      },
      when: {
        type: 'tiles',
        tile: 'BLUE',
        amount: 15,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'RAINBOW',
        amount: 1,
      },
      when: {
        type: 'tiles',
        tile: 'BLUE',
        amount: 10,
      },
    },
  ],
  'relic-battery': [
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'PURPLE',
        amount: 1,
      },
      trigger: {
        type: 'combo',
        when: {
          min: 3,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'PURPLE',
        amount: 1,
      },
      trigger: {
        type: 'combo',
        when: {
          min: 2,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'PURPLE',
        amount: 1,
      },
      trigger: {
        type: 'combo',
        when: {
          min: 2,
        },
        repeat: {
          type: 'per-match',
        },
      },
    },
  ],
  'relic-book-of-water': [
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'BLUE',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            length: 5,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'BLUE',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            length: 4,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'BLUE',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            length: 3,
          },
        ],
      },
    },
  ],
  'relic-book-of-light': [
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'YELLOW',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            length: 5,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'YELLOW',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            length: 4,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'YELLOW',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            length: 3,
          },
        ],
      },
    },
  ],
  'relic-book-of-darkness': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'PURPLE',
        amount: 1,
      },
      when: {
        type: 'tiles',
        amount: 15,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'PURPLE',
        amount: 1,
      },
      when: {
        type: 'tiles',
        amount: 10,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'PURPLE',
        amount: 1,
      },
      when: {
        type: 'tiles',
        amount: 5,
      },
    },
  ],
  'relic-strawberry': [
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            length: 5,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            length: 4,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        amount: 2,
      },
      trigger: {
        type: 'match',
        when: [
          {
            length: 4,
          },
        ],
      },
    },
  ],
  'relic-antling': [
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        amount: 1,
      },
      trigger: {
        type: 'combo',
        when: {
          min: 3,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        amount: 1,
      },
      trigger: {
        type: 'combo',
        when: {
          min: 2,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        amount: 1,
      },
      trigger: {
        type: 'combo',
        when: {
          min: 2,
        },
        repeat: {
          type: 'per-match',
        },
      },
    },
  ],
  'relic-watering-pail': [
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'BLUE',
            length: 4,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'BLUE',
            length: 3,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        amount: 2,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'BLUE',
            length: 3,
          },
        ],
      },
    },
  ],

  /** Grey Orb Generation Cycle */
  'relic-shuriken': [
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        amount: 1,
        key: 'GREY',
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 2,
        },
        repeat: {
          type: 'per-match',
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        amount: 2,
        key: 'GREY',
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 2,
        },
        repeat: {
          type: 'per-match',
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        amount: 3,
        key: 'GREY',
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 2,
        },
        repeat: {
          type: 'per-match',
        },
      },
    },
  ],
  'relic-kunai': [
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        amount: 2,
        key: 'GREY',
      },
      trigger: {
        type: 'combo',
        when: {
          min: 2,
        },
        repeat: {
          type: 'per-match',
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        amount: 4,
        key: 'GREY',
      },
      trigger: {
        type: 'combo',
        when: {
          min: 2,
        },
        repeat: {
          type: 'per-match',
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        amount: 6,
        key: 'GREY',
      },
      trigger: {
        type: 'combo',
        when: {
          min: 2,
        },
        repeat: {
          type: 'per-match',
        },
      },
    },
  ],
  'relic-swords': [
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        amount: 4,
        key: 'GREY',
      },
      trigger: {
        type: 'match',
        when: [{ length: 5 }],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        amount: 4,
        key: 'GREY',
      },
      trigger: {
        type: 'match',
        when: [{ length: 4 }],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        amount: 6,
        key: 'GREY',
      },
      trigger: {
        type: 'match',
        when: [{ length: 4 }],
      },
    },
  ],
  'relic-chest': [
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'GREY',
        amount: 5,
      },
      when: {
        type: 'tiles',
        tile: 'CRATE',
        amount: 10,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'GREY',
        amount: 5,
      },
      when: {
        type: 'tiles',
        tile: 'CRATE',
        amount: 5,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'GREY',
        amount: 8,
      },
      when: {
        type: 'tiles',
        tile: 'CRATE',
        amount: 5,
      },
    },
  ],

  /** Orb Generation Cycle */
  'relic-sunflower': [
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        key: 'YELLOW',
        amount: 2,
      },
      trigger: {
        type: 'combo',
        when: {
          min: 2,
        },
        repeat: {
          type: 'per-match',
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        key: 'YELLOW',
        amount: 3,
      },
      trigger: {
        type: 'combo',
        when: {
          min: 2,
        },
        repeat: {
          type: 'per-match',
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        key: 'YELLOW',
        amount: 4,
      },
      trigger: {
        type: 'combo',
        when: {
          min: 2,
        },
        repeat: {
          type: 'per-match',
        },
      },
    },
  ],
  'relic-moonflower': [
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        key: 'PURPLE',
        amount: 3,
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 2,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        key: 'PURPLE',
        amount: 4,
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 2,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'generate-orb',
        key: 'PURPLE',
        amount: 5,
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 2,
        },
      },
    },
  ],
  'relic-slime-engine': [
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'GREY',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 7,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'GREY',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 5,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'GREY',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 3,
      },
    },
  ],
  'relic-slime-red': [
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'RED',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 7,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'RED',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 5,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'RED',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 3,
      },
    },
  ],
  'relic-slime-blue': [
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'BLUE',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 7,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'BLUE',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 5,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'BLUE',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 3,
      },
    },
  ],
  'relic-slime-green': [
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'GREEN',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 7,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'GREEN',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 5,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'GREEN',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 3,
      },
    },
  ],
  'relic-slime-yellow': [
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'YELLOW',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 7,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'YELLOW',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 5,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'YELLOW',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 3,
      },
    },
  ],
  'relic-slime-purple': [
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'PURPLE',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 7,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'PURPLE',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 5,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        key: 'PURPLE',
        amount: 5,
      },
      when: {
        type: 'matches',
        amount: 3,
      },
    },
  ],
  'relic-slime-santa': [
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        amount: 1,
      },
      when: {
        type: 'matches',
        amount: 3,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        amount: 1,
      },
      when: {
        type: 'matches',
        amount: 2,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'generate-orb',
        amount: 1,
      },
      when: {
        type: 'matches',
        amount: 1,
      },
    },
  ],

  /** Crate Hate Cycle */
  'relic-matchbox': [
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        amount: 1,
        from: 'CRATE',
        to: 'RED',
      },
      trigger: {
        type: 'match',
        when: [{ length: 4, tile: 'RED' }],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        amount: 1,
        from: 'CRATE',
        to: 'RED',
      },
      trigger: {
        type: 'match',
        when: [{ length: 3, tile: 'RED' }],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        amount: 2,
        from: 'CRATE',
        to: 'RED',
      },
      trigger: {
        type: 'match',
        when: [{ length: 3, tile: 'RED' }],
      },
    },
  ],
  'relic-beetle': [
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        tiles: ['CRATE'],
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'GREEN',
            length: 4,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        tiles: ['CRATE'],
        amount: 1,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'GREEN',
            length: 3,
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        tiles: ['CRATE'],
        amount: 2,
      },
      trigger: {
        type: 'match',
        when: [
          {
            tile: 'GREEN',
            length: 3,
          },
        ],
      },
    },
  ],
  'relic-tim': [
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        amount: 1,
        tiles: ['CRATE'],
      },
      trigger: {
        type: 'combo',
        when: {
          min: 3,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        amount: 1,
        tiles: ['CRATE'],
      },
      trigger: {
        type: 'combo',
        when: {
          min: 2,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        amount: 1,
        tiles: ['CRATE'],
      },
      trigger: {
        type: 'combo',
        when: {
          min: 2,
        },
        repeat: {
          type: 'per-match',
        },
      },
    },
  ],
  'relic-catcher': [
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        amount: 1,
        tiles: ['CRATE'],
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 4,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        amount: 1,
        tiles: ['CRATE'],
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 3,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        amount: 1,
        tiles: ['CRATE'],
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 2,
        },
      },
    },
  ],

  /** Orb Score Cycle */
  'relic-emerald-shard': [
    {
      type: 'passive',
      action: {
        type: 'score',
        orb: 'GREEN',
        amount: 1,
      },
    },
    {
      type: 'passive',
      action: {
        type: 'score',
        orb: 'GREEN',
        amount: 2,
      },
    },
  ],
  'relic-eye': [
    {
      type: 'passive',
      action: {
        type: 'score',
        orb: 'PURPLE',
        amount: 1,
      },
    },
    {
      type: 'passive',
      action: {
        type: 'score',
        orb: 'PURPLE',
        amount: 2,
      },
    },
  ],
  'relic-banana': [
    {
      type: 'passive',
      action: {
        type: 'score',
        orb: 'YELLOW',
        amount: 1,
      },
    },
    {
      type: 'passive',
      action: {
        type: 'score',
        orb: 'YELLOW',
        amount: 2,
      },
    },
  ],
  'relic-explosive-powder': [
    {
      type: 'passive',
      action: {
        type: 'score',
        orb: 'RED',
        amount: 1,
      },
    },
    {
      type: 'passive',
      action: {
        type: 'score',
        orb: 'RED',
        amount: 2,
      },
    },
  ],
  'relic-bottle': [
    {
      type: 'passive',
      action: {
        type: 'score',
        orb: 'BLUE',
        amount: 1,
      },
    },
    {
      type: 'passive',
      action: {
        type: 'score',
        orb: 'BLUE',
        amount: 2,
      },
    },
  ],
  'relic-telescope': [
    {
      type: 'passive',
      action: {
        type: 'score',
        orb: 'GREY',
        amount: 1,
      },
    },
    {
      type: 'passive',
      action: {
        type: 'score',
        orb: 'GREY',
        amount: 2,
      },
    },
  ],

  /** Bomb Cycle */
  'relic-dynamite-stick': [
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOMB',
      },
      trigger: {
        type: 'match',
        when: [
          {
            length: 5,
            tile: 'RED',
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOMB',
      },
      trigger: {
        type: 'match',
        when: [
          {
            length: 4,
            tile: 'RED',
          },
        ],
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOMB',
      },
      trigger: {
        type: 'match',
        when: [
          {
            length: 3,
            tile: 'RED',
          },
        ],
      },
    },
  ],
  'relic-fireworks': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOMB',
      },
      when: {
        type: 'turns',
        amount: 4,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOMB',
      },
      when: {
        type: 'turns',
        amount: 3,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOMB',
      },
      when: {
        type: 'turns',
        amount: 2,
      },
    },
  ],
  'relic-book-of-fire': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOMB',
      },
      when: {
        type: 'tiles',
        tile: 'RED',
        amount: 15,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOMB',
      },
      when: {
        type: 'tiles',
        tile: 'RED',
        amount: 11,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOMB',
      },
      when: {
        type: 'tiles',
        tile: 'RED',
        amount: 7,
      },
    },
  ],
  'relic-book-of-war': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOMB',
      },
      when: {
        type: 'tiles',
        tile: 'CRATE',
        amount: 12,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 2,
        to: 'BOMB',
      },
      when: {
        type: 'tiles',
        tile: 'CRATE',
        amount: 12,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 3,
        to: 'BOMB',
      },
      when: {
        type: 'tiles',
        tile: 'CRATE',
        amount: 12,
      },
    },
  ],

  /** Boulder Cycle */
  'relic-pickaxe': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOULDER',
      },
      when: {
        type: 'turns',
        amount: 6,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOULDER',
      },
      when: {
        type: 'turns',
        amount: 5,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOULDER',
      },
      when: {
        type: 'turns',
        amount: 4,
      },
    },
  ],
  'relic-trowel': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOULDER',
      },
      when: {
        type: 'matches',
        tile: 'GREEN',
        amount: 7,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOULDER',
      },
      when: {
        type: 'matches',
        tile: 'GREEN',
        amount: 5,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOULDER',
      },
      when: {
        type: 'matches',
        tile: 'GREEN',
        amount: 3,
      },
    },
  ],
  'relic-book-of-earth': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOULDER',
      },
      when: {
        type: 'tiles',
        tile: 'GREEN',
        amount: 20,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOULDER',
      },
      when: {
        type: 'tiles',
        tile: 'GREEN',
        amount: 15,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'BOULDER',
      },
      when: {
        type: 'tiles',
        tile: 'GREEN',
        amount: 10,
      },
    },
  ],

  /** Match Hero Cycle */
  'relic-slime-doctor': [
    {
      type: 'cooldown',
      action: {
        type: 'heal',
        amount: 1,
      },
      when: {
        type: 'tiles',
        tile: 'GREEN',
        amount: 45,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'heal',
        amount: 1,
      },
      when: {
        type: 'tiles',
        tile: 'GREEN',
        amount: 35,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'heal',
        amount: 1,
      },
      when: {
        type: 'tiles',
        tile: 'GREEN',
        amount: 25,
      },
    },
  ],
  'relic-blermy': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'BLUE',
        amount: 1,
      },
      when: {
        type: 'matches',
        amount: 3,
        tile: 'BLUE',
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'BLUE',
        amount: 2,
      },
      when: {
        type: 'matches',
        amount: 3,
        tile: 'BLUE',
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'BLUE',
        amount: 3,
      },
      when: {
        type: 'matches',
        amount: 3,
        tile: 'BLUE',
      },
    },
  ],
  'relic-milton': [
    {
      type: 'cooldown',
      action: {
        type: 'destroy-row',
      },
      when: {
        type: 'matches',
        amount: 7,
        tile: 'YELLOW',
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-row',
      },
      when: {
        type: 'matches',
        amount: 5,
        tile: 'YELLOW',
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-row',
      },
      when: {
        type: 'matches',
        amount: 3,
        tile: 'YELLOW',
      },
    },
  ],
  'relic-stepper': [
    {
      type: 'cooldown',
      action: {
        type: 'destroy-column',
      },
      when: {
        type: 'matches',
        amount: 7,
        tile: 'RED',
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-column',
      },
      when: {
        type: 'matches',
        amount: 5,
        tile: 'RED',
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-column',
      },
      when: {
        type: 'matches',
        amount: 3,
        tile: 'RED',
      },
    },
  ],
  'relic-phool': [
    {
      type: 'cooldown',
      action: {
        type: 'destroy-tiles',
        amount: 5,
      },
      when: {
        type: 'matches',
        tile: 'PURPLE',
        amount: 9,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-tiles',
        amount: 5,
      },
      when: {
        type: 'matches',
        tile: 'PURPLE',
        amount: 7,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-tiles',
        amount: 5,
      },
      when: {
        type: 'matches',
        tile: 'PURPLE',
        amount: 5,
      },
    },
  ],
  'relic-quacksire': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        amount: 4,
      },
      when: {
        type: 'matches',
        amount: 5,
        tile: 'GREEN',
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        amount: 4,
      },
      when: {
        type: 'matches',
        amount: 4,
        tile: 'GREEN',
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'GREEN',
        amount: 4,
      },
      when: {
        type: 'matches',
        amount: 3,
        tile: 'GREEN',
      },
    },
  ],
  'relic-cow': [
    {
      type: 'cooldown',
      action: {
        type: 'destroy-tiles',
        amount: 20,
        tiles: ['GREEN'],
      },
      when: {
        type: 'tiles',
        amount: 120,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-tiles',
        amount: 20,
        tiles: ['GREEN'],
      },
      when: {
        type: 'tiles',
        amount: 100,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-tiles',
        amount: 20,
        tiles: ['GREEN'],
      },
      when: {
        type: 'tiles',
        amount: 80,
      },
    },
  ],
  'relic-stony-light': [
    {
      type: 'cooldown',
      action: {
        type: 'destroy-tiles',
        amount: 5,
        tiles: ['RED', 'GREEN', 'BLUE'],
      },
      when: {
        type: 'tiles',
        tile: 'YELLOW',
        amount: 15,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-tiles',
        amount: 5,
        tiles: ['RED', 'GREEN', 'BLUE'],
      },
      when: {
        type: 'tiles',
        tile: 'YELLOW',
        amount: 10,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-tiles',
        amount: 5,
        tiles: ['RED', 'GREEN', 'BLUE'],
      },
      when: {
        type: 'tiles',
        tile: 'YELLOW',
        amount: 5,
      },
    },
  ],
  'relic-stony-dark': [
    {
      type: 'cooldown',
      action: {
        type: 'destroy-tiles',
        amount: 5,
        tiles: ['RED', 'GREEN', 'BLUE'],
      },
      when: {
        type: 'tiles',
        tile: 'PURPLE',
        amount: 15,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-tiles',
        amount: 5,
        tiles: ['RED', 'GREEN', 'BLUE'],
      },
      when: {
        type: 'tiles',
        tile: 'PURPLE',
        amount: 10,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-tiles',
        amount: 5,
        tiles: ['RED', 'GREEN', 'BLUE'],
      },
      when: {
        type: 'tiles',
        tile: 'PURPLE',
        amount: 5,
      },
    },
  ],
  'relic-pancho': [
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        amount: 1,
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 4,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        amount: 1,
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 3,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'destroy-tiles',
        amount: 1,
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 2,
        },
      },
    },
  ],
  'relic-fly': [
    {
      type: 'cooldown',
      action: {
        type: 'destroy-column',
      },
      when: {
        type: 'tiles',
        amount: 100,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-column',
      },
      when: {
        type: 'tiles',
        amount: 80,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-column',
      },
      when: {
        type: 'tiles',
        amount: 60,
      },
    },
  ],
  'relic-lunatic': [
    {
      type: 'cooldown',
      action: {
        type: 'destroy-row',
      },
      when: {
        type: 'tiles',
        amount: 100,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-row',
      },
      when: {
        type: 'tiles',
        amount: 80,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'destroy-row',
      },
      when: {
        type: 'tiles',
        amount: 60,
      },
    },
  ],
  'relic-embers': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'RED',
        amount: 1,
      },
      when: {
        type: 'matches',
        amount: 3,
        tile: 'RED',
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'RED',
        amount: 2,
      },
      when: {
        type: 'matches',
        amount: 3,
        tile: 'RED',
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'RED',
        amount: 3,
      },
      when: {
        type: 'matches',
        amount: 3,
        tile: 'RED',
      },
    },
  ],
  /** Rainbow Cycle */
  'relic-wand': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'RAINBOW',
      },
      when: {
        type: 'turns',
        amount: 6,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'RAINBOW',
      },
      when: {
        type: 'turns',
        amount: 5,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'RAINBOW',
      },
      when: {
        type: 'turns',
        amount: 4,
      },
    },
  ],
  'relic-broken-wand': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'RAINBOW',
        amount: 1,
      },
      when: {
        type: 'matches',
        amount: 17,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'RAINBOW',
        amount: 1,
      },
      when: {
        type: 'matches',
        amount: 15,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        to: 'RAINBOW',
        amount: 1,
      },
      when: {
        type: 'matches',
        amount: 12,
      },
    },
  ],
  'relic-cash-register': [
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'RAINBOW',
      },
      when: {
        type: 'tiles',
        amount: 55,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'RAINBOW',
      },
      when: {
        type: 'tiles',
        amount: 50,
      },
    },
    {
      type: 'cooldown',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'RAINBOW',
      },
      when: {
        type: 'tiles',
        amount: 45,
      },
    },
  ],
  'relic-slime-bunny': [
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'RAINBOW',
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 7,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'RAINBOW',
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 6,
        },
      },
    },
    {
      type: 'triggered',
      action: {
        type: 'replace-tiles',
        amount: 1,
        to: 'RAINBOW',
      },
      trigger: {
        type: 'cascade',
        when: {
          min: 5,
        },
      },
    },
  ],

  /** Spell Cycle */
  'relic-fireball': [
    {
      type: 'spell',
      targeting: {
        type: 'circular',
        radius: 'small',
      },
      when: {
        type: 'tiles',
        tile: 'RED',
        amount: 25,
      },
    },
    {
      type: 'spell',
      targeting: {
        type: 'circular',
        radius: 'medium',
      },
      when: {
        type: 'tiles',
        tile: 'RED',
        amount: 25,
      },
    },
    {
      type: 'spell',
      targeting: {
        type: 'circular',
        radius: 'large',
      },
      when: {
        type: 'tiles',
        tile: 'RED',
        amount: 25,
      },
    },
  ],
  'relic-magic-missile': [
    {
      type: 'spell',
      targeting: {
        type: 'single-target',
        numTargets: 2,
        action: {
          type: 'destroy-tiles',
        },
      },
      when: {
        type: 'tiles',
        tile: 'PURPLE',
        amount: 10,
      },
    },
    {
      type: 'spell',
      targeting: {
        type: 'single-target',
        numTargets: 3,
        action: {
          type: 'destroy-tiles',
        },
      },
      when: {
        type: 'tiles',
        tile: 'PURPLE',
        amount: 10,
      },
    },
    {
      type: 'spell',
      targeting: {
        type: 'single-target',
        numTargets: 4,
        action: {
          type: 'destroy-tiles',
        },
      },
      when: {
        type: 'tiles',
        tile: 'PURPLE',
        amount: 10,
      },
    },
  ],
  'relic-lightning-strike': [
    {
      type: 'spell',
      targeting: {
        type: 'diagonal',
      },
      when: {
        type: 'tiles',
        tile: 'YELLOW',
        amount: 25,
      },
    },
    {
      type: 'spell',
      targeting: {
        type: 'diagonal',
      },
      when: {
        type: 'tiles',
        tile: 'YELLOW',
        amount: 20,
      },
    },
    {
      type: 'spell',
      targeting: {
        type: 'diagonal',
      },
      when: {
        type: 'tiles',
        tile: 'YELLOW',
        amount: 15,
      },
    },
  ],
  'relic-star-fall': [
    {
      type: 'spell',
      targeting: {
        type: 'tile-type',
      },
      when: {
        type: 'turns',
        amount: 8,
      },
    },
    {
      type: 'spell',
      targeting: {
        type: 'tile-type',
      },
      when: {
        type: 'turns',
        amount: 7,
      },
    },
    {
      type: 'spell',
      targeting: {
        type: 'tile-type',
      },
      when: {
        type: 'turns',
        amount: 6,
      },
    },
  ],
  'relic-boulder-roll': [
    {
      type: 'spell',
      targeting: {
        type: 'line',
      },
      when: {
        type: 'matches',
        tile: 'GREEN',
        amount: 6,
      },
    },
    {
      type: 'spell',
      targeting: {
        type: 'line',
      },
      when: {
        type: 'matches',
        tile: 'GREEN',
        amount: 5,
      },
    },
    {
      type: 'spell',
      targeting: {
        type: 'line',
      },
      when: {
        type: 'matches',
        tile: 'GREEN',
        amount: 4,
      },
    },
  ],
  'relic-whirlpool': [
    {
      type: 'spell',
      targeting: {
        type: 'instant',
        execute: 'shuffle',
      },
      when: {
        type: 'tiles',
        tile: 'BLUE',
        amount: 20,
      },
    },
    {
      type: 'spell',
      targeting: {
        type: 'instant',
        execute: 'shuffle',
      },
      when: {
        type: 'tiles',
        tile: 'BLUE',
        amount: 18,
      },
    },
    {
      type: 'spell',
      targeting: {
        type: 'instant',
        execute: 'shuffle',
      },
      when: {
        type: 'tiles',
        tile: 'BLUE',
        amount: 15,
      },
    },
  ],
};

export const RELIC_EVOLUTIONS: RelicEvolutionMap = {};

export const RELICS: Record<RelicKey, RelicInformation> = {
  'relic-chest': {
    key: 'relic-chest',
    sprite: 'icons-chest',
    name: 'Treasure Chest',
    color: 'GREY',
  },
  'relic-trowel': {
    key: 'relic-trowel',
    sprite: 'relic-trowel',
    name: 'Garden Trowel',
    color: 'GREEN',
  },
  'relic-pickaxe': {
    key: 'relic-pickaxe',
    sprite: 'relic-pickaxe',
    name: 'Pick Axe',
    color: 'GREY',
  },
  'relic-emerald-shard': {
    key: 'relic-emerald-shard',
    sprite: 'relic-emerald-shard',
    name: 'Emerald Shard',
    color: 'GREEN',
  },
  'relic-swords': {
    key: 'relic-swords',
    sprite: 'icons-attack',
    name: 'Dual Swords',
    color: 'GREY',
  },
  'relic-fireball': {
    key: 'relic-fireball',
    sprite: 'icons-fireball',
    name: 'Fireball',
    color: 'RED',
  },
  'relic-matchbox': {
    key: 'relic-matchbox',
    sprite: 'relic-matchbox',
    name: 'Matchbox',
    color: 'RED',
  },
  'relic-explosive-powder': {
    key: 'relic-explosive-powder',
    sprite: 'relic-explosive-powder',
    name: 'Explosive Powder',
    color: 'RED',
  },
  'relic-dynamite-stick': {
    key: 'relic-dynamite-stick',
    sprite: 'relic-dynamite-stick',
    name: 'Dynamite Stick',
    color: 'RED',
  },
  'relic-banana': {
    key: 'relic-banana',
    sprite: 'relic-banana',
    name: 'Banana',
    color: 'YELLOW',
  },
  'relic-beetle': {
    key: 'relic-beetle',
    sprite: 'relic-beetle',
    name: 'Beetle',
    color: 'GREEN',
  },
  'relic-shuriken': {
    key: 'relic-shuriken',
    sprite: 'relic-shuriken',
    name: 'Shuriken',
    color: 'GREY',
  },
  'relic-kunai': {
    key: 'relic-kunai',
    sprite: 'relic-kunai',
    name: 'Kunai',
    color: 'GREY',
  },
  'relic-bottle': {
    key: 'relic-bottle',
    sprite: 'relic-bottle',
    name: 'Water Bottle',
    color: 'BLUE',
  },
  'relic-extinguisher': {
    key: 'relic-extinguisher',
    sprite: 'relic-extinguisher',
    name: 'Fire Extinguisher',
    color: 'BLUE',
  },
  'relic-eye': {
    key: 'relic-eye',
    sprite: 'relic-eye',
    name: 'Evil Eye',
    color: 'PURPLE',
  },
  'relic-flashlight': {
    key: 'relic-flashlight',
    sprite: 'relic-flashlight',
    name: 'Flashlight',
    color: 'YELLOW',
  },
  'relic-wand': {
    key: 'relic-wand',
    sprite: 'relic-wand',
    name: 'Wand',
    color: 'GREY',
  },
  'relic-stock-pot': {
    key: 'relic-stock-pot',
    sprite: 'relic-stock-pot',
    name: 'Stock Pot',
    color: 'GREY',
  },
  'relic-broken-wand': {
    key: 'relic-broken-wand',
    sprite: 'relic-broken-wand',
    name: 'Broken Wand',
    color: 'GREY',
  },
  'relic-cash-register': {
    key: 'relic-cash-register',
    sprite: 'relic-cash-register',
    name: 'Cash Register',
    color: 'YELLOW',
  },
  'relic-blermy': {
    key: 'relic-blermy',
    sprite: 'relic-blermy',
    name: 'Blermy',
    color: 'BLUE',
  },
  'relic-milton': {
    key: 'relic-milton',
    sprite: 'relic-milton',
    name: 'Milton',
    color: 'YELLOW',
  },
  'relic-stepper': {
    key: 'relic-stepper',
    sprite: 'relic-stepper',
    name: 'Stepper',
    color: 'RED',
  },
  'relic-phool': {
    key: 'relic-phool',
    sprite: 'relic-phool',
    name: 'Phool',
    color: 'PURPLE',
  },
  'relic-quacksire': {
    key: 'relic-quacksire',
    sprite: 'relic-quacksire',
    name: 'Quacksire',
    color: 'GREEN',
  },
  'relic-slime-engine': {
    key: 'relic-slime-engine',
    sprite: 'relic-slime-engine',
    name: 'Slime Engine',
    color: 'GREY',
  },
  'relic-magic-missile': {
    key: 'relic-magic-missile',
    sprite: 'icons-magic-missile',
    name: 'Magic Missile',
    color: 'PURPLE',
  },
  'relic-lightning-strike': {
    key: 'relic-lightning-strike',
    sprite: 'icons-lightning',
    name: 'Lightning Strike',
    color: 'BLUE',
  },
  'relic-star-fall': {
    key: 'relic-star-fall',
    sprite: 'icons-star',
    name: 'Star Fall',
    color: 'YELLOW',
  },
  'relic-boulder-roll': {
    key: 'relic-boulder-roll',
    sprite: 'icons-boulder',
    name: 'Boulder Roll',
    color: 'GREEN',
  },
  'relic-whirlpool': {
    key: 'relic-whirlpool',
    sprite: 'icons-whirlpool',
    name: 'Whirlpool',
    color: 'BLUE',
  },
  'relic-fireworks': {
    key: 'relic-fireworks',
    sprite: 'relic-fireworks',
    name: 'Fireworks',
    color: 'RED',
  },
  'relic-book-of-earth': {
    key: 'relic-book-of-earth',
    sprite: 'relic-book-of-earth',
    name: 'Book of Earth',
    color: 'GREEN',
  },
  // 'relic-slime-red': {
  //   key: 'relic-slime-red',
  //   sprite: 'relic-slime-red',
  //   name: 'Red Slime',
  // },
  // 'relic-slime-blue': {
  //   key: 'relic-slime-blue',
  //   sprite: 'relic-slime-blue',
  //   name: 'Blue Slime',
  // },
  // 'relic-slime-green': {
  //   key: 'relic-slime-green',
  //   sprite: 'relic-slime-green',
  //   name: 'Green Slime',
  // },
  // 'relic-slime-yellow': {
  //   key: 'relic-slime-yellow',
  //   sprite: 'relic-slime-yellow',
  //   name: 'Yellow Slime',
  // },
  // 'relic-slime-purple': {
  //   key: 'relic-slime-purple',
  //   sprite: 'relic-slime-purple',
  //   name: 'Purple Slime',
  // },
  'relic-book-of-fire': {
    key: 'relic-book-of-fire',
    sprite: 'relic-book-of-fire',
    name: 'Book of Fire',
    color: 'RED',
  },
  'relic-book-of-war': {
    key: 'relic-book-of-war',
    sprite: 'relic-book-of-war',
    name: 'Book of War',
    color: 'GREY',
  },
  'relic-slime-doctor': {
    key: 'relic-slime-doctor',
    sprite: 'relic-slime-doctor',
    name: 'Slime Doctor',
    color: 'GREEN',
  },
  'relic-catcher': {
    key: 'relic-catcher',
    sprite: 'relic-catcher',
    name: 'Catcher',
    color: 'GREY',
  },
  'relic-tim': {
    key: 'relic-tim',
    sprite: 'relic-tim',
    name: 'Tim',
    color: 'GREY',
  },
  'relic-moonflower': {
    key: 'relic-moonflower',
    sprite: 'relic-moonflower',
    name: 'Moonflower',
    color: 'PURPLE',
  },
  'relic-sunflower': {
    key: 'relic-sunflower',
    sprite: 'relic-sunflower',
    name: 'Sunflower',
    color: 'YELLOW',
  },
  'relic-death-spore': {
    key: 'relic-death-spore',
    sprite: 'relic-death-spore',
    name: 'Death Spore',
    color: 'PURPLE',
  },
  'relic-magnifying-glass': {
    key: 'relic-magnifying-glass',
    sprite: 'relic-magnifying-glass',
    name: 'Magnifying Glass',
    color: 'YELLOW',
  },
  'relic-telescope': {
    key: 'relic-telescope',
    sprite: 'relic-telescope',
    name: 'Telescope',
    color: 'GREY',
  },
  'relic-slime-red': {
    key: 'relic-slime-red',
    name: 'Red Slime',
    sprite: 'relic-slime-red',
    color: 'RED',
  },
  'relic-slime-green': {
    key: 'relic-slime-green',
    name: 'Green Slime',
    sprite: 'relic-slime-green',
    color: 'GREEN',
  },
  'relic-slime-blue': {
    key: 'relic-slime-blue',
    name: 'Blue Slime',
    sprite: 'relic-slime-blue',
    color: 'BLUE',
  },
  'relic-slime-yellow': {
    key: 'relic-slime-yellow',
    name: 'Yellow Slime',
    sprite: 'relic-slime-yellow',
    color: 'YELLOW',
  },
  'relic-slime-purple': {
    key: 'relic-slime-purple',
    name: 'Purple Slime',
    sprite: 'relic-slime-purple',
    color: 'PURPLE',
  },
  'relic-book-of-water': {
    key: 'relic-book-of-water',
    name: 'Book of Water',
    sprite: 'relic-book-of-water',
    color: 'BLUE',
  },
  'relic-book-of-light': {
    key: 'relic-book-of-light',
    name: 'Book of Light',
    sprite: 'relic-book-of-light',
    color: 'YELLOW',
  },
  'relic-book-of-darkness': {
    key: 'relic-emerald-shard',
    name: 'Book of Darkness',
    sprite: 'relic-book-of-darkness',
    color: 'PURPLE',
  },
  'relic-cow': {
    key: 'relic-cow',
    name: 'Cow',
    sprite: 'relic-cow',
    color: 'GREY',
  },
  'relic-corn': {
    key: 'relic-corn',
    name: 'Corn',
    sprite: 'relic-corn',
    color: 'YELLOW',
  },
  'relic-battery': {
    key: 'relic-battery',
    name: 'Battery',
    sprite: 'relic-battery',
    color: 'GREY',
  },
  'relic-milk': {
    key: 'relic-milk',
    name: 'Milk',
    sprite: 'relic-milk',
    color: 'BLUE',
  },
  'relic-strawberry': {
    key: 'relic-strawberry',
    name: 'Strawberry',
    sprite: 'relic-strawberry',
    color: 'GREEN',
  },
  'relic-stony-dark': {
    key: 'relic-stony-dark',
    name: 'Moon Stone',
    sprite: 'relic-stony-dark',
    color: 'PURPLE',
  },
  'relic-stony-light': {
    key: 'relic-stony-light',
    name: 'Sun Stone',
    sprite: 'relic-stony-light',
    color: 'YELLOW',
  },
  'relic-pancho': {
    key: 'relic-pancho',
    name: 'Pancho',
    sprite: 'relic-pancho',
    color: 'PURPLE',
  },
  'relic-slime-santa': {
    key: 'relic-slime-santa',
    name: 'Slime Santa',
    sprite: 'relic-slime-santa',
    color: 'BLUE',
  },
  'relic-slime-bunny': {
    key: 'relic-slime-bunny',
    name: 'Slime Bunny',
    sprite: 'relic-slime-bunny',
    color: 'GREY',
  },
  'relic-fly': {
    key: 'relic-fly',
    name: 'Fly',
    sprite: 'relic-fly',
    color: 'GREY',
  },
  'relic-embers': {
    key: 'relic-embers',
    name: 'Embers',
    sprite: 'relic-embers',
    color: 'RED',
  },
  'relic-lunatic': {
    key: 'relic-lunatic',
    name: 'Lunatic',
    sprite: 'relic-lunatic',
    color: 'GREY',
  },
  'relic-antling': {
    key: 'relic-antling',
    name: 'Antling',
    sprite: 'relic-antling',
    color: 'GREEN',
  },
  'relic-watering-pail': {
    key: 'relic-watering-pail',
    name: 'Watering Pail',
    sprite: 'relic-watering-pail',
    color: 'BLUE',
  },
};

export const RADIUS_TO_SIZE: Record<RelicTargetingSize, number> = {
  small: 80,
  medium: 130,
  large: 180,
};

export const isRelicKey = (key: string): key is RelicKey => key in RELICS;

export const isRelicInfo = (obj: { key: string }): obj is RelicInformation =>
  isRelicKey(obj.key);
