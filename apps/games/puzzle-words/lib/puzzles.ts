import { verifyPuzzle } from './utility';

export type PuzzleRule = 'no-3-letter-words' | 'no-4-letter-words';

export const printPuzzleRule = (rules: PuzzleRule[]) => {
  if (rules.includes('no-4-letter-words')) {
    return 'No 3 or 4 Letter Words';
  } else if (rules.includes('no-3-letter-words')) {
    return 'No 3 Letter Words';
  }
};

export type Puzzle = {
  letters: string[];
  words: string[];
  bonuses: string[];
  rules: PuzzleRule[];
};

export const puzzles: Puzzle[] = [
  {
    letters: 'work'.split(''),
    words: ['work', 'row'],
    bonuses: ['wok'],
    rules: [],
  },
  {
    letters: 'sheet'.split(''),
    words: ['sheet', 'these', 'see', 'she', 'set', 'the'],
    bonuses: ['hest', 'seth', 'thee', 'tee', 'tees'],
    rules: [],
  },
  {
    letters: 'tent'.split(''),
    words: ['tent', 'net', 'ten'],
    bonuses: ['tet'],
    rules: [],
  },
  {
    letters: 'type'.split(''),
    words: ['type', 'yet', 'pet', 'yep'],
    bonuses: ['pye'],
    rules: [],
  },
  {
    letters: 'page'.split(''),
    words: ['page', 'gape', 'age', 'ape', 'gap', 'peg'],
    bonuses: ['peag', 'pea', 'gae'],
    rules: [],
  },
  {
    letters: 'boat'.split(''),
    words: ['boat', 'bat', 'boa', 'bot', 'tab'],
    bonuses: ['oat', 'tao', 'bota', 'bato'],
    rules: [],
  },
  {
    letters: 'break'.split(''),
    words: ['baker', 'break', 'brake', 'bake', 'bare', 'bark', 'bear', 'rake'],
    bonuses: ['berk', 'kerb', 'bae', 'erk', 'rea', 'reb'],
    rules: [],
  },
  {
    letters: 'supply'.split(''),
    words: [
      'supply',
      'pulpy',
      'plus',
      'pulp',
      'pulps',
      'pups',
      'ply',
      'sly',
      'spy',
    ],
    bonuses: ['yups', 'pus', 'ups', 'yup', 'yus', 'sup'],
    rules: [],
  },
  {
    letters: 'cream'.split(''),
    words: [
      'cream',
      'acre',
      'came',
      'care',
      'cram',
      'mace',
      'mare',
      'race',
      'ram',
      'ace',
      'arm',
      'car',
      'ear',
    ],
    bonuses: ['acme', 'rec', 'rem', 'mac', 'era', 'cam', 'arc', 'mar'],
    rules: [],
  },
  {
    letters: 'spring'.split(''),
    words: [
      'spring',
      'grips',
      'rings',
      'grin',
      'pigs',
      'pins',
      'rigs',
      'ring',
      'sign',
      'sing',
      'snip',
    ],
    bonuses: [
      'pings',
      'sprig',
      'gins',
      'nips',
      'ping',
      'snig',
      'rins',
      'rips',
      'gips',
    ],
    rules: ['no-3-letter-words'],
  },
  {
    letters: 'bottle'.split(''),
    words: [
      'bottle',
      'belt',
      'bolt',
      'lobe',
      'lot',
      'bot',
      'lob',
      'toe',
      'bet',
    ],
    bonuses: [
      'tote',
      'bel',
      'bol',
      'ole',
      'botel',
      'botte',
      'lotte',
      'obe',
      'tet',
    ],
    rules: [],
  },
  {
    letters: 'sight'.split(''),
    words: [],
    bonuses: [],
    rules: [],
  },
  {
    letters: 'camped'.split(''),
    words: [],
    bonuses: [],
    rules: [],
  },
  {
    letters: 'bread'.split(''),
    words: [],
    bonuses: [],
    rules: [],
  },
  {
    letters: 'blown'.split(''),
    words: [],
    bonuses: [],
    rules: [],
  },
  {
    letters: 'spank'.split(''),
    words: [],
    bonuses: [],
    rules: [],
  },
  {
    letters: 'unite'.split(''),
    words: [
      'unite',
      'untie',
      'tune',
      'unit',
      'net',
      'nut',
      'ten',
      'tie',
      'tin',
    ],
    bonuses: ['nit', 'ute', 'nuit', 'tine'],
    rules: [],
  },
  {
    letters: 'cried'.split(''),
    words: [
      'cried',
      'cider',
      'dicer',
      'riced',
      'dice',
      'dire',
      'iced',
      'rice',
      'ride',
      'die',
      'red',
      'rid',
    ],
    bonuses: ['ire', 'rec', 'rei'],
    rules: [],
  },
  {
    letters: 'toffee'.split(''),
    words: ['toffee', 'feet', 'fee', 'off', 'tee', 'toe'],
    bonuses: ['fet', 'foe', 'oft', 'toff'],
    rules: [],
  },
  {
    letters: 'apple'.split(''),
    words: ['apple', 'leap', 'pale', 'plea', 'ape', 'app', 'lap', 'pea'],
    bonuses: ['ale', 'alp', 'pal', 'pep', 'peal', 'pap'],
    rules: [],
  },
  {
    letters: 'plate'.split(''),
    words: [
      'plate',
      'leapt',
      'petal',
      'late',
      'leap',
      'pale',
      'pelt',
      'plea',
      'tale',
      'tape',
      'teal',
    ],
    bonuses: ['pleat', 'leat', 'lept', 'pate', 'peal', 'peat', 'tael', 'tela'],
    rules: ['no-3-letter-words'],
  },
  {
    letters: 'water'.split(''),
    words: [
      'water',
      'rate',
      'tear',
      'ware',
      'wart',
      'wear',
      'are',
      'awe',
      'ear',
      'eat',
      'raw',
      'tar',
      'rat',
      'tea',
      'war',
      'wet',
    ],
    bonuses: ['era', 'taw', 'tew', 'wat', 'arte', 'tare'],
    rules: [],
  },
  {
    letters: 'clams'.split(''),
    words: ['clams', 'cams', 'calm', 'scam', 'slam', 'cam'],
    bonuses: ['calms', 'alms', 'cals', 'salm', 'macs', 'mac', 'lam'],
    rules: [],
  },
  {
    letters: ''.split(''),
    words: [],
    bonuses: [],
    rules: [],
  },
  {
    letters: ''.split(''),
    words: [],
    bonuses: [],
    rules: [],
  },
  {
    letters: ''.split(''),
    words: [],
    bonuses: [],
    rules: [],
  },
  {
    letters: ''.split(''),
    words: [],
    bonuses: [],
    rules: [],
  },
  {
    letters: ''.split(''),
    words: [],
    bonuses: [],
    rules: [],
  },
  {
    letters: ''.split(''),
    words: [],
    bonuses: [],
    rules: [],
  },
  {
    letters: ''.split(''),
    words: [],
    bonuses: [],
    rules: [],
  },
];

for (const puzzle of puzzles) {
  verifyPuzzle(puzzle);
}

console.log('total puzzles:', puzzles.length);
console.log(
  'total non-empty puzzles:',
  puzzles.filter((p) => p.letters.length > 0).length
);
