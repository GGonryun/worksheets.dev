import { TRPCError } from '@trpc/server';
import { Prisma, prisma } from '@worksheets/prisma';
import { NotificationsService } from '@worksheets/services/notifications';
import { createCronJob } from '@worksheets/util/cron';
import { EXPIRATION_TIME_THRESHOLD } from '@worksheets/util/settings';
import { daysFromNow } from '@worksheets/util/time';

const EXPIRATION_PROPS = {
  include: {
    activationCode: {
      include: {
        user: true,
      },
    },
  },
} as const;

type ExpiringActivationCode = Prisma.ExpirationGetPayload<
  typeof EXPIRATION_PROPS
>;

export default createCronJob(async () => {
  const notifications = new NotificationsService();
  const expired = await prisma.expiration.findMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
    ...EXPIRATION_PROPS,
  });
  const lastChance = await prisma.expiration.findMany({
    where: {
      id: {
        notIn: expired.map((e) => e.id),
      },
      lastSentAt: null,
      expiresAt: {
        lte: daysFromNow(EXPIRATION_TIME_THRESHOLD),
      },
    },
    ...EXPIRATION_PROPS,
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
  async (expiring: ExpiringActivationCode) => {
    if (expiring.expiresAt) {
      if (!expiring.activationCode.user)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to process last chance: user is missing',
        });
      await notifications.send('expiring-code-reminder', {
        user: expiring.activationCode.user,
        code: expiring.activationCode,
        expiresAt: expiring.expiresAt,
      });
      await prisma.expiration.update({
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
  async (expiring: ExpiringActivationCode) => {
    await prisma.$transaction(async (tx) => {
      await tx.activationCode.update({
        where: {
          id: expiring.activationCode.id,
        },
        data: {
          userId: null,
        },
      });

      await tx.expiration.delete({
        where: {
          id: expiring.id,
        },
      });
    });
    if (!expiring.activationCode.user)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to process expired item: user is missing',
      });
    await notifications.send('expired-item', {
      user: expiring.activationCode.user,
      code: expiring.activationCode,
    });
  };
