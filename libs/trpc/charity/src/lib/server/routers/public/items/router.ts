import { TRPCError } from '@trpc/server';
import { LOTTERY_ITEMS } from '@worksheets/data/items';
import { Prisma, PrismaClient } from '@worksheets/prisma';
import {
  itemOwner,
  itemSchema,
  ItemSourcesSchema,
  itemSourcesSchema,
} from '@worksheets/util/types';
import { compact } from 'lodash';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  list: publicProcedure
    .output(itemSchema.array())
    .query(async ({ ctx: { db } }) => {
      const items = await db.item.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      const sorted = items.sort((a, b) => Number(a.id) - Number(b.id));

      return sorted;
    }),

  find: publicProcedure
    .input(z.string())
    .output(itemSchema)
    .query(async ({ ctx: { db }, input }) => {
      const item = await db.item.findFirst({
        where: {
          id: input,
        },
      });

      if (!item) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Item not found',
        });
      }

      return item;
    }),
  owners: publicProcedure
    .input(z.string())
    .output(itemOwner.array())
    .query(
      async ({ ctx: { db }, input }) =>
        await db.inventory.findMany({
          where: {
            itemId: input,
          },
          select: {
            createdAt: true,
            user: {
              select: { username: true },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 100,
        })
    ),
  sources: publicProcedure
    .input(z.string())
    .output(itemSourcesSchema)
    .query(async ({ ctx: { db }, input }) => {
      const item = await db.item.findFirst({
        where: {
          id: input,
        },
        include: {
          loot: {
            include: {
              mob: true,
              quest: {
                include: {
                  task: true,
                },
              },
            },
          },
          raffles: true,
        },
      });

      if (!item) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Item not found',
        });
      }

      return {
        monsters: monsterSources(item),
        quests: questSources(item),
        items: await findItemSources(db, item),
      };
    }),
});

type PrismaItem = Prisma.ItemGetPayload<{
  include: {
    loot: {
      include: {
        mob: true;
        quest: {
          include: {
            task: true;
          };
        };
      };
    };
    raffles: true;
  };
}>;
const monsterSources = (item: PrismaItem): ItemSourcesSchema['monsters'] => {
  return item.loot
    .filter((l) => l.mob)
    .filter((l) => l.itemId === item.id)
    .map((l) => ({
      // we filter out null values above.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: l.mob!.id,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      name: l.mob!.name,
      chance: l.chance,
      quantity: l.quantity,
      mvp: l.mvp,
    }));
};

const questSources = (item: PrismaItem): ItemSourcesSchema['quests'] => {
  return item.loot
    .filter((l) => l.quest)
    .filter((l) => l.itemId === item.id)
    .map((l) => ({
      // we filter out null values above.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: l.quest!.id,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      name: l.quest!.name ?? l.quest!.task.name,
    }));
};

const findItemSources = async (
  db: PrismaClient,
  item: PrismaItem
): Promise<ItemSourcesSchema['items']> => {
  const foundIn = compact(
    Object.entries(LOTTERY_ITEMS).map(([key, value]) =>
      value.items.some((i) => i.id === item.id) ? key : null
    )
  );

  // TODO: this is a potentially inefficient query to find all the items that drop this item, we need to create a database table for this.
  const items: ItemSourcesSchema['items'] = [];
  for (const id of foundIn) {
    const item = await db.item.findFirst({
      where: {
        id,
      },
    });
    if (!item) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Item not found',
      });
    }
    items.push({
      id,
      name: item.name,
    });
  }
  return items;
};
