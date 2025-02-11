import { initTRPC } from '@trpc/server';
import { createContext, InnerContext } from '@worksheets/trpc/shared';
import { ZodError } from 'zod';

export const t = initTRPC
  .context<InnerContext>()
  .meta<{ cache: number }>()
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
export const createCallerFactory = t.createCallerFactory;
export const createTRPCContext = createContext;
