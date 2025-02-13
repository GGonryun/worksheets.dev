import { prisma } from '@worksheets/prisma';
import { NotificationsService } from '@worksheets/services/notifications';
import {
  EXPIRED_RAFFLE_PROPS,
  RafflesService,
} from '@worksheets/services/raffles';
import { createCronJob } from '@worksheets/util/cron';
import { retryTransaction } from '@worksheets/util/prisma';
import { SECONDS } from '@worksheets/util/time';

export default createCronJob(async () => {
  const notifications = new NotificationsService();
  const expiredRaffles = await prisma.raffle.findMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
      status: 'ACTIVE',
    },
    select: EXPIRED_RAFFLE_PROPS,
  });
  console.info(`Found ${expiredRaffles.length} expired raffles.`);

  for (const expired of expiredRaffles) {
    console.info(`Processing expired raffle ${expired.id}.`);
    const { winners, raffle } = await retryTransaction(
      prisma,
      async (tx) => {
        const raffles = new RafflesService(tx);
        return await raffles.processExpiredRaffle(expired);
      },
      {
        maxAttempts: 5,
        maxWait: 60 * SECONDS,
        timeout: 180 * SECONDS,
      }
    );
    console.info(`Processed expired raffle ${expired.id}.`);
    for (const winner of winners) {
      await notifications.send('won-raffle', {
        raffle,
        user: winner.user,
        item: raffle.item,
      });
    }

    await notifications.send('raffle-expired', {
      ...raffle,
      name: raffle.name ?? raffle.item.name,
    });
  }

  console.info(`Finished processing ${expiredRaffles.length} expired raffles.`);
});
