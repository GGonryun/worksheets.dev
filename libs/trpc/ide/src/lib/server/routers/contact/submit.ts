import { z } from '@worksheets/zod';
import { publicProcedure } from '../../procedures';
import { newUserContactDatabase } from '@worksheets/data-access/user-agent';
import { TRPCError } from '@trpc/server';

const db = newUserContactDatabase();

export default publicProcedure
  .input(
    z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().optional(),
      message: z.string(),
    })
  )
  .output(
    z.object({
      success: z.boolean(),
      message: z.string(),
    })
  )
  .mutation(async ({ input: { firstName, lastName, email, message } }) => {
    try {
      await db.insert({
        firstName: firstName ?? 'anonymous',
        lastName: lastName ?? 'anonymous',
        email: email ?? 'anonymous',
        message,
        createdAt: Date.now(),
      });

      return {
        success: true,
        message: 'success',
      };
    } catch (error) {
      console.error('failed to send email', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'failed to send email',
      });
    }
  });
