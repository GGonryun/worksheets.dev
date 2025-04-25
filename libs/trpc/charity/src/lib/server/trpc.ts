import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from '@worksheets/trpc/shared';
import { ZodError } from 'zod';

export const t = initTRPC
  .context<Context>()
  .meta<{ cache: number }>()
  .create({
    errorFormatter(opts) {
      const { shape, error } = opts;

      if (error instanceof TRPCError) {
        return {
          ...shape,
          data: {
            ...shape.data,
            zodError:
              error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
                ? error.cause.flatten()
                : null,
          },
        };
      } else {
        return {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something unexpected happened.',
          cause: error,
        };
      }
    },
  });

// Base router and procedure helpers
export const router = t.router;
export const middleware = t.middleware;
