import { OpenApiMeta } from 'trpc-openapi';

import { initTRPC, TRPCError } from '@trpc/server';

import { Context } from './context';
import { prettyPrintMilliseconds } from '@worksheets/util/time';
import { limits } from '@worksheets/feat/server-management';
import { flags } from '@worksheets/feat/user-management';
import { cleanseAlphaNumeric } from '@worksheets/util/strings';

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

const isAuthed = middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message:
        'Authorization middleware stopped unauthorized user from accessing this resource.',
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
  async ({ ctx, rawInput, meta, path, type, next }) => {
    const header = `[${ctx.atom}][${path}][${type}]`;
    const severity = meta?.logging ?? Severity.ERROR;
    if (severity > Severity.ERROR) {
      return await next();
    }

    const start = Date.now();

    if (severity < Severity.ERROR) {
      console.info(`${header}[REQ]`, rawInput);
    }

    const result = await next();

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

const limiters = middleware(async ({ meta, ctx, next }) => {
  const headers = ctx.req.headers;
  const ip = headers['x-forwarded-for'] || headers['x-real-ip'];
  const country = headers['x-vercel-ip-country'];
  const region = headers['x-vercel-ip-country-region'];
  const city = headers['x-vercel-ip-city'];
  const timezone = headers['x-vercel-ip-timezone'];

  const promises = [];
  const keys: string[] = [];

  keys.push('system - trpc-requests');
  promises.push(
    limits.throttle({
      id: 'trpc-requests',
      quantity: 1,
      meta: 'system',
      interval: 0.5,
    })
  );

  if (meta?.openapi) {
    keys.push('system - api-requests');
    promises.push(
      limits.throttle({
        id: 'api-requests',
        quantity: 1,
        meta: 'system',
        interval: 1,
      })
    );
  }

  if (ctx.user) {
    keys.push(`user - ${ctx.user.uid}`);
    promises.push(
      limits.throttle({
        id: ctx.user.uid,
        quantity: 1,
        meta: 'user',
        interval: 2,
      })
    );
  }

  if (country) {
    keys.push(`country - ${country as string}`);
    promises.push(
      limits.throttle({
        id: country as string,
        quantity: 0.1,
        meta: 'country',
        interval: 5,
      })
    );
  }

  if (region) {
    keys.push(`region - ${region as string}`);
    promises.push(
      limits.throttle({
        id: region as string,
        quantity: 1,
        meta: 'region',
        interval: 1.25,
      })
    );
  }

  if (timezone) {
    keys.push(`timezone - ${timezone as string}`);
    promises.push(
      limits.throttle({
        id: cleanseAlphaNumeric(timezone as string),
        quantity: 1,
        meta: 'timezone',
        interval: 1.5,
      })
    );
  }

  if (city) {
    keys.push(`city - ${city as string}`);
    promises.push(
      limits.throttle({
        id: city as string,
        quantity: 0.1,
        meta: 'city',
        interval: 5,
      })
    );
  }

  if (ip) {
    keys.push(`ip - ${ip as string}`);
    promises.push(
      limits.throttle({
        id: ip as string,
        quantity: 0.05,
        meta: 'ip',
        interval: 60,
      })
    );
  }

  const results = await Promise.all(promises);
  // find keys that are over their limit
  const overLimit = results
    .map((result, index) => {
      if (result) {
        return null;
      }
      return keys[index];
    })
    .filter(Boolean);

  if (overLimit.length > 0) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: `The system has temporarily exceeded it's maximum number of requests, please try again in a few minutes.`,
    });
  }

  return await next();
});

const admin = middleware(async ({ ctx, next }) => {
  const uid = ctx.user?.uid;
  if (!uid) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  const pass = await flags.check(uid, 'admin', false);
  if (!pass) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are not an admin',
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const publicProcedure = t.procedure.use(monitor).use(limiters);
export const protectedProcedure = publicProcedure.use(isAuthed);
export const adminProcedure = protectedProcedure.use(admin);
