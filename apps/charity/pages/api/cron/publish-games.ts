import { Prisma, prisma } from '@worksheets/prisma';
import { NotificationsService } from '@worksheets/services/notifications';
import { createCronJob } from '@worksheets/util/cron';

const notifications = new NotificationsService();

const GAME_PUBLISH_ALERT_PAYLOAD = {
  select: {
    id: true,
    gameId: true,
    game: {
      select: {
        id: true,
        title: true,
        description: true,
        cover: true,
        thumbnail: true,
        trailer: true,
        developer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
  },
} as const;

export type GamePublishAlertPayload = Prisma.GamePublishAlertGetPayload<
  typeof GAME_PUBLISH_ALERT_PAYLOAD
>;

const publishGames = async () => {
  const response = await prisma.$transaction(async (tx) => {
    const alerts = await tx.gamePublishAlert.findMany({
      where: {
        triggerAt: {
          lte: new Date(),
        },
      },
      ...GAME_PUBLISH_ALERT_PAYLOAD,
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

    return alerts;
  });

  await Promise.all(
    response.map((alert) => notifications.send('new-game', alert.game))
  );
};

export default createCronJob(publishGames);
