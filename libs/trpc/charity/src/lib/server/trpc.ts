import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';

import { Context } from './context/context';

export type Meta = {
  cache: {
    enabled: boolean;
    maxAge: number;
  };
};

export const t = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    errorFormatter(opts) {
      const { shape, error } = opts;
      console.error('TRPC error', error);
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
