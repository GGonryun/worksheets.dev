import { GameSchema } from '../types/game-schema';
import {
  EMOJI_WAR_URL,
  NONOGRAMS_URL,
  PUZZLE_WORDS_URL,
  SOLITAIRE_URL,
  WORD_PACK_URL,
  WORD_SMITH_URL,
} from '../env';

export const games: GameSchema[] = [
  {
    id: 'emoji-war',
    name: 'Emoji War',
    size: 1,
    developerId: 'charity-games',
    iconUrl: '/games/emoji-war/icon.jpg',
    bannerUrl: '/games/emoji-war/banner.jpg',
    qualifier: 'hot',
    platforms: ['desktop', 'mobile'],
    tags: ['card', 'board', 'action', 'popular', 'desktop', 'mobile'],
    category: ['card'],
    file: {
      type: 'redirect',
      url: EMOJI_WAR_URL,
    },
    createdAt: new Date('2023-10-01T00:00:00.000Z'),
    updatedAt: new Date('2021-11-07T00:00:00.000Z'),
    markets: {},
    description: `
    Emoji War is a fast-paced card game. Players are randomly dealt movement and attack cards. Players quickly play as many cards as they can at the same time to defeat their opponents. The first player to run out of health loses the game.
    
    ### How to Play Emoji War?
    Emoji War is best played on mobile but it supports desktop too. All you need is a mouse or some fingers (toes would work too though, a nose might be pushing it). Click on the cards to play them. The game will automatically play the cards for you. The goal of the game is to defeat your opponents by playing cards faster than they can.

    ### Controls
    - Click on the cards to play them
    `,
  },
  {
    id: 'solitaire',
    name: 'Solitaire',
    size: 1,
    developerId: 'charity-games',
    iconUrl: '/games/solitaire/icon.jpg',
    bannerUrl: '/games/solitaire/banner.png',
    qualifier: 'new',
    platforms: ['desktop', 'mobile'],
    tags: [
      'card',
      'brain',
      'board',
      'puzzle',
      'popular',
      'new',
      'desktop',
      'mobile',
    ],
    category: ['card'],
    file: {
      type: 'redirect',
      url: SOLITAIRE_URL,
    },
    createdAt: new Date('2023-10-16T00:00:00.000Z'),
    updatedAt: new Date('2021-11-23T00:00:00.000Z'),
    markets: {},
    description: `
    Solitaire is a card game that you play by yourself. You only need a standard deck of 52 cards to play, so it's a great game to play when traveling alone or just when you are bored and want something to do. There are a lot of different types of solitaire you can play.
  
    ### How to Play Solitaire?
    The goal of solitaire is to get all 52 cards into four piles, each arranged by suit and in order from ace to king. Game play varies depending on the type of solitaire you play, but the main goal is always the same: to get all cards into the correct order.
  
    ### Who created Solitaire?
    The first known solitaire game rules were recorded during the Napoleonic era. The author of the first known solitaire rules was Lady Adelaide Cadogan, who wrote her rules in the late 1870s or early 1880s. Lady Cadogan's book was titled Illustrated Games of Patience and it was published in the United Kingdom in 1875. The book was very popular among the upper classes and eventually became known as The Solitaire Bible.
  
    ### Controls
    - Click and drag to move cards
    - Double click to move cards to the foundation
    - Click on the deck to draw cards
    `,
  },
  {
    id: 'word-search',
    name: 'Word Search',
    size: 2,
    developerId: 'charity-games',
    iconUrl: '/games/word-search/icon.jpg',
    bannerUrl: '/games/word-search/banner.jpg',
    qualifier: 'new',
    platforms: ['desktop', 'mobile'],
    tags: ['puzzle', 'word', 'brain', 'desktop', 'mobile'],
    category: ['puzzle'],
    file: {
      type: 'redirect',
      url: 'https://word-search.charity.games',
    },
    createdAt: new Date('2023-10-09T00:00:00.000Z'),
    updatedAt: new Date('2021-11-23T00:00:00.000Z'),
    markets: {},
    description: `
    Word Search is a word puzzle game. The goal of the game is to find all the words hidden in the grid. The words may be placed horizontally, vertically, or diagonally. The words may also be placed backwards.

    ### Who created Word Search?
    The first known word search puzzle was created by Norman E. Gibat in 1968. Gibat was a professor of mathematics at the University of California, Berkeley. He created the puzzle as a way to help his students learn new vocabulary words.

    ### Why play Word Search?
    Word Search is a great way to improve your vocabulary. It's also a fun way to pass the time. You can play it anywhere, anytime. All you need is our website and a device with an internet connection.

    ### Controls
    - Swipe your finger across the letters to form words
    
    `,
  },
  {
    id: 'puzzle-words',
    name: 'Puzzle Words',
    size: 3,
    developerId: 'charity-games',
    iconUrl: '/games/puzzle-words/icon.jpg',
    bannerUrl: '/games/puzzle-words/banner.jpg',
    qualifier: 'hot',
    platforms: ['desktop', 'mobile'],
    tags: ['puzzle', 'word', 'brain', 'popular', 'desktop', 'mobile'],
    category: ['puzzle'],
    file: {
      type: 'redirect',
      url: PUZZLE_WORDS_URL,
    },
    createdAt: new Date('2023-10-07T00:00:00.000Z'),
    updatedAt: new Date('2021-11-23T00:00:00.000Z'),
    markets: {},
    description: `
    Puzzle Words is a word anagram game. The goal of the game is to find all the valid words that can be made from the given letters.

    ### How to Play Puzzle Words?
    The goal of the game is to find all the valid words that can be made from the given letters. There are hundreds of levels but each one must be beaten in order. The game starts off easy but gets harder as you progress through the levels.

    - Swipe your finger across the letters to form words
    - Tap the shuffle button to shuffle the letters
    `,
  },
  {
    id: 'word-pack',
    name: 'Word Pack',
    size: 1,
    developerId: 'charity-games',
    iconUrl: '/games/word-pack/icon.jpg',
    bannerUrl: '/games/word-pack/banner.jpg',
    qualifier: 'new',
    platforms: ['desktop', 'mobile'],
    tags: ['puzzle', 'word', 'brain', 'desktop', 'mobile'],
    category: ['puzzle'],
    file: {
      type: 'redirect',
      url: WORD_PACK_URL,
    },
    createdAt: new Date('2023-10-21T00:00:00.000Z'),
    updatedAt: new Date('2021-11-23T00:00:00.000Z'),
    markets: {},
    description: `
    Word Pack is a twist on the classic word search game. The goal of the game is to find all the words hidden in the grid. The words may be placed horizontally, vertically, or diagonally. The words may also be placed backwards. You are given all the words that you need to place. The hard part is figuring out where to place them!

    ### Who created Word Pack?
    No idea. It's a mystery.

    ### Is Word Pack hard?
    Word Pack is not very hard. It's just a little bit tricky. The words are all there, you just have to find them. The game starts off easy but gets harder as you progress through the levels.

    ### Controls
    - Click on a word and then click on the grid to place it.
    `,
  },
  {
    id: 'word-smith',
    name: 'Word Smith',
    size: 1,
    developerId: 'charity-games',
    iconUrl: '/games/word-smith/icon.jpg',
    bannerUrl: '/games/word-smith/banner.png',
    qualifier: 'new',
    platforms: ['desktop', 'mobile'],
    tags: ['puzzle', 'word', 'brain', 'desktop', 'mobile'],
    category: ['puzzle'],
    file: {
      type: 'redirect',
      url: WORD_SMITH_URL,
    },
    createdAt: new Date('2023-10-30T00:00:00.000Z'),
    updatedAt: new Date('2021-11-23T00:00:00.000Z'),
    markets: {},
    description: `
    Word Smith is a word anagram game. You are given multiple horizontal lines of letters. The goal of the game is to find the secret word that fits in the vertical line.
    
    ### Why play Word Smith?
    It'll help make your brain bigger. It's also a fun way to pass the time. You can play it anywhere, anytime.

    ### Why should I not play Word Smith?
    It's addictive. You might get addicted to it and spend all your time playing it instead of doing something productive.

    ### Controls
    A single vertical line appears across the middle of the screen. You must drag the letters up and down to form words that fit in the vertical line. The words must be valid English words.

    - Swipe your finger across the horizontal lines to form words
    `,
  },
  {
    id: 'nonograms',
    name: 'Nonograms',
    size: 1,
    developerId: 'charity-games',
    iconUrl: '/games/nonograms/icon.jpg',
    bannerUrl: '/games/nonograms/banner.png',
    qualifier: 'new',
    platforms: ['desktop', 'mobile'],
    tags: ['puzzle', 'brain', 'desktop', 'mobile'],
    category: ['puzzle'],
    file: {
      type: 'redirect',
      url: NONOGRAMS_URL,
    },
    createdAt: new Date('2023-11-01T00:00:00.000Z'),
    updatedAt: new Date('2021-11-01T00:00:00.000Z'),
    markets: {},
    description: `
    Nonograms, also known as Japanese Crossword puzzles, are a type of puzzle in which the player must fill in the correct squares to reveal a hidden picture. The player is given a grid with numbers along the top and left side. The numbers indicate how many squares in that row or column must be filled in. The player must use logic to figure out which squares to fill in and which to leave blank.

    ### Who created Nonograms?
    Nonograms were created by the Japanese puzzle company Nikoli in 1987. The name "Nonogram" comes from the Japanese words "nō" (meaning "picture") and "gram" (meaning "puzzle").

    ### Why play Nonograms?
    Nonograms are a great way to pass the time. They are also a great way to exercise your brain. They can help improve your memory, concentration, and problem solving skills.

    ### Are Nonograms fun?
    Nonograms are fun if you like puzzles. If you don't like puzzles, then you probably won't like nonograms.

    ### Are Nonograms hard?
    Nonograms are not very hard. They are easy to learn but hard to master. The puzzles start off easy but get harder as you progress through the levels. There are lots of pictures to unlock so you will never run out of puzzles to solve.

    ### Controls
    - Click on the squares to fill them in or remove them
    `,
  },
];
