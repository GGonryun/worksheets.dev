import { OpenApiMeta } from 'trpc-openapi';

import { initTRPC } from '@trpc/server';

export type LoggingMeta = {
  logging?: boolean;
} & Record<string, unknown>;

export const t = initTRPC.meta<OpenApiMeta>().meta<LoggingMeta>().create();

export const router = t.router;
export const middleware = t.middleware;
