import { Prisma, prisma } from '@worksheets/prisma';
import { NotificationsService } from '@worksheets/services/notifications';
import { createCronJob } from '@worksheets/util/cron';
import {
  CLAIM_ALERT_LAST_SENT_THRESHOLD,
  CLAIM_ALERT_SENT_COUNT_THRESHOLD,
} from '@worksheets/util/settings';
import { hoursAgo } from '@worksheets/util/time';

const PENDING_ALERT_PROPS = {
  id: true as const,
  lastSentAt: true as const,
  sentCount: true as const,
  createdAt: true as const,
  winner: {
    select: {
      id: true as const,
      raffleId: true as const,
      user: {
        select: {
          id: true as const,
          email: true as const,
        },
      },
      prize: {
        select: {
          id: true as const,
          name: true as const,
          type: true as const,
        },
      },
    },
  },
};

type PendingAlert = Prisma.ClaimAlertGetPayload<{
  select: typeof PENDING_ALERT_PROPS;
}>;

export default createCronJob(async () => {
  const notifications = new NotificationsService();

  const [unsentAlerts, pendingAlerts, expiredAlerts] = await Promise.all([
    prisma.claimAlert.findMany({
      where: {
        // find alerts that haven't been sent yet
        lastSentAt: {
          equals: null,
        },
      },
      select: PENDING_ALERT_PROPS,
    }),
    prisma.claimAlert.findMany({
      where: {
        lastSentAt: {
          lt: hoursAgo(CLAIM_ALERT_LAST_SENT_THRESHOLD),
        },
        sentCount: {
          lt: CLAIM_ALERT_SENT_COUNT_THRESHOLD,
        },
      },
      select: PENDING_ALERT_PROPS,
    }),
    prisma.claimAlert.findMany({
      where: {
        sentCount: {
          gte: CLAIM_ALERT_SENT_COUNT_THRESHOLD,
        },
      },
      select: PENDING_ALERT_PROPS,
    }),
  ]);

  await Promise.all([
    ...unsentAlerts.map(processUnsentAlert(notifications)),
    ...pendingAlerts.map(processPendingAlert(notifications)),
    ...expiredAlerts.map(processExpiredAlert(notifications)),
  ]);

  console.info(`Processed ${unsentAlerts.length} unsent alerts.`);
  console.info(`Processed ${pendingAlerts.length} pending alerts.`);
  console.info(`Processed ${expiredAlerts.length} expired alerts.`);
});

const processUnsentAlert =
  (notifications: NotificationsService) => async (alert: PendingAlert) => {
    await prisma.claimAlert.update({
      where: {
        id: alert.id,
      },
      data: {
        lastSentAt: new Date(),
        sentCount: {
          increment: 1,
        },
      },
    });

    await notifications.send('won-raffle', {
      user: alert.winner.user,
      prize: alert.winner.prize,
    });
  };

const processPendingAlert =
  (notifications: NotificationsService) => async (alert: PendingAlert) => {
    await prisma.claimAlert.update({
      where: {
        id: alert.id,
      },
      data: {
        lastSentAt: new Date(),
        sentCount: {
          increment: 1,
        },
      },
    });

    await notifications.send('won-raffle-reminder', {
      user: alert.winner.user,
      prize: alert.winner.prize,
    });
  };

const processExpiredAlert =
  (notifications: NotificationsService) => async (alert: PendingAlert) => {
    await prisma.$transaction([
      prisma.claimAlert.delete({
        where: {
          id: alert.id,
        },
      }),
      // deleting the winner and setting the status to 'REASSIGN' will make sure that the raffle gets new winners assigned by the 'find-expired-raffles' cronjob.
      prisma.raffleWinner.delete({
        where: {
          id: alert.winner.id,
        },
      }),
      prisma.raffle.update({
        where: {
          id: alert.winner.raffleId,
        },
        data: {
          status: 'REASSIGN',
        },
      }),
    ]);

    await notifications.send('unclaimed-prize', {
      user: alert.winner.user,
      lastSentAt: alert.lastSentAt,
    });
  };
