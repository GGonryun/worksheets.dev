import { COMBAT_ITEMS } from '@worksheets/data/items';
import { shuffle } from '@worksheets/util/arrays';
import pluralize from 'pluralize';

import { InventoryService } from '.';

// TODO: abstract consumption logic
export const consumeSmallChest = async (opts: {
  userId: string;
  quantity: number;
  inventory: InventoryService;
}) => {
  const tokens = 20 * opts.quantity;
  await opts.inventory.increment(opts.userId, '1', tokens);

  return `You have earned ${tokens} ${pluralize('tokens', tokens)}`;
};

export const consumeLargeChest = async (opts: {
  userId: string;
  quantity: number;
  inventory: InventoryService;
}) => {
  const tokens = 100 * opts.quantity;
  await opts.inventory.increment(opts.userId, '1', tokens);

  return `You have earned ${tokens} ${pluralize('tokens', tokens)}`;
};

export const consumeWeaponCrate = async (opts: {
  userId: string;
  quantity: number;
  inventory: InventoryService;
}) => {
  const weapons: string[] = [];
  for (let i = 0; i < opts.quantity; i++) {
    const weapon = shuffle(COMBAT_ITEMS);
    await opts.inventory.increment(opts.userId, weapon[0].id, 1);
    weapons.push(weapon[0].name);
  }

  const groupedWeapons = weapons.reduce((acc, weapon) => {
    acc[weapon] = (acc[weapon] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return `You have found ${Object.entries(groupedWeapons)
    .map(([weapon, count]) => `${count} ${pluralize(weapon, count)}`)
    .join(', ')}`;
};
