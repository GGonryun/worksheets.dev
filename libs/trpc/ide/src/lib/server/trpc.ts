import { OpenApiMeta } from 'trpc-openapi';

import { initTRPC, TRPCError } from '@trpc/server';

import { Context } from './context';

export const t = initTRPC.meta<OpenApiMeta>().context<Context>().create();

// Base router and procedure helpers
export const router = t.router;
export const middleware = t.middleware;

const isAuthed = middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
export const publicProcedure = t.procedure;
