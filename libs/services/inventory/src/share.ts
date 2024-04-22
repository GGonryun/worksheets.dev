import pluralize from 'pluralize';

import { InventoryService } from '.';

export const shareSmallGiftBox = async (opts: {
  userId: string;
  friendId: string;
  itemId: '3';
  quantity: number;
  inventory: InventoryService;
}) => {
  const giving = 25 * opts.quantity;
  const receiving = 10 * opts.quantity;

  await opts.inventory.decrement(opts.userId, opts.itemId, opts.quantity);
  await opts.inventory.increment(opts.userId, '1', receiving);
  await opts.inventory.increment(opts.friendId, '1', giving);

  return sharedTokensMessage(giving, receiving);
};

export const shareLargeGiftBox = async (opts: {
  userId: string;
  friendId: string;
  quantity: number;
  itemId: '6';
  inventory: InventoryService;
}) => {
  const giving = 100 * opts.quantity;
  const receiving = 50 * opts.quantity;

  await opts.inventory.decrement(opts.userId, opts.itemId, opts.quantity);
  await opts.inventory.increment(opts.userId, '1', receiving);
  await opts.inventory.increment(opts.friendId, '1', giving);

  return sharedTokensMessage(giving, receiving);
};

export const shareLoveLetter = async (opts: {
  userId: string;
  friendId: string;
  quantity: number;
  itemId: '7';
  inventory: InventoryService;
}) => {
  const giving = 10 * opts.quantity;
  const receiving = 10 * opts.quantity;
  await opts.inventory.decrement(opts.userId, opts.itemId, opts.quantity);
  await opts.inventory.increment(opts.userId, '1', receiving);
  await opts.inventory.increment(opts.friendId, '1', giving);

  return sharedTokensMessage(giving, receiving);
};

const sharedTokensMessage = (giving: number, receiving: number) => {
  return `You have shared ${giving} ${pluralize(
    'token',
    giving
  )} and received ${receiving} ${pluralize('token', receiving)}`;
};
