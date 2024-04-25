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
