import { Prisma, prisma } from '@worksheets/prisma';
import { NotificationsService } from '@worksheets/services/notifications';
import { createCronJob } from '@worksheets/util/cron';

const props = {
  select: {
    id: true,
    raffle: {
      select: {
        id: true,
        numWinners: true,
        expiresAt: true,
        codes: {
          select: {
            id: true,
          },
        },
        sponsor: {
          select: {
            id: true,
            name: true,
          },
        },
        prize: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    },
  },
} as const;

type PublishableAlert = Prisma.RafflePublishAlertGetPayload<typeof props>;

const publishRaffle =
  (notifications: NotificationsService) => async (alert: PublishableAlert) => {
    if (alert.raffle.numWinners != alert.raffle.codes.length) {
      throw new Error(
        `Raffle ${alert.raffle.id} cannot be published: insufficient activation codes available to start raffle`
      );
    }

    await prisma.$transaction([
      prisma.raffle.update({
        where: {
          id: alert.raffle.id,
        },
        data: {
          status: 'ACTIVE',
        },
      }),
      prisma.rafflePublishAlert.delete({
        where: {
          id: alert.id,
        },
      }),
    ]);

    await notifications.send('new-raffle', alert.raffle);
  };

export default createCronJob(async () => {
  const notifications = new NotificationsService();
  const alerts = await prisma.rafflePublishAlert.findMany({
    where: {
      triggerAt: {
        lte: new Date(),
      },
    },
    ...props,
  });

  const results = await Promise.allSettled(
    alerts.map(publishRaffle(notifications))
  );

  for (const result of results) {
    if (result.status === 'rejected') {
      console.error(`Failed to publish raffle`, result.reason);
    }
  }
});
