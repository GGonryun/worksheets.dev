import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { sendEmail } from '@worksheets/services/gmail';
import { routes } from '@worksheets/ui/routes';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  confirm: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .output(z.boolean())
    .mutation(async ({ ctx: { db }, input: { email } }) => {
      console.info('Confirming newsletter subscription', { email });
      const existing = await db.newsletterSubscription.findFirst({
        where: {
          email,
        },
      });

      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Subscription not found',
        });
      }

      if (existing.confirmed) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'Subscription already confirmed',
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
      return true;
    }),
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .output(z.boolean())
    .mutation(async ({ ctx: { db }, input }) => {
      console.info('Subscribing to newsletter', input);

      const existing = await db.newsletterSubscription.findFirst({
        where: {
          email: input.email,
        },
      });

      if (existing) {
        if (existing.subscribed) {
          throw new TRPCError({
            code: 'PRECONDITION_FAILED',
            message: 'Email is already subscribed to newsletter',
          });
        }

        await db.newsletterSubscription.update({
          where: {
            id: existing.id,
          },
          data: {
            subscribed: true,
          },
        });
      } else {
        await db.newsletterSubscription.create({
          data: {
            email: input.email,
            subscribed: true,
          },
        });
      }

      await sendEmail({
        to: [input.email],
        subject: 'Confirm your subscription to the Charity Games Newsletter',
        html: confirmSubscriptionEmail(input.email),
      });

      return true;
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

      try {
        await db.newsletterSubscription.update({
          where: {
            email,
          },
          data: {
            subscribed: false,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            console.warn('Subscription not found', { email });
            return false;
          }
        }

        console.error(
          'Unexpected error received while unsubscribing from newsletter',
          {
            email,
            error,
          }
        );
        return false;
      }

      return true;
    }),
});

const confirmSubscriptionEmail = (email: string) =>
  `Welcome to the Charity Games Newsletter! We're excited to have you on board.
  <br/><br/><a href="${routes.newsletter.confirm.url({
    query: { email },
  })}">Click here to confirm your subscription.</a><br/><br/>If you did not sign up for our newsletter, disregard this email.`;
