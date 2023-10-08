import { dictionaryByLength } from '@worksheets/ui-games';

const x = true,
  o = false;

export type Level = {
  title: string;
  layout: boolean[][];
  dictionary: Record<number, string[]>;
  puzzle?: string;
};

export const empty5x5Layout = [
  [o, o, o, o, o],
  [o, o, o, o, o],
  [o, o, o, o, o],
  [o, o, o, o, o],
  [o, o, o, o, o],
];

export const empty12x12Layout = [
  [o, o, o, o, o, o, o, o, o, o, o, o],
  [o, o, o, o, o, o, o, o, o, o, o, o],
  [o, o, o, o, o, o, o, o, o, o, o, o],
  [o, o, o, o, o, o, o, o, o, o, o, o],
  [o, o, o, o, o, o, o, o, o, o, o, o],
  [o, o, o, o, o, o, o, o, o, o, o, o],
  [o, o, o, o, o, o, o, o, o, o, o, o],
  [o, o, o, o, o, o, o, o, o, o, o, o],
  [o, o, o, o, o, o, o, o, o, o, o, o],
  [o, o, o, o, o, o, o, o, o, o, o, o],
  [o, o, o, o, o, o, o, o, o, o, o, o],
  [o, o, o, o, o, o, o, o, o, o, o, o],
];

