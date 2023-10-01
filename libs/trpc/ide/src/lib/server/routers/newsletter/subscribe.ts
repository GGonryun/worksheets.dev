import { z } from '@worksheets/zod';
import { publicProcedure } from '../../procedures';
import { newNewsletterSubscriptionDatabase } from '@worksheets/data-access/user-agent';
import {
  newsletterErrorSchema,
  newsletterMessageSchema,
  newsletterSubscriptionEntity,
} from '@worksheets/schemas-user';

const db = newNewsletterSubscriptionDatabase();

const emailSchema = z
  .string()
  .min(1, { message: 'This field has to be filled.' })
  .email('This is not a valid email.');

export default publicProcedure
  .input(
    newsletterSubscriptionEntity.pick({
      email: true,
      topics: true,
    })
  )
  .output(
    z.object({
      success: z.boolean(),
      message: newsletterMessageSchema.optional(),
      error: newsletterErrorSchema.optional(),
    })
  )
  .mutation(async ({ input: { email, topics } }) => {
    try {
      // validate email.
      email = emailSchema.parse(email);

      // treat like an upsert, if the email already exists, update the topics.
      const subscription = await db.query({
        f: 'email',
        o: '==',
        v: email,
      });

      let id = '';
      if (subscription.length > 0) {
        id = subscription[0].id;
      }

      // otherwise insert new entry
      await db.updateOrInsert({
        id: id ?? db.id(),
        email,
        topics,
        createdAt: Date.now(),
      });

      return {
        success: true,
        message: id ? 'ALREADY_SUBSCRIBED' : undefined,
      };
    } catch (error) {
      console.error('failed to subscribe to newsletter', error);
      if (error instanceof z.ZodError) {
        return {
          success: false,
          error: 'INVALID_EMAIL',
        };
      } else {
        return {
          success: false,
          error: 'INTERNAL_SERVER_ERROR',
        };
      }
    }
  });
