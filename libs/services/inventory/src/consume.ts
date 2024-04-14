import pluralize from 'pluralize';

import { InventoryService } from '.';

// TODO: abstract consumption logic
export const consumeSmallChest = async (opts: {
  userId: string;
  quantity: number;
  inventory: InventoryService;
}) => {
  const tokens = 20 * opts.quantity;
  await opts.inventory.decrement(opts.userId, '2', opts.quantity);
  await opts.inventory.increment(opts.userId, '1', tokens);

  return `You have earned ${tokens} ${pluralize('tokens', tokens)}`;
};

export const consumeLargeChest = async (opts: {
  userId: string;
  quantity: number;
  inventory: InventoryService;
}) => {
  const tokens = 100 * opts.quantity;
  await opts.inventory.decrement(opts.userId, '5', opts.quantity);
  await opts.inventory.increment(opts.userId, '1', tokens);

  return `You have earned ${tokens} ${pluralize('tokens', tokens)}`;
};
