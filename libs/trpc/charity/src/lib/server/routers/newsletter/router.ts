import { TRPCError } from '@trpc/server';
import { NotificationsService } from '@worksheets/services/notifications';
import { REQUIRED_TOPICS } from '@worksheets/util/settings';
import {
  newsletterSubscriptionFormSchema,
  newsletterSubscriptionSchema,
} from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';
import { t } from '../../trpc';

const notifications = new NotificationsService();

export default t.router({
  subscription: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .output(newsletterSubscriptionSchema.nullable())
    .query(async ({ ctx: { db }, input: { id } }) => {
      if (!id) {
        return null;
      }
      const subscription = await db.newsletterSubscription.findFirst({
        where: {
          id,
        },
      });

      if (!subscription) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Subscription does not exist',
        });
      }

      return subscription;
    }),
  confirm: publicProcedure
    .input(
      newsletterSubscriptionFormSchema.pick({
        id: true,
        email: true,
      })
    )
    .mutation(async ({ ctx: { db }, input: { id, email } }) => {
      const existing = await db.newsletterSubscription.findFirst({
        where: {
          email,
        },
      });

      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Subscription does not exist',
        });
      }

      if (existing.confirmed) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'Subscription already confirmed',
        });
      }

      if (existing.email !== email) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Subscription email does not match',
        });
      }

      await db.newsletterSubscription.update({
        where: {
          id: existing.id,
        },
        data: {
          confirmed: true,
        },
      });

      await notifications.send('new-subscriber', {
        email: existing.email,
      });
    }),
  sendConfirmation: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .output(z.boolean())
    .mutation(async ({ ctx: { db }, input: { id } }) => {
      const newsletterSubscription = await db.newsletterSubscription.findFirst({
        where: {
          id,
        },
      });

      if (!newsletterSubscription) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Subscription not found',
        });
      }

      if (newsletterSubscription.confirmed) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'Subscription already confirmed',
        });
      }

      await notifications.send('confirm-newsletter-subscription', {
        email: newsletterSubscription.email,
        id: newsletterSubscription.id,
      });

      return true;
    }),
  subscribe: publicProcedure
    .input(newsletterSubscriptionFormSchema)
    .output(
      z.object({
        requiresConfirmation: z.boolean(),
        subscription: newsletterSubscriptionSchema,
      })
    )
    .mutation(async ({ ctx: { db }, input }) => {
      // always append required topics
      const topics = [...new Set([...input.topics, ...REQUIRED_TOPICS])];

      const result = await db.newsletterSubscription.upsert({
        where: {
          email: input.email,
        },
        update: {
          topics,
        },
        create: {
          email: input.email,
          topics,
        },
      });

      if (!result.confirmed) {
        await notifications.send('confirm-newsletter-subscription', {
          email: result.email,
          id: result.id,
        });
      }
      return {
        requiresConfirmation: !result.confirmed,
        subscription: result,
      };
    }),
  unsubscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .output(z.boolean())
    .mutation(async ({ ctx: { db }, input: { email } }) => {
      console.info('Unsubscribing from newsletter', { email });

      const subscription = await db.newsletterSubscription.findFirst({
        where: {
          email,
        },
      });

      if (!subscription) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Subscription not found',
        });
      }

      if (
        subscription.topics.length === 1 &&
        subscription.topics.includes('Transactional')
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You have already unsubscribed from our newsletter',
        });
      }

      await db.newsletterSubscription.update({
        where: {
          email,
        },
        data: {
          topics: REQUIRED_TOPICS,
        },
      });

      return true;
    }),
});
