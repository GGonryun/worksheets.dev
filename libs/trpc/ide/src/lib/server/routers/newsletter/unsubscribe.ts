import { z } from '@worksheets/zod';
import { publicProcedure } from '../../procedures';
import { newNewsletterSubscriptionDatabase } from '@worksheets/data-access/user-agent';
import {
  newsletterErrorSchema,
  newsletterMessageSchema,
  newsletterSubscriptionEntity,
} from '@worksheets/schemas-user';

const db = newNewsletterSubscriptionDatabase();

export default publicProcedure
  .input(
    newsletterSubscriptionEntity.pick({
      email: true,
    })
  )
  .output(
    z.object({
      success: z.boolean(),
      message: newsletterMessageSchema.optional(),
      error: newsletterErrorSchema.optional(),
    })
  )
  .mutation(async ({ input: { email } }) => {
    try {
      const subscriptions = await db.query({
        f: 'email',
        o: '==',
        v: email,
      });

      if (subscriptions.length === 0) {
        return {
          success: false,
          error: 'NOT_SUBSCRIBED',
        };
      }

      // delete all subscriptions.
      for (const subscription of subscriptions) {
        await db.delete(subscription.id);
      }

      return {
        success: true,
        message: 'UNSUBSCRIBED',
      };
    } catch (error) {
      console.error('failed to unsubscribe to newsletter', error);
      return {
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
      };
    }
  });
