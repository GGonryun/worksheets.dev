import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  // Initialize is used when creating a new account.
  // It is used to initialize the newsletter subscription with the user's email address without requiring confirmation.
  initialize: protectedProcedure

    .output(z.boolean())
    .mutation(async ({ ctx: { db, user } }) => {
      const { email } = user;

      console.info('Initializing newsletter subscription', { email });
      const existing = await db.newsletterSubscription.findFirst({
        where: {
          email,
        },
      });

      if (existing) {
        console.info('Newsletter subscription already exists', { email });
        return false;
      }

      await db.newsletterSubscription.create({
        data: {
          email,
          subscribed: true,
          confirmed: true,
        },
      });

      return true;
    }),
});
