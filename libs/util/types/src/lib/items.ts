import {
  CAPSULE_ITEMS,
  CapsuleItemId,
  COMBAT_ITEMS,
  CombatItemId,
  CONSUMABLE_ITEMS,
  ConsumableItemId,
  CURRENCY_ITEMS,
  CurrencyItemId,
  ETCETERA_ITEMS,
  EtCeteraItemId,
  ItemId,
  PRIZE_WHEEL_ITEMS,
  PrizeWheelItemId,
  SHARABLE_ITEMS,
  SharableItemId,
  STEAM_KEY_ITEMS,
  SteamKeyItemId,
} from '@worksheets/data/items';
import { ItemRarity, ItemType } from '@worksheets/prisma';
import { z } from 'zod';

export const ACTION_LABEL: Record<ItemType, string> = {
  STEAM_KEY: 'Claim',
  CONSUMABLE: 'Use Item',
  SHARABLE: 'Share',
  COMBAT: 'Join Battle',
  ETCETERA: 'Sell Item',
  CURRENCY: 'N/A',
  PRIZE_WHEEL: 'Spin Wheel',
  CAPSULE: 'Open Capsule',
};

export const ACTION_AVAILABLE: Record<ItemType, boolean> = {
  STEAM_KEY: true,
  CONSUMABLE: true,
  SHARABLE: true,
  COMBAT: true,
  ETCETERA: true,
  CAPSULE: true,
  PRIZE_WHEEL: true,
  CURRENCY: false,
};
export const PRIZE_WHEEL_COLORS = [
  '#FF0000', // Red
  '#FF4500', // Orange Red
  '#FF8C00', // Dark Orange
  '#008000', // Green
  '#00CED1', // Dark Turquoise
  '#0000FF', // Blue
  '#4B0082', // Indigo
  '#9400D3', // Dark Violet
];

export const RARITY_COLORS: Record<ItemRarity, string> = {
  COMMON: '#c79081',
  UNCOMMON: '#868f96',
  RARE: '#ff758c',
  LEGENDARY: '#0ba360',
  MYTHIC: '#772CE8',
  PREMIUM: '#950504',
};

export const RARITY_LETTER: Record<ItemRarity, string> = {
  COMMON: 'C',
  UNCOMMON: 'U',
  RARE: 'R',
  LEGENDARY: 'L',
  MYTHIC: 'M',
  PREMIUM: 'P',
};

export const RARITY_GRADIENT: Record<ItemRarity, string> = {
  COMMON: 'linear-gradient(to top, #c79081 0%, #dfa579 100%)',
  UNCOMMON: 'linear-gradient(to right, #868f96 0%, #596164 100%)',
  RARE: 'linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)',
  LEGENDARY: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
  MYTHIC:
    'linear-gradient(109.6deg, rgba(119, 44, 232, 0.68) 11.5%, rgb(119, 44, 232) 91.2%)',
  PREMIUM: 'linear-gradient(0deg, rgb(149, 5, 4),rgb(253, 19, 61))',
};

export const itemOwner = z.object({
  createdAt: z.date(),
  user: z.object({
    username: z.string(),
  }),
});

export type ItemOwner = z.infer<typeof itemOwner>;

export const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  type: z.nativeEnum(ItemType),
  description: z.string(),
  sell: z.number(),
  buy: z.number(),
  rarity: z.custom<ItemRarity>(),
});

export type ItemSchema = z.infer<typeof itemSchema>;

export const capsuleOptionSchema = z.object({
  id: z.string(),
  position: z.number(),
  quantity: z.number(),
  item: z.union([itemSchema, z.null()]),
});

export type CapsuleOptionSchema = z.infer<typeof capsuleOptionSchema>;

export const inventoryCapsuleSchema = z.object({
  id: z.string(),
  inventoryId: z.string(),
  options: capsuleOptionSchema.array(),
  unlocks: z.number(),
  remaining: z.number(),
});

export type InventoryCapsuleSchema = z.infer<typeof inventoryCapsuleSchema>;

export const itemSourcesSchema = z.object({
  monsters: z
    .object({
      id: z.number(),
      name: z.string(),
      chance: z.number().min(0).max(1),
      mvp: z.boolean(),
      quantity: z.number(),
    })
    .array(),
  // describes quests or other sources of items.
  quests: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .array(),
  // describes which other consumables may drop this item.
  items: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .array(),
});

export type ItemSourcesSchema = z.infer<typeof itemSourcesSchema>;

export const lootSchema = z.object({
  item: itemSchema,
  quantity: z.number(),
  chance: z.number().min(0).max(1),
  mvp: z.boolean(),
});

export type LootSchema = z.infer<typeof lootSchema>;

