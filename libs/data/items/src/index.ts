export const ITEM_DESCRIPTIONS = {
  tokens: {
    id: 'tokens',
    name: 'Tokens',
    description: 'The primary currency of the arcade',
    imageUrl: 'https://cdn.charity.games/_prizes/token2.png',
  },
  'small-box-of-tokens': {
    id: 'small-box-of-tokens',
    name: 'Small Box of Tokens',
    description: 'A small box containing 20 tokens',
    imageUrl: 'https://cdn.charity.games/_prizes/token2.png',
  },
  'small-box-of-tokens-offering': {
    id: 'small-box-of-tokens-offering',
    name: 'Small Box of Tokens Offering',
    description: 'A box of 20 tokens that you can give to someone else',
    imageUrl: 'https://cdn.charity.games/_prizes/token2.png',
  },
} as const;

export type ItemId = keyof typeof ITEM_DESCRIPTIONS;

export const ITEM_IDS = Object.keys(ITEM_DESCRIPTIONS) as ItemId[];
