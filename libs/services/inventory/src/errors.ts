import { TRPCError } from '@trpc/server';

export const unusable = (itemId: string) =>
  new TRPCError({
    code: 'BAD_REQUEST',
    message: `Item ${itemId} is not usable`,
  });

export const unconsumable = (itemId: string) =>
  new TRPCError({
    code: 'BAD_REQUEST',
    message: `Item ${itemId} is not consumable`,
  });

export const unincrementable = (itemId: string) =>
  new TRPCError({
    code: 'BAD_REQUEST',
    message: `Item ${itemId} is not incrementable`,
  });

export const unawardable = (itemId: string) =>
  new TRPCError({
    code: 'BAD_REQUEST',
    message: `Item ${itemId} is not awardable`,
  });

export const unactivatable = (itemId: string) =>
  new TRPCError({
    code: 'BAD_REQUEST',
    message: `Item ${itemId} is not activatable`,
  });

export const unsharable = (itemId: string) =>
  new TRPCError({
    code: 'BAD_REQUEST',
    message: `Item ${itemId} is not sharable`,
  });