export const inventoryItemSchema = z.object({
  inventoryId: z.string(),
  itemId: z.custom<ItemId>(),
  quantity: z.number(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  expiration: z.number().array(),
  type: z.nativeEnum(ItemType),
  sell: z.number(),
  buy: z.number(),
  rarity: z.custom<ItemRarity>(),
});

export const separateLoot = (loot: LootSchema[]) => {
  const basicLoot = loot.filter((l) => !l.mvp);
  const mvpLoot = loot.filter((l) => l.mvp);
  return {
    basicLoot,
    mvpLoot,
  };
};

export type InventoryItemSchema = z.infer<typeof inventoryItemSchema>;

export type SharableDecrementOpts = {
  itemId: SharableItemId;
  quantity: number;
  friendId: string;
};

export const isSharableDecrementOpts = (
  opts: DecrementOpts
): opts is SharableDecrementOpts => {
  return SHARABLE_ITEMS.find((i) => i.id === opts.itemId) !== undefined;
};

export const isSharableItemId = (itemId: ItemId): itemId is SharableItemId => {
  return SHARABLE_ITEMS.find((i) => i.id === itemId) !== undefined;
};

export type SteamKeyDecrementOpts = {
  itemId: SteamKeyItemId;
  quantity: number;
};

export const isSteamKeyDecrementOpts = (
  opts: DecrementOpts
): opts is SteamKeyDecrementOpts => {
  return STEAM_KEY_ITEMS.find((i) => i.id === opts.itemId) !== undefined;
};

export const isSteamKeyItemId = (itemId: ItemId): itemId is SteamKeyItemId => {
  return STEAM_KEY_ITEMS.find((i) => i.id === itemId) !== undefined;
};

export type ConsumableDecrementOpts = {
  itemId: ConsumableItemId;
  quantity: number;
};

export const isConsumableDecrementOpts = (
  opts: DecrementOpts
): opts is ConsumableDecrementOpts => {
  return CONSUMABLE_ITEMS.find((i) => i.id === opts.itemId) !== undefined;
};

export const isConsumableItemId = (
  itemId: ItemId
): itemId is ConsumableItemId => {
  return CONSUMABLE_ITEMS.find((i) => i.id === itemId) !== undefined;
};

export type CombatDecrementOpts = {
  itemId: CombatItemId;
  quantity: number;
};
export const isCombatDecrementOpts = (
  opts: DecrementOpts
): opts is CombatDecrementOpts => {
  return COMBAT_ITEMS.find((i) => i.id === opts.itemId) !== undefined;
};

export const isCombatItemId = (itemId: ItemId): itemId is CombatItemId => {
  return COMBAT_ITEMS.find((i) => i.id === itemId) !== undefined;
};

export type EtCeteraDecrementOpts = {
  itemId: EtCeteraItemId;
  quantity: number;
};

export const isEtCeteraDecrementOpts = (
  opts: DecrementOpts
): opts is EtCeteraDecrementOpts => {
  return ETCETERA_ITEMS.find((i) => i.id === opts.itemId) !== undefined;
};

export const isEtCeteraItemId = (itemId: ItemId): itemId is EtCeteraItemId => {
  return ETCETERA_ITEMS.find((i) => i.id === itemId) !== undefined;
};

export type CurrencyDecrementOpts = {
  itemId: CurrencyItemId;
  quantity: number;
};

export const isCurrencyDecrementOpts = (
  opts: DecrementOpts
): opts is CurrencyDecrementOpts => {
  return CURRENCY_ITEMS.find((i) => i.id === opts.itemId) !== undefined;
};

export const isCurrencyItemId = (itemId: ItemId): itemId is CurrencyItemId => {
  return CURRENCY_ITEMS.find((i) => i.id === itemId) !== undefined;
};

export type CapsuleDecrementOpts = {
  itemId: CapsuleItemId;
  quantity: number;
};

export const isCapsuleDecrementOpts = (
  opts: DecrementOpts
): opts is CapsuleDecrementOpts => {
  return CAPSULE_ITEMS.find((i) => i.id === opts.itemId) !== undefined;
};

export const isCapsuleItemId = (itemId: ItemId): itemId is CapsuleItemId => {
  return CAPSULE_ITEMS.find((i) => i.id === itemId) !== undefined;
};

export type PrizeWheelDecrementOpts = {
  itemId: PrizeWheelItemId;
  quantity: number;
};

export const isPrizeWheelDecrementOpts = (
  opts: DecrementOpts
): opts is PrizeWheelDecrementOpts => {
  return PRIZE_WHEEL_ITEMS.find((i) => i.id === opts.itemId) !== undefined;
};

export const isPrizeWheelItemId = (
  itemId: ItemId
): itemId is PrizeWheelItemId => {
  return PRIZE_WHEEL_ITEMS.find((i) => i.id === itemId) !== undefined;
};

export type DecrementOpts =
  | SharableDecrementOpts
  | SteamKeyDecrementOpts
  | ConsumableDecrementOpts
  | CombatDecrementOpts
  | EtCeteraDecrementOpts
  | CurrencyDecrementOpts
  | CapsuleDecrementOpts
  | PrizeWheelDecrementOpts;
