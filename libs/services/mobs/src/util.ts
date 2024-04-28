import { Prisma } from '@worksheets/prisma';
import { assertNever } from '@worksheets/util/errors';
import { BattleFiltersSchema } from '@worksheets/util/types';

export type MobSorter = (
  filters: Pick<BattleFiltersSchema, 'direction' | 'sort'>
) => Prisma.BattleFindManyArgs['orderBy'];

export const mobOrder: MobSorter = (filters) => {
  switch (filters.sort) {
    case 'Name':
      return {
        mob: {
          name: filters.direction,
        },
      };
    case 'Level':
      return {
        mob: {
          level: filters.direction,
        },
      };
    case 'Max HP':
      return {
        mob: {
          maxHp: filters.direction,
        },
      };
    case undefined:
      return undefined;
    default:
      throw assertNever(filters.sort);
  }
};