export const puzzles: Level[] = [
  {
    title: 'The basics',
    layout: [
      [o, o, o, o, o],
      [o, o, o, o, o],
      [o, x, x, x, o],
      [o, o, o, o, o],
      [o, o, o, o, o],
    ],
    dictionary: dictionaryByLength,
  },
  {
    title: 'Hello world',
    layout: [
      [o, o, o, x, o],
      [o, o, o, x, o],
      [o, o, o, x, o],
      [x, x, x, x, x],
      [o, o, o, x, o],
    ],
    dictionary: { 5: ['hello', 'world'] },
  },
  {
    title: 'The letter N',
    layout: [
      [o, o, o, o, o],
      [o, x, x, x, o],
      [o, x, o, x, o],
      [o, x, o, x, o],
      [o, o, o, o, o],
    ],
    dictionary: dictionaryByLength,
  },
  {
    title: 'A square, how original',
    layout: [
      [o, o, o, o, o],
      [o, x, x, x, o],
      [o, x, o, x, o],
      [o, x, x, x, o],
      [o, o, o, o, o],
    ],
    dictionary: dictionaryByLength,
  },
  {
    title: 'The letter A',
    layout: [
      [o, x, x, x, o],
      [o, x, o, x, o],
      [o, x, x, x, o],
      [o, x, o, x, o],
      [o, o, o, o, o],
    ],
    dictionary: dictionaryByLength,
  },

  {
    title: 'We need your help',
    layout: [
      //empty
      [x, x, x, o, o],
      [x, o, x, o, o],
      [x, o, x, x, x],
      [x, o, o, o, x],
      [x, o, o, o, x],
    ],
    dictionary: { ...dictionaryByLength, [5]: ['water'] },
  },
  {
    title: 'Donate water to charity',
    layout: [
      //empty
      [o, x, x, x, o],
      [o, o, x, o, o],
      [x, o, x, x, x],
      [x, x, x, o, x],
      [x, o, o, o, x],
    ],
    dictionary: { ...dictionaryByLength, [4]: ['help'] },
  },
  {
    title: 'Every drop counts',
    layout: [
      [o, x, o, o, o, x],
      [x, x, x, x, o, x],
      [o, x, o, x, o, x],
      [o, x, o, x, x, x],
      [x, x, x, o, o, x],
      [o, x, o, x, x, x],
    ],
    dictionary: { ...dictionaryByLength, 6: ['sheets', 'donate'], 4: ['work'] },
  },
  {
    title: 'The tutorial is over',
    layout: [
      [x, x, x, x, x],
      [x, o, x, o, x],
      [x, x, x, x, x],
      [x, o, x, o, x],
      [x, x, x, x, x],
    ],
    dictionary: { ...dictionaryByLength },
  },
  {
    title: "It's time to get serious",
    layout: [
      [x, x, x, x, o],
      [x, o, o, x, o],
      [x, x, x, x, x],
      [x, o, x, o, o],
      [x, x, x, x, x],
    ],
    dictionary: { ...dictionaryByLength },
  },
  {
    title: "How's this?",
    layout: [
      [x, x, x, x, o, x],
      [x, o, o, x, o, x],
      [x, x, x, x, x, x],
      [o, o, x, o, x, o],
      [o, o, x, o, x, o],
      [x, x, x, x, x, x],
    ],
    dictionary: { ...dictionaryByLength },
  },
  {
    title: 'Support the cause',
    layout: [
      [x, x, x, x, x, x],
      [x, o, o, x, o, o],
      [x, o, x, x, x, x],
      [x, x, x, o, x, o],
      [x, o, x, x, x, o],
      [x, x, x, o, x, o],
    ],
    dictionary: { ...dictionaryByLength },
  },
  {
    title: 'The ladder',
    layout: [
      [o, o, x, x, x, x, o, o],
      [x, x, x, o, o, x, x, x],
      [o, o, x, x, x, x, o, o],
      [o, o, x, o, o, x, o, o],
      [o, o, x, x, x, x, o, o],
      [o, o, x, o, o, x, o, o],
      [o, o, x, x, x, x, o, o],
      [x, x, x, o, o, x, x, x],
    ],
    dictionary: dictionaryByLength,
  },
  {
    title: 'Substance',
    layout: [
      [x, x, x, x, o, o],
      [x, o, o, o, o, o],
      [x, o, x, o, o, x],
      [x, x, x, x, o, x],
      [o, o, x, o, o, x],
      [o, o, x, x, x, x],
    ],
    dictionary: dictionaryByLength,
  },

  {
    title: 'What is this?',
    layout: [
      [x, x, x, o, x, o, o],
      [x, o, x, o, x, x, x],
      [x, x, x, o, x, o, o],
      [x, o, o, o, x, x, x],
      [x, x, x, x, o, o, x],
      [x, o, x, o, o, o, x],
      [o, x, x, x, x, x, x],
    ],
    dictionary: dictionaryByLength,
  },
  {
    title: 'Take one',
    layout: [
      [x, x, x, x, x, x, x],
      [x, o, o, x, o, o, o],
      [x, o, o, x, x, x, x],
      [x, x, x, o, x, o, x],
      [x, o, x, x, x, o, x],
      [x, o, x, o, x, o, o],
      [x, x, x, o, x, x, x],
    ],
    dictionary: dictionaryByLength,
  },
  {
    title: 'The crosshair',
    layout: [
      [x, x, x, x, x, x, x],
      [x, o, o, x, o, o, x],
      [x, o, x, x, x, o, x],
      [x, x, x, o, x, x, x],
      [x, o, x, x, x, o, x],
      [x, o, o, x, o, o, x],
      [x, x, x, x, x, x, x],
    ],
    dictionary: dictionaryByLength,
  },
  {
    title: 'Compression',
    layout: [
      [o, o, o, o, o],
      [o, x, x, x, o],
      [o, x, x, x, o],
      [o, x, x, x, o],
      [o, o, o, o, o],
    ],
    dictionary: dictionaryByLength,
  },
  {
    title: 'Deep tilt',
    layout: [
      [o, x, x, x, x, x, o, o, o, o],
      [o, x, o, o, o, x, o, o, o, o],
      [o, x, o, o, x, x, x, x, x, o],
      [o, x, o, o, o, x, o, o, x, o],
      [o, x, o, o, x, o, x, o, x, o],
      [o, o, o, x, x, x, x, o, x, o],
      [o, x, o, o, x, o, x, x, x, x],
      [o, x, x, x, x, o, x, o, o, x],
      [o, x, o, o, o, o, x, o, o, x],
      [o, x, o, o, o, o, o, o, o, x],
    ],
    dictionary: dictionaryByLength,
  },

  {
    title: 'The bay',
    layout: [
      [x, o, x, o, x, o, x, o, o, x],
      [x, o, x, x, x, o, x, x, x, x],
      [x, o, x, o, x, x, x, o, o, x],
      [x, o, x, o, o, o, o, o, o, x],
      [x, x, x, x, x, o, x, x, x, x],
      [o, o, x, o, x, o, x, o, o, o],
      [o, x, o, x, x, x, x, o, o, x],
      [o, x, o, x, o, o, x, o, o, x],
      [o, x, x, x, o, o, x, o, o, x],
      [o, o, o, o, o, o, x, x, x, x],
    ],
    dictionary: dictionaryByLength,
  },
  {
    title: 'Take 3',
    layout: [
      [x, x, x, x, o, o, o, o, o, o],
      [o, o, x, o, o, o, o, x, x, x],
      [o, o, x, x, x, x, o, o, x, o],
      [o, o, x, o, o, x, o, x, x, x],
      [o, x, x, x, x, x, o, x, o, o],
      [x, o, o, o, x, o, o, x, o, o],
      [x, x, x, x, x, o, o, x, o, o],
      [x, o, x, o, o, x, x, x, x, o],
      [o, o, x, x, x, x, o, o, o, o],
      [o, o, o, o, o, x, o, o, o, o],
    ],
    dictionary: dictionaryByLength,
  },
  {
    title: "Something's missing...",
    layout: [
      [o, o, o, o, o, x, o],
      [o, x, x, x, o, x, o],
      [o, x, o, x, o, x, o],
      [o, x, x, x, o, o, o],
      [o, o, o, o, x, x, x],
      [o, x, x, x, o, o, o],
      [o, o, o, o, x, x, x],
    ],
    dictionary: dictionaryByLength,
  },
  {
    title: "They call it 'Modern Art'",
    layout: [
      [x, x, x, x, x, x, x, x],
      [x, o, x, o, o, o, o, x],
      [x, o, x, o, x, x, x, x],
      [x, x, x, x, o, x, o, x],
      [x, o, o, x, o, x, o, x],
      [x, x, x, x, x, o, o, x],
      [x, o, x, o, x, o, o, x],
      [x, x, x, x, x, x, x, x],
    ],
    dictionary: dictionaryByLength,
  },
  {
    title: 'That could have been really bad',
    layout: [
      [x, x, x, o, x, x, x],
      [x, o, x, o, x, o, x],
      [x, x, x, x, x, x, x],
      [o, o, x, o, x, o, o],
      [x, x, x, x, x, x, x],
      [x, o, x, o, x, o, x],
      [x, x, x, o, x, x, x],
    ],
    dictionary: dictionaryByLength,
  },
  {
    title: 'Three square',
    layout: [
      [o, o, x, x, x, o, o],
      [o, o, x, o, x, o, o],
      [o, o, x, x, x, o, o],
      [o, o, o, o, o, o, o],
      [x, x, x, o, x, x, x],
      [x, o, x, o, x, o, x],
      [x, x, x, o, x, x, x],
    ],
    dictionary: dictionaryByLength,
  },

  {
    title: 'Four Square',
    layout: [
      [x, x, x, x, o, x, x, x, x],
      [x, o, o, x, o, x, o, o, x],
      [x, o, o, x, o, x, o, o, x],
      [x, x, x, x, o, x, x, x, x],
      [o, o, o, o, o, o, o, o, o],
      [x, x, x, x, o, x, x, x, x],
      [x, o, o, x, o, x, o, o, x],
      [x, o, o, x, o, x, o, o, x],
      [x, x, x, x, o, x, x, x, x],
    ],
    dictionary: dictionaryByLength,
  },

  {
    title: 'Brilliance',
    layout: [
      [x, x, x, o, x, x, x],
      [x, o, x, x, x, o, x],
      [x, x, x, o, x, x, x],
      [o, x, o, o, o, x, o],
      [x, x, x, o, x, x, x],
      [x, o, x, x, x, o, x],
      [x, x, x, o, x, x, x],
    ],
    dictionary: {
      3: [
        'add',
        'ctn',
        'eds',
        'eon',
        'fug',
        'git',
        'gnu',
        'has',
        'imp',
        'inf',
        'ken',
        'mam',
        'mks',
        'mph',
        'nah',
        'pug',
        'sch',
        'sum',
        'tee',
        'use',
      ],
    },
    puzzle:
      '{"id":15,"title":"Brilliance","grid":[["m","a","m","","g","i","t"],["p","","k","e","n","","e"],["h","a","s","","u","s","e"],["","d","","","","u",""],["e","d","s","","i","m","p"],["o","","c","t","n","","u"],["n","a","h","","f","u","g"]],"layout":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],"slots":"{\\"down\\":[\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"down\\\\\\",\\\\\\"row\\\\\\":0,\\\\\\"column\\\\\\":0,\\\\\\"possibilities\\\\\\":[\\\\\\"mph\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"down\\\\\\",\\\\\\"row\\\\\\":0,\\\\\\"column\\\\\\":2,\\\\\\"possibilities\\\\\\":[\\\\\\"mks\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"down\\\\\\",\\\\\\"row\\\\\\":0,\\\\\\"column\\\\\\":4,\\\\\\"possibilities\\\\\\":[\\\\\\"gnu\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"down\\\\\\",\\\\\\"row\\\\\\":0,\\\\\\"column\\\\\\":6,\\\\\\"possibilities\\\\\\":[\\\\\\"tee\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"down\\\\\\",\\\\\\"row\\\\\\":2,\\\\\\"column\\\\\\":1,\\\\\\"possibilities\\\\\\":[\\\\\\"add\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"down\\\\\\",\\\\\\"row\\\\\\":2,\\\\\\"column\\\\\\":5,\\\\\\"possibilities\\\\\\":[\\\\\\"sum\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"down\\\\\\",\\\\\\"row\\\\\\":4,\\\\\\"column\\\\\\":0,\\\\\\"possibilities\\\\\\":[\\\\\\"eon\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"down\\\\\\",\\\\\\"row\\\\\\":4,\\\\\\"column\\\\\\":2,\\\\\\"possibilities\\\\\\":[\\\\\\"sch\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"down\\\\\\",\\\\\\"row\\\\\\":4,\\\\\\"column\\\\\\":4,\\\\\\"possibilities\\\\\\":[\\\\\\"inf\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"down\\\\\\",\\\\\\"row\\\\\\":4,\\\\\\"column\\\\\\":6,\\\\\\"possibilities\\\\\\":[\\\\\\"pug\\\\\\"]}\\"],\\"right\\":[\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"right\\\\\\",\\\\\\"row\\\\\\":0,\\\\\\"column\\\\\\":0,\\\\\\"possibilities\\\\\\":[\\\\\\"mam\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"right\\\\\\",\\\\\\"row\\\\\\":0,\\\\\\"column\\\\\\":4,\\\\\\"possibilities\\\\\\":[\\\\\\"git\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"right\\\\\\",\\\\\\"row\\\\\\":1,\\\\\\"column\\\\\\":2,\\\\\\"possibilities\\\\\\":[\\\\\\"ken\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"right\\\\\\",\\\\\\"row\\\\\\":2,\\\\\\"column\\\\\\":0,\\\\\\"possibilities\\\\\\":[\\\\\\"has\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"right\\\\\\",\\\\\\"row\\\\\\":2,\\\\\\"column\\\\\\":4,\\\\\\"possibilities\\\\\\":[\\\\\\"use\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"right\\\\\\",\\\\\\"row\\\\\\":4,\\\\\\"column\\\\\\":0,\\\\\\"possibilities\\\\\\":[\\\\\\"eds\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"right\\\\\\",\\\\\\"row\\\\\\":4,\\\\\\"column\\\\\\":4,\\\\\\"possibilities\\\\\\":[\\\\\\"imp\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"right\\\\\\",\\\\\\"row\\\\\\":5,\\\\\\"column\\\\\\":2,\\\\\\"possibilities\\\\\\":[\\\\\\"ctn\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"right\\\\\\",\\\\\\"row\\\\\\":6,\\\\\\"column\\\\\\":0,\\\\\\"possibilities\\\\\\":[\\\\\\"nah\\\\\\"]}\\",\\"{\\\\\\"grid\\\\\\":[[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true],[false,true,false,false,false,true,false],[true,true,true,false,true,true,true],[true,false,true,true,true,false,true],[true,true,true,false,true,true,true]],\\\\\\"direction\\\\\\":\\\\\\"right\\\\\\",\\\\\\"row\\\\\\":6,\\\\\\"column\\\\\\":4,\\\\\\"possibilities\\\\\\":[\\\\\\"fug\\\\\\"]}\\"]}"}',
  },
];
