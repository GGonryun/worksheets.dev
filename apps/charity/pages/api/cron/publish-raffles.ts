import { Prisma, prisma } from '@worksheets/prisma';
import { createCronJob } from '@worksheets/util/cron';

const props = {
  include: {
    raffle: {
      include: {
        codes: true as const,
      },
    },
  },
};

type PublishableAlert = Prisma.RafflePublishAlertGetPayload<typeof props>;

const publishRaffles = async () => {
  const alerts = await prisma.rafflePublishAlert.findMany({
    where: {
      triggerAt: {
        lte: new Date(),
      },
    },
    ...props,
  });

  await Promise.all(alerts.map(publishRaffle));
};

const publishRaffle = async (alert: PublishableAlert) => {
  if (alert.raffle.numWinners != alert.raffle.codes.length) {
    console.error(
      `Raffle cannot be published: insufficient activation codes available to start raffle`,
      {
        raffleId: alert.raffle.id,
        alertId: alert.id,
      }
    );
    return;
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
};

export default createCronJob(publishRaffles);
