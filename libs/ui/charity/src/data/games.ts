import { GameSchema } from '../types/game-schema';
import { PROTOCOL, ROOT_DOMAIN } from '../env';

export const games: GameSchema[] = [
  {
    id: 'solitaire',
    name: 'Solitaire',
    size: 2,
    developerId: 'charity-games',
    iconUrl: '/assets/games/solitaire/icon.jpg',
    bannerSrc: '/assets/games/solitaire/banner.png',
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
      url: `${PROTOCOL}://solitaire.${ROOT_DOMAIN}`,
    },
    createdAt: new Date('2023-10-16T00:00:00.000Z'),
    updatedAt: new Date('2021-11-23T00:00:00.000Z'),
    description: `
    Solitaire is a card game that you play by yourself. You only need a standard deck of 52 cards to play, so it's a great game to play when traveling alone or just when you are bored and want something to do. There are a lot of different types of solitaire you can play.
  
    ### How to Play Solitaire?
    The goal of solitaire is to get all 52 cards into four piles, each arranged by suit and in order from ace to king. Gameplay varies depending on the type of solitaire you play, but the main goal is always the same: to get all cards into the correct order.
  
    ### Who created Solitaire?
    The first known solitaire game rules were recorded during the Napoleonic era. The author of the first known solitaire rules was Lady Adelaide Cadogan, who wrote her rules in the late 1870s or early 1880s. Lady Cadogan's book was titled Illustrated Games of Patience and it was published in the United Kingdom in 1875. The book was very popular among the upper classes and eventually became known as The Solitaire Bible.
  
    ### Controls
    - Click and drag to move cards
    - Double click to move cards to the foundation
    - Click on the deck to draw cards
    `,
    markets: {},
  },
];
