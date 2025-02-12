import { TRPCError } from '@trpc/server';

export const unconsumable = (itemId: string) =>
  new TRPCError({
    code: 'BAD_REQUEST',
    message: `Item ${itemId} is not consumable`,
  });
