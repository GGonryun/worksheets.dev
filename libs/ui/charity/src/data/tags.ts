import { GameTag, TagSchema } from '../types/tag-schema';

export const tags: Record<GameTag, TagSchema> = {
  board: {
    id: 'board',
    name: 'Board Games',
    iconUrl: '/games/categories/board.svg',
    relatedTags: ['puzzle', 'brain', 'card'],
    description: `
    ## Board Games

    ### What are board games?
    Board games are tabletop games that typically use pieces moved or placed on a pre-marked board (playing surface) and often include elements of table, card, role-playing, and miniatures games as well.

    ### What are the most popular board games?
    The most popular board games currently trending are:
    - [Solitaire](/games/solitaire)

    ### How many people are needed for a board?
    Most board games require at least two players, while others are designed for solo play. Some board games require groups of people to work together, while others pit players against each other. [Solitaire](/games/solitaire) is a popular single-player card game. Chess is a two-player strategy board game played on a checkered board with 64 squares arranged in an 8x8 grid.

    ### What types of board games are there?
    There are many types of board games. There are [card games](/tags/cards), dice games, strategy games, and more. Each type of game has its own rules and objectives. Some games are played with a deck of cards, while others use dice or other objects. Some games are played on a board, while others are played on a table or other surface.

    ### What are the rules of board games?
    The rules of board games vary from game to game. Some games have simple rules, while others have more complex rules. Some games are played with a deck of cards, while others use dice or other objects. Some games are played on a board, while others are played on a table or other surface.

    ### What are the best board games for kids?
    If the game is too complicated, kids will lose interest. If the game is too easy, kids will get bored. The best board games for kids are those that are easy to learn and fun to play.
    `,
  },
  word: {
    id: 'word',
    name: 'Word Games',
    iconUrl: '/games/categories/word.svg',
    relatedTags: ['puzzle', 'popular', 'brain'],
    description: `
    ## Word Games
    `,
  },
  action: {
    id: 'action',
    name: 'Action Games',
    iconUrl: '/games/categories/action.svg',
    relatedTags: [],
    description: `
    ## Action Games
    `,
  },
  puzzle: {
    id: 'puzzle',
    name: 'Puzzle Games',
    iconUrl: '/games/categories/puzzle.svg',
    relatedTags: ['board', 'brain'],
    description: `
    ## Puzzle Games
    `,
  },
  brain: {
    id: 'brain',
    name: 'Brain Games',
    iconUrl: '/games/categories/brain.svg',
    relatedTags: ['board', 'puzzle'],
    description: `
    ## Brain Games
    `,
  },
  card: {
    id: 'card',
    name: 'Card Games',
    iconUrl: '/games/categories/card.svg',
    relatedTags: ['board', 'brain'],
    description: `
    ## Card Games
    `,
  },
  new: {
    id: 'new',
    name: 'New Games',
    iconUrl: '/games/categories/new.svg',
    relatedTags: ['popular'],
    description: `
    ## New Games
    `,
  },
  popular: {
    id: 'popular',
    name: 'Popular Games',
    iconUrl: '/games/categories/popular.svg',
    relatedTags: ['mobile', 'new'],
    description: `
    ## Popular Games
    `,
  },
  mobile: {
    id: 'mobile',
    name: 'Mobile Games',
    iconUrl: '/games/categories/mobile.svg',
    relatedTags: ['desktop', 'popular'],
    description: `
    ## Mobile Games
    `,
  },
  desktop: {
    id: 'desktop',
    name: 'Desktop Games',
    iconUrl: '/games/categories/desktop.svg',
    relatedTags: ['mobile', 'popular'],
    description: `
    ## Desktop Games
    `,
  },
};

export const tagIds = Object.keys(tags) as GameTag[];
export const tagSchemas = Object.values(tags) as TagSchema[];
