import { ItemType } from '@prisma/client';

export const ITEMS = [
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
    id: '1005' as const,
    version: 3,
    code: 'club',
    name: 'Club',
    type: ItemType.COMBAT,
    sell: 1,
    description: 'A wooden club that deals 5 damage',
    imageUrl: 'https://cdn.charity.games/_items/detailed/1005.png',
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
  {
    id: '10005' as const,
    version: 3,
    code: 'emerald',
    name: 'Emerald',
    type: ItemType.ETCETERA,
    sell: 200,
    description: "A precious emerald gemstone. It's worth a lot of tokens.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10005.png',
  },
  {
    id: '10006' as const,
    version: 3,
    code: 'fur-ball',
    name: 'Fur Ball',
    type: ItemType.ETCETERA,
    sell: 3,
    description:
      'A small fur ball that can be used for crafting. It looks soft and fluffy.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10006.png',
  },
  {
    id: '10007' as const,
    version: 3,
    code: 'green-herb',
    name: 'Green Herb',
    type: ItemType.ETCETERA,
    sell: 6,
    description:
      'A green herb with medicinal properties. It can be used to restore health. It smells fresh and minty.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10007.png',
  },
  {
    id: '10008' as const,
    version: 3,
    code: 'clover',
    name: 'Clover',
    type: ItemType.ETCETERA,
    sell: 4,
    description:
      "A pot of clover that brings good luck. I don't see any 4 leaf clovers though. It needs some water.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10008.png',
  },
  {
    id: '10009' as const,
    version: 3,
    code: 'feather',
    name: 'Feather',
    type: ItemType.ETCETERA,
    sell: 7,
    description:
      "A soft feather that can be used for crafting. It looks light and delicate. It's a bit dusty.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10009.png',
  },
  {
    id: '10010' as const,
    version: 3,
    code: 'orange',
    name: 'Orange',
    type: ItemType.ETCETERA,
    sell: 6,
    description:
      "A juicy citrus fruit with a yellowish or reddish rind. It's a bit squishy. It's ripe and ready to eat.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10010.png',
  },
  {
    id: '10011' as const,
    version: 3,
    code: 'furry-tail',
    name: 'Furry Tail',
    type: ItemType.ETCETERA,
    sell: 2,
    description:
      "A furry tail that came off a small animal. It's dirty and smells a bit funky. I wouldn't suggest touching it.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10011.png',
  },
  {
    id: '10012' as const,
    version: 3,
    code: 'red-meat-slab',
    name: 'Red Meat Slab',
    type: ItemType.ETCETERA,
    sell: 15,
    description:
      "A slab of red meat that can be cooked and eaten. It looks fresh and juicy. I think I'll have mine medium rare.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10012.png',
  },
  {
    id: '10013' as const,
    version: 3,
    code: 'charcon-ingot',
    name: 'Charcon Ingot',
    type: ItemType.ETCETERA,
    sell: 25,
    description:
      "A grey metal ingot that is used to strengthen weapons and armor. It's heavy and slightly warm to the touch.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10013.png',
  },
  {
    id: '10014' as const,
    version: 3,
    code: 'cotton-shirt',
    name: 'Cotton Shirt',
    type: ItemType.ETCETERA,
    sell: 10,
    description:
      "A simple cotton shirt that is soft and comfortable to wear. It's a bit wrinkled. It's a bit too small for me.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10014.png',
  },
  {
    id: '10015' as const,
    version: 3,
    code: 'gold-bar',
    name: 'Gold Bar',
    type: ItemType.ETCETERA,
    sell: 500,
    description:
      "A bar of solid gold. It's heavy and shiny. I wonder who left it here.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10015.png',
  },
  {
    id: '10016' as const,
    version: 3,
    code: 'white-mineral',
    name: 'White Mineral',
    type: ItemType.ETCETERA,
    sell: 75,
    description:
      "A white mineral that glows in the dark. It floats in water and flakes easily. It's commonly used in jewelry and magic potions.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10016.png',
  },
  {
    id: '10017' as const,
    version: 3,
    code: 'water-crystal',
    name: 'Water Crystal',
    type: ItemType.ETCETERA,
    sell: 90,
    description:
      'A blueish crystal that is cold to the touch no matter the temperature. Wealthy citizens use it to cool their drinks and homes.',
    imageUrl: 'https://cdn.charity.games/_items/detailed/10017.png',
  },
  {
    id: '10018' as const,
    version: 3,
    code: 'shadow-stone',
    name: 'Shadow Stone',
    type: ItemType.ETCETERA,
    sell: 40,
    description:
      "A black stone that absorbs light. It's used in dark magic rituals and explosives. I should be careful with this.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10018.png',
  },
  {
    id: '10019' as const,
    version: 3,
    code: 'rock',
    name: 'Rock',
    type: ItemType.ETCETERA,
    sell: 1,
    description:
      "A small rock that can be thrown or skipped across water. It's probably not worth much.",
    imageUrl: 'https://cdn.charity.games/_items/detailed/10019.png',
  },
];

