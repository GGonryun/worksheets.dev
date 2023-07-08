import { OpenApiMeta } from 'trpc-openapi';

import { initTRPC, TRPCError } from '@trpc/server';

import { Context } from './context';
import { prettyPrintMilliseconds } from '@worksheets/util/time';

export enum Severity {
  INFO,
  DEBUG,
  ERROR,
  SILENCE,
}

export type LoggingMeta = {
  logging?: Severity;
} & Record<string, unknown>;

export const t = initTRPC
  .meta<OpenApiMeta>()
  .meta<LoggingMeta>()
  .context<Context>()
  .create();

// Base router and procedure helpers
export const router = t.router;
export const middleware = t.middleware;

const isAuthed = middleware(({ next, ctx, type, path }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `Authorization middleware stopped unauthorized user from completing request ${type} - ${path}`,
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

// improve the monitor metadata required for logging.
const monitor = middleware(
  async ({ ctx, meta, rawInput, path, type, next }) => {
    const header = `[${ctx.atom}][${path}][${type}]`;
    const severity = meta?.logging ?? Severity.INFO;

    const start = Date.now();

    if (severity < Severity.ERROR) {
      console.info(`${header}[REQ]`, rawInput);
    }

    const result = await next();

    if (severity === Severity.SILENCE) return result;

    const end = `${prettyPrintMilliseconds(Date.now() - start)}`;
    if (result.ok) {
      if (severity < Severity.ERROR)
        console.info(`${header}[RES][${end}][OK]`, result.data);
    } else {
      console.error(`${header}[RES][${end}][ERR]`, result.error);
    }

    return result;
  }
);

export const publicProcedure = t.procedure.use(monitor);
export const protectedProcedure = publicProcedure.use(isAuthed);
