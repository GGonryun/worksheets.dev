import {
  filterableNotificationType,
  notificationSchema,
} from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

const DEFAULT_LIMIT = 10;

export default protectedProcedure
  .input(
    z.object({
      filter: filterableNotificationType.optional(),
      readOnLoad: z.boolean().optional(),
      limit: z.number().optional(),
    })
  )
  .output(notificationSchema.array())
  .query(
    async ({ input: { filter, readOnLoad, limit }, ctx: { user, db } }) => {
      const notifications = await db.notification.findMany({
        where: {
          userId: user.id,
          type: filter === 'ALL' ? undefined : filter,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit ?? DEFAULT_LIMIT,
      });

      if (readOnLoad) {
        await db.notification.updateMany({
          where: {
            userId: user.id,
            read: false,
          },
          data: {
            read: true,
          },
        });
      }

      return notifications.map((n) => ({
        ...n,
        createdAt: n.createdAt.getTime(),
      }));
    }
  );
