import { ItemType } from '@prisma/client';

export const ITEMS = [
  {
    id: '0' as const,
    version: 0,
    code: 'unknown',
    name: 'Unknown',
    type: ItemType.ETCETERA,
    description: 'A mysterious item you should not have. Contact support.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/0.png',
  },
  {
    id: '1' as const,
    version: 0,
    code: 'tokens',
    name: 'Tokens',
    type: ItemType.CURRENCY,
    description: 'The primary currency of the arcade',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1.png',
  },
  {
    id: '2' as const,
    version: 0,
    code: 'small-treasure-chest',
    name: 'Small Treasure Chest',
    type: ItemType.CONSUMABLE,
    description: 'A small treasure chest containing 20 tokens',
    imageUrl: 'https://cdn.charity.games/_items/detailed/2.png',
  },
  {
    id: '3' as const,
    version: 0,
    code: 'small-gift-box',
    name: 'Small Gift Box',
    type: ItemType.CONSUMABLE,
    description: 'A box of 20 tokens that you can give to someone else',
    imageUrl: 'https://cdn.charity.games/_items/detailed/3.png',
  },
  {
    id: '4' as const,
    version: 1,
    code: 'random-steam-key',
    name: 'Random Steam Key',
    type: ItemType.STEAM_KEY,
    expiration: 7, //days
    description: 'A random Steam key for a game. Redeemable on Steam.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/4.png',
  },
  {
    id: '5' as const,
    version: 0,
    code: 'large-treasure-chest',
    name: 'Large Treasure Chest',
    type: ItemType.CONSUMABLE,
    description: 'A large treasure chest containing 100 tokens',
    imageUrl: 'https://cdn.charity.games/_items/detailed/5.png',
  },
];

export type Item = (typeof ITEMS)[number];

export type ItemId = Item['id'];
