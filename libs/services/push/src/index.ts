import { NotificationType, prisma } from '@worksheets/prisma';
import { daysAgo } from '@worksheets/util/time';
export type PushNotifyInput = {
  type: NotificationType;
  text: string;
  userIds?: string[];
};

export class PushService {
  #expiredNotificationThreshold = daysAgo(14);

  async notify({ type, text, userIds }: PushNotifyInput) {
    await prisma.$transaction(async (tx) => {
      const users = await tx.user.findMany({
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

      await tx.notification.createMany({
        data: users.map((user) => ({
          type,
          text,
          userId: user.id,
        })),
      });
    });
  }

  async destroyExpiredNotifications() {
    return await prisma.notification.deleteMany({
      where: {
        createdAt: {
          lte: this.#expiredNotificationThreshold,
        },
      },
    });
  }
}
