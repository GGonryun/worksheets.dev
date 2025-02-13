import { PrismaClient, PrismaTransactionalClient } from '@worksheets/prisma';
import { NotificationsService } from '@worksheets/services/notifications';

// TODO: turn this into a functionally pure utility
export class GamesService {
  #db: PrismaClient | PrismaTransactionalClient;
  #notifications: NotificationsService;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
    this.#notifications = new NotificationsService();
  }

  async publishAll() {
    const games = await this.#db.game.findMany({
      where: {
        status: 'UNPUBLISHED',
        publishAt: {
          lte: new Date(),
        },
      },
      select: {
        id: true,
        description: true,
        title: true,
        developer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    await this.#db.game.updateMany({
      where: {
        id: {
          in: games.map((g) => g.id),
        },
      },
      data: {
        status: 'PUBLISHED',
      },
    });

    for (const game of games) {
      await this.#notifications.send('new-game', game);
    }
  }
}
