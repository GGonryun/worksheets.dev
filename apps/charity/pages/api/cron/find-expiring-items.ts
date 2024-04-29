import { Prisma, prisma } from '@worksheets/prisma';
import { NotificationsService } from '@worksheets/services/notifications';
import { createCronJob } from '@worksheets/util/cron';
import { EXPIRATION_TIME_THRESHOLD } from '@worksheets/util/settings';
import { daysFromNow } from '@worksheets/util/time';

const INVENTORY_EXPIRATION_PROPS = {
  id: true,
  expiresAt: true,
  createdAt: true,
  item: {
    select: {
      name: true,
    },
  },
  user: {
    select: {
      id: true,
      email: true,
    },
  },
} as const;

type ExpiringInventoryItem = Prisma.InventoryGetPayload<{
  select: typeof INVENTORY_EXPIRATION_PROPS;
}>;

export default createCronJob(async () => {
  const notifications = new NotificationsService(prisma);

  // TODO: last chance is not idempotent, and will send multiple reminders every time it runs
  const [lastChance, expired] = await Promise.all([
    prisma.inventory.findMany({
      where: {
        expiresAt: {
          // two days away from expiration
          not: {
            lte: new Date(),
          },
          lte: daysFromNow(EXPIRATION_TIME_THRESHOLD),
        },
      },
      select: INVENTORY_EXPIRATION_PROPS,
    }),
    prisma.inventory.findMany({
      where: {
        expiresAt: {
          not: null,
          lte: new Date(),
        },
      },
      select: INVENTORY_EXPIRATION_PROPS,
    }),
  ]);

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
        user: expiring.user,
        item: expiring.item,
        expiresAt: expiring.expiresAt,
      });
    }
  };

const processExpired =
  (notifications: NotificationsService) =>
  async (expiring: ExpiringInventoryItem) => {
    await prisma.inventory.delete({
      where: {
        id: expiring.id,
      },
    });
    await notifications.send('expired-item', {
      user: expiring.user,
      item: expiring.item,
    });
  };
