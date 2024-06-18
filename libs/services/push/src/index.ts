import {
  NotificationType,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { daysAgo } from '@worksheets/util/time';
export type PushNotifyInput = {
  type: NotificationType;
  text: string;
  userIds?: string[];
};

export class PushService {
  #db: PrismaClient | PrismaTransactionalClient;
  #expiredNotificationThreshold = daysAgo(7);
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
  }

  async notify({ type, text, userIds }: PushNotifyInput) {
    const users = await this.#db.user.findMany({
      where: {
        // If userIds is not provided, broadcast to all users
        id: userIds
          ? {
              in: userIds,
            }
          : undefined,
      },
      select: {
        id: true,
      },
    });

    await this.#db.notification.createMany({
      data: users.map((user) => ({
        type,
        text,
        userId: user.id,
      })),
    });
  }

  async destroyExpiredNotifications() {
    const action = await this.#db.notification.deleteMany({
      where: {
        createdAt: {
          lte: this.#expiredNotificationThreshold,
        },
      },
    });
    console.info(`Destroyed ${action.count} expired notifications`);
  }
}
