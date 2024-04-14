import { ItemId } from '@worksheets/data/items';
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
});

export type InventoryItem = z.infer<typeof inventoryItemSchema>;
