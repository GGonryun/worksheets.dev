import { prisma } from '@worksheets/prisma';
import { createCronJob } from '@worksheets/util/cron';

const publishGames = async () => {
  await prisma.$transaction(async (tx) => {
    const alerts = await tx.gamePublishAlert.findMany({
      where: {
        triggerAt: {
          lte: new Date(),
        },
      },
    });

    await tx.game.updateMany({
      where: {
        id: {
          in: alerts.map((a) => a.gameId),
        },
      },
      data: {
        status: 'PUBLISHED',
      },
    });

    await tx.gamePublishAlert.deleteMany({
      where: {
        id: {
          in: alerts.map((a) => a.id),
        },
      },
    });
  });
};

export default createCronJob(publishGames);
