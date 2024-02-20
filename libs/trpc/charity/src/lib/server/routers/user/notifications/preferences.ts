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
        email: z.boolean().optional(),
        newsletter: z.boolean().optional(),
      })
    )
    .output(z.boolean())
    .mutation(async ({ input, ctx: { db, user } }) => {
      if (input.email === undefined && input.newsletter === undefined) {
        console.warn(
          'cannot change user notification preferences without some input'
        );
        return false;
      }

      console.info('upsert user notification preferences', {
        userId: user.id,
        ...input,
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
      // check to see if the user already has notification preferences
      const preferences = await db.notificationPreferences.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (preferences) {
        console.warn('user already has notification preferences');
        return false;
      }

      await db.notificationPreferences.create({
        data: {
          userId: user.id,
          email: true,
        },
      });

      return true;
    }),
});
