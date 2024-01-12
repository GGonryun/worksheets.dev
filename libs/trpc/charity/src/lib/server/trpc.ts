import { initTRPC } from '@trpc/server';
import { ZodError } from '@worksheets/zod';

import { Context } from './context/context';

export type Meta = Record<string, unknown>;

export const t = initTRPC
  .meta<Meta>()
  .context<Context>()
  .create({
    errorFormatter(opts) {
      const { shape, error } = opts;
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
    },
  });

// Base router and procedure helpers
export const router = t.router;
export const middleware = t.middleware;
