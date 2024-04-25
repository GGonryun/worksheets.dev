import { ItemType } from '@prisma/client';

export const ITEMS = [
  {
    id: '0' as const,
    version: 3,
    code: 'unknown',
    name: 'Unknown',
    type: ItemType.ETCETERA,
    sell: 1,
    description: 'A mysterious item you should not have. Contact support.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/0.png',
  },
  {
    id: '1' as const,
    version: 3,
    code: 'tokens',
    name: 'Tokens',
    type: ItemType.CURRENCY,
    sell: 1,
    description: 'The primary currency of the arcade',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1.png',
  },
  {
    id: '2' as const,
    version: 3,
    code: 'small-treasure-chest',
    name: 'Small Treasure Chest',
    type: ItemType.CONSUMABLE,
    sell: 1,
    description: 'A small treasure chest containing 1 to 20 tokens',
    imageUrl: 'https://cdn.charity.games/_items/detailed/2.png',
  },
  {
    id: '3' as const,
    version: 3,
    code: 'small-gift-box',
    name: 'Small Gift Box',
    type: ItemType.SHARABLE,
    sell: 1,
    description:
      'A box of 25 tokens that you can give to someone else. Sharing this gift will earn you 10 tokens.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/3.png',
  },
  {
    id: '4' as const,
    version: 3,
    code: 'random-steam-key',
    name: 'Random Steam Key',
    type: ItemType.STEAM_KEY,
    expiration: 7, //days
    sell: 1,
    description: 'A random Steam key for a game. Redeemable on Steam.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/4.png',
  },
  {
    id: '5' as const,
    version: 3,
    code: 'large-treasure-chest',
    name: 'Large Treasure Chest',
    type: ItemType.CONSUMABLE,
    sell: 1,
    description: 'A large treasure chest containing 10 to 100 tokens',
    imageUrl: 'https://cdn.charity.games/_items/detailed/5.png',
  },
  {
    id: '6' as const,
    version: 3,
    code: 'large-gift-box',
    name: 'Large Gift Box',
    type: ItemType.SHARABLE,
    sell: 1,
    description:
      'A box of 50 tokens that you can give to someone else. Sharing this gift will earn you 25 tokens.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/6.png',
  },
  {
    id: '7' as const,
    version: 3,
    code: 'love-letter',
    name: 'Love Letter',
    type: ItemType.SHARABLE,
    sell: 1,
    description:
      'A love letter with 10 tokens that you can share with a friend. Sharing this gift will earn you 10 tokens.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/7.png',
  },
  {
    id: '1000' as const,
    version: 3,
    code: 'weapon-crate',
    name: 'Weapon Crate',
    type: ItemType.CONSUMABLE,
    sell: 1,
    description: 'A crate containing a random combat item',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1000.png',
  },
  {
    id: '1001' as const,
    version: 3,
    code: 'dagger',
    name: 'Dagger',
    type: ItemType.COMBAT,
    sell: 1,
    description: 'A small dagger that deals 5 damage',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1001.png',
  },
  {
    id: '1002' as const,
    version: 3,
    code: 'sword',
    name: 'Sword',
    type: ItemType.COMBAT,
    sell: 1,
    description: 'A short sword that deals 6 damage',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1002.png',
  },
  {
    id: '1003' as const,
    version: 3,
    code: 'axe',
    name: 'Axe',
    type: ItemType.COMBAT,
    sell: 1,
    description: 'A small axe that deals 7 damage',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1003.png',
  },
  {
    id: '1004' as const,
    version: 3,
    code: 'spear',
    name: 'Spear',
    type: ItemType.COMBAT,
    sell: 1,
    description: 'A long spear that deals 8 damage',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1004.png',
  },
  {
    id: '10001' as const,
    version: 3,
    code: 'apple',
    name: 'Apple',
    type: ItemType.ETCETERA,
    sell: 3,
    description: 'A juicy apple that can be eaten to restore health',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10001.png',
  },
  {
    id: '10002' as const,
    version: 3,
    code: 'empty-bottle',
    name: 'Empty Bottle',
    type: ItemType.ETCETERA,
    sell: 2,
    description: 'An empty bottle that can be filled with liquid',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10002.png',
  },
  {
    id: '10003' as const,
    version: 3,
    code: 'smelly-jelly',
    name: 'Smelly Jelly',
    type: ItemType.ETCETERA,
    sell: 4,
    description: 'A jar of smelly jelly. I wonder what it tastes like?',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10003.png',
  },
  {
    id: '10004' as const,
    version: 3,
    code: 'sticky-slime',
    name: 'Sticky Slime',
    type: ItemType.ETCETERA,
    sell: 3,
    description: "Mysterious sticky slime. It's not edible. Probably.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10004.png',
  },
];

