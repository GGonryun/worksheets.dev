import {
  CombatItemId,
  ConsumableItemId,
  CurrencyItemId,
  EtCeteraItemId,
  ItemId,
  SharableItemId,
  SteamKeyItemId,
} from '@worksheets/data/items';
import { ItemType } from '@worksheets/prisma';
import { z } from 'zod';

export const itemOwner = z.object({
  quantity: z.number(),
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
  raffles: z
    .object({
      id: z.number(),
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
  expiresAt: z.number().nullable(),
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

export type SteamKeyDecrementOpts = {
  itemId: SteamKeyItemId;
  quantity: number;
};

export type ConsumableDecrementOpts = {
  itemId: ConsumableItemId;
  quantity: number;
};

export type CombatDecrementOpts = {
  itemId: CombatItemId;
  quantity: number;
};

export type EtCeteraDecrementOpts = {
  itemId: EtCeteraItemId;
  quantity: number;
};

export type CurrencyDecrementOpts = {
  itemId: CurrencyItemId;
  quantity: number;
};

export type DecrementOpts =
  | SharableDecrementOpts
  | SteamKeyDecrementOpts
  | ConsumableDecrementOpts
  | CombatDecrementOpts
  | EtCeteraDecrementOpts
  | CurrencyDecrementOpts;
