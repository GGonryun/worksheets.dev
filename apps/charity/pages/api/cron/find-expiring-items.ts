import { TRPCError } from '@trpc/server';
import { Prisma, prisma } from '@worksheets/prisma';
import { NotificationsService } from '@worksheets/services/notifications';
import { createCronJob } from '@worksheets/util/cron';
import { EXPIRATION_TIME_THRESHOLD } from '@worksheets/util/settings';
import { daysFromNow } from '@worksheets/util/time';

const INVENTORY_EXPIRATION_PROPS = {
  include: {
    inventory: {
      include: {
        user: true,
        item: true,
      },
    },
  },
} as const;

type ExpiringInventoryItem = Prisma.InventoryExpirationGetPayload<
  typeof INVENTORY_EXPIRATION_PROPS
>;

export default createCronJob(async () => {
  const notifications = new NotificationsService();
  const expired = await prisma.inventoryExpiration.findMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
    ...INVENTORY_EXPIRATION_PROPS,
  });
  const lastChance = await prisma.inventoryExpiration.findMany({
    where: {
      id: {
        notIn: expired.map((e) => e.id),
      },
      lastSentAt: null,
      expiresAt: {
        lte: daysFromNow(EXPIRATION_TIME_THRESHOLD),
      },
    },
    ...INVENTORY_EXPIRATION_PROPS,
  });

  await Promise.allSettled([
    ...lastChance.map(processLastChance(notifications)),
    ...expired.map(processExpired(notifications)),
  ]);

  console.info(`Processed ${lastChance.length} pending expirations.`);
  console.info(`Processed ${expired.length} expired expirations.`);
});

const processLastChance =
  (notifications: NotificationsService) =>
  async (expiring: ExpiringInventoryItem) => {
    if (expiring.expiresAt) {
      await notifications.send('expiring-item-reminder', {
        user: expiring.inventory.user,
        item: expiring.inventory.item,
        expiresAt: expiring.expiresAt,
      });
      await prisma.inventoryExpiration.update({
        where: {
          id: expiring.id,
        },
        data: {
          lastSentAt: new Date(),
        },
      });
    }
  };

const processExpired =
  (notifications: NotificationsService) =>
  async (expiring: ExpiringInventoryItem) => {
    await prisma.$transaction(async (tx) => {
      const inventory = await tx.inventory.findUniqueOrThrow({
        where: {
          id: expiring.inventory.id,
        },
      });

      await prisma.inventory.update({
        where: {
          id: expiring.inventory.id,
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });

      if (inventory.quantity < 0)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            'Failed to process expired item: inventory quantity is less than 0',
        });

      await prisma.inventoryExpiration.delete({
        where: {
          id: expiring.id,
        },
      });
    });
    await notifications.send('expired-item', {
      user: expiring.inventory.user,
      item: expiring.inventory.item,
    });
  };
