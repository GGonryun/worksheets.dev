import { initTRPC } from '@trpc/server';

import { Context } from './context/context';

export type LoggingMeta = {
  logging?: boolean;
} & Record<string, unknown>;

export const t = initTRPC.meta<LoggingMeta>().context<Context>().create();

// Base router and procedure helpers
export const router = t.router;
export const middleware = t.middleware;
