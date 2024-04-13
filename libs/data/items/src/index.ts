import { ItemType } from '@prisma/client';

export const ITEMS = [
  {
    id: '0' as const,
    version: 1,
    code: 'unknown',
    name: 'Unknown',
    type: ItemType.ETCETERA,
    description: 'A mysterious item you should not have. Contact support.',
    imageUrl: 'https://cdn.charity.games/_prizes/token2.png',
    iconUrl: 'https://cdn.charity.games/_prizes/token2.png',
  },
  {
    id: '1' as const,
    version: 1,
    code: 'tokens',
    name: 'Tokens',
    type: ItemType.CURRENCY,
    description: 'The primary currency of the arcade',
    imageUrl: 'https://cdn.charity.games/_prizes/token2.png',
    iconUrl: 'https://cdn.charity.games/_prizes/token2.png',
  },
  {
    id: '2' as const,
    version: 1,
    code: 'small-box-of-tokens',
    name: 'Small Box of Tokens',
    type: ItemType.CONSUMABLE,
    description: 'A small box containing 20 tokens',
    imageUrl: 'https://cdn.charity.games/_prizes/token2.png',
    iconUrl: 'https://cdn.charity.games/_prizes/token2.png',
  },
  {
    id: '3' as const,
    version: 1,
    code: 'small-box-of-tokens-offering',
    name: 'Small Box of Tokens Offering',
    type: ItemType.CONSUMABLE,
    description: 'A box of 20 tokens that you can give to someone else',
    imageUrl: 'https://cdn.charity.games/_prizes/token2.png',
    iconUrl: 'https://cdn.charity.games/_prizes/token2.png',
  },
];

export type Item = (typeof ITEMS)[number];

export type ItemId = Item['id'];
