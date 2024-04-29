import {
  COMBAT_ITEMS,
  CombatItemId,
  CONSUMABLE_ITEMS,
  ConsumableItemId,
  CURRENCY_ITEMS,
  CurrencyItemId,
  ETCETERA_ITEMS,
  EtCeteraItemId,
  ItemId,
  SHARABLE_ITEMS,
  SharableItemId,
  STEAM_KEY_ITEMS,
  SteamKeyItemId,
} from '@worksheets/data/items';
import { ItemType } from '@worksheets/prisma';
import { z } from 'zod';

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
});

export type ItemSchema = z.infer<typeof itemSchema>;

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
  value: z.number(),
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

export type DecrementOpts =
  | SharableDecrementOpts
  | SteamKeyDecrementOpts
  | ConsumableDecrementOpts
  | CombatDecrementOpts
  | EtCeteraDecrementOpts
  | CurrencyDecrementOpts;