export type Item = (typeof ITEMS)[number];

export type ItemId = Item['id'];

export type DroppableItem = Extract<
  Item,
  { type: 'COMBAT' | 'CONSUMABLE' | 'SHARABLE' | 'ETCETERA' }
>;

export type DroppableItemId = DroppableItem['id'];

export const DROPPABLE_ITEMS = ITEMS.filter(
  (item): item is DroppableItem =>
    item.type === ItemType.COMBAT ||
    item.type === ItemType.CONSUMABLE ||
    item.type === ItemType.SHARABLE ||
    item.type === 'ETCETERA'
);
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
  1001: 1,
  1002: 1,
  1003: 1,
  1004: 1,
  1005: 1,
  10001: 1,
  10002: 1,
  10003: 1,
  10004: 1,
  10005: 1,
  10006: 1,
  10007: 1,
  10008: 1,
  10009: 1,
  10010: 1,
  10011: 1,
  10012: 1,
  10013: 1,
  10014: 1,
  10015: 1,
  10016: 1,
  10017: 1,
  10018: 1,
  10019: 1,
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

export const isLotteryItems = (rate: ConsumptionRate): rate is LotteryItems =>
  'items' in rate && Array.isArray(rate.items);

export const isRandomTokenQuantity = (
  rate: ConsumptionRate
): rate is RandomTokenQuantity => 'min' in rate && 'max' in rate;

export type SteamKeyItem = Extract<Item, { type: 'STEAM_KEY' }>;
export type SteamKeyItemId = SteamKeyItem['id'];

export type SharableItem = Extract<Item, { type: 'SHARABLE' }>;
export type SharableItemId = SharableItem['id'];

export type CombatItem = Extract<Item, { type: 'COMBAT' }>;
export type CombatItemId = CombatItem['id'];

export const COMBAT_ITEMS = ITEMS.filter(
  (item): item is CombatItem => item.type === ItemType.COMBAT
);

export type ConsumableItem = Extract<Item, { type: 'CONSUMABLE' }>;
export type ConsumableItemId = ConsumableItem['id'];

export type EtCeteraItem = Extract<Item, { type: 'ETCETERA' }>;
export type EtCeteraItemId = EtCeteraItem['id'];

export type CurrencyItem = Extract<Item, { type: 'CURRENCY' }>;
export type CurrencyItemId = CurrencyItem['id'];

export type RandomTokenQuantity = { min: number; max: number };
export type LotteryItems = { items: Item[] };
export type ConsumptionRate = LotteryItems | RandomTokenQuantity;
export const CONSUMPTION_RATES: Record<ConsumableItemId, ConsumptionRate> = {
  2: { min: 10, max: 20 },
  5: { min: 10, max: 100 },
  1000: { items: COMBAT_ITEMS },
};
