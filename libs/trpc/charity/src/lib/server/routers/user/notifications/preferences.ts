import { notificationPreferencesSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  get: protectedProcedure
    .output(notificationPreferencesSchema)
    .query(async ({ ctx: { db, user } }) => {
      const preferences = await db.notificationPreferences.findFirst({
        where: {
          userId: user.id,
        },
      });

      // if the user has no preferences, return the default
      if (!preferences) {
        return {
          email: user.email,
          enabledEmailNotifications: false,
        };
      }

      return {
        email: user.email,
        enabledEmailNotifications: preferences.email,
      };
    }),
  upsert: protectedProcedure
    .input(
      z.object({
        email: z.boolean(),
      })
    )
    .output(z.boolean())
    .mutation(async ({ input, ctx: { db, user } }) => {
      console.info('upsert user notification preferences', {
        userId: user.id,
        email: input.email,
      });

      // get the users notification preferences
      const preferences = await db.notificationPreferences.findFirst({
        where: {
          userId: user.id,
        },
      });

      // if it doesn't exist, create it
      if (!preferences) {
        console.info('creating user notification preferences');

        await db.notificationPreferences.create({
          data: {
            userId: user.id,
            email: input.email,
          },
        });
      } else {
        console.info('updating user notification preferences');

        // update the users notification preferences
        await db.notificationPreferences.update({
          where: {
            userId: user.id,
          },
          data: {
            email: input.email,
          },
        });
      }

      return true;
    }),
  create: protectedProcedure
    .output(z.boolean())
    .mutation(async ({ ctx: { db, user } }) => {
      // create the users notification preferences
      await db.notificationPreferences.create({
        data: {
          userId: user.id,
          email: true,
        },
      });

      return true;
    }),
});
