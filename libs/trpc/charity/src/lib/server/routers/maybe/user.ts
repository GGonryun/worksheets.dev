import { TRPCError } from '@trpc/server';
import { NotificationsService } from '@worksheets/services/notifications';
import { z } from 'zod';

import { maybeProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  report: maybeProcedure
    .input(
      z.object({
        userId: z.string(),
        text: z.string(),
      })
    )
    .mutation(async ({ input: { userId, text }, ctx: { db, user } }) => {
      const notifications = new NotificationsService(db);
      const reportedBy = user?.id;
      console.info('creating user report', {
        userId,
        text,
        reportedBy,
      });

      const reporting = await db.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!reporting) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User does not exist',
          cause: `User with id ${userId} does not exist`,
        });
      }

      if (reporting.banned) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'User is already banned',
          cause: `User with id ${userId} is already banned`,
        });
      }

      if (reporting.id === reportedBy) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'Cannot report yourself',
        });
      }

      await db.userReport.create({
        data: {
          againstId: userId,
          senderId: reportedBy,
          text,
        },
      });

      await notifications.send('user-report', {
        againstId: userId,
        senderId: reportedBy ?? null,
        text,
      });
    }),
});
