import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from '@worksheets/zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      address: z
        .string()
        .min(1, { message: 'This field has to be filled.' })
        .email('This is not a valid email.'),
    })
  )
  .output(
    z.object({
      success: z.boolean(),
    })
  )
  .mutation(async ({ input: { address }, ctx: { db } }) => {
    try {
      const result = await db.email.create({
        data: {
          address,
        },
      });

      console.info('Email created: ', result);

      return {
        success: true,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Email is already subscribed.',
          });
        }
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong. Please try again later.',
      });
    }
  });