export type Item = (typeof ITEMS)[number];

export type ItemId = Item['id'];

export const COMBAT_ITEMS = ITEMS.filter(
  (item): item is Extract<Item, { type: 'COMBAT' }> =>
    item.type === ItemType.COMBAT
);

export const DROPPABLE_ITEMS = ITEMS.filter(
  (
    item
  ): item is Extract<Item, { type: 'COMBAT' | 'CONSUMABLE' | 'SHARABLE' }> =>
    item.type === ItemType.COMBAT ||
    item.type === ItemType.CONSUMABLE ||
    item.type === ItemType.SHARABLE
);

export type DroppableItemId = Extract<
  Item,
  { type: 'COMBAT' | 'CONSUMABLE' | 'SHARABLE' }
>['id'];

/**
 * The drop rate for each item is determined by the number of tickets in the lottery.
 * This keeps drop rates proportional to the number of items in the lottery.
 */
export const DROP_LOTTERY: Record<DroppableItemId, number> = {
  2: 1,
  3: 1,
  5: 1,
  6: 1,
  7: 1,
  1000: 1,
  1001: 2,
  1002: 2,
  1003: 2,
  1004: 2,
};

export const SHARE_RATES: Record<
  SharableItemId,
  { user: number; friend: number }
> = {
  3: {
    user: 10,
    friend: 25,
  },
  6: {
    user: 25,
    friend: 50,
  },
  7: {
    user: 10,
    friend: 10,
  },
};

export type RandomTokenQuantity = { min: number; max: number };
export type LotteryItems = { items: Item[] };
export type ConsumptionRate = LotteryItems | RandomTokenQuantity;
export const CONSUMPTION_RATES: Record<ConsumableItemId, ConsumptionRate> = {
  2: { min: 10, max: 20 },
  5: { min: 10, max: 100 },
  1000: { items: COMBAT_ITEMS },
};

export const isLotteryItems = (rate: ConsumptionRate): rate is LotteryItems =>
  'items' in rate && Array.isArray(rate.items);

export const isRandomTokenQuantity = (
  rate: ConsumptionRate
): rate is RandomTokenQuantity => 'min' in rate && 'max' in rate;

export type SteamKeyItems = Extract<Item, { type: 'STEAM_KEY' }>;
export type SteamKeyItemId = SteamKeyItems['id'];

export type SharableItems = Extract<Item, { type: 'SHARABLE' }>;
export type SharableItemId = SharableItems['id'];

export type CombatItems = Extract<Item, { type: 'COMBAT' }>;
export type CombatItemId = CombatItems['id'];

export type ConsumableItems = Extract<Item, { type: 'CONSUMABLE' }>;
export type ConsumableItemId = ConsumableItems['id'];

export type EtCeteraItems = Extract<Item, { type: 'ETCETERA' }>;
export type EtCeteraItemId = EtCeteraItems['id'];

export type CurrencyItems = Extract<Item, { type: 'CURRENCY' }>;
export type CurrencyItemId = CurrencyItems['id'];
