import * as trpcNext from '@trpc/server/adapters/next';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { logger } from '@worksheets/feat/logging';
import { appRouter, createContext } from '@worksheets/trpc/ide/server';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError(opts) {
    const { error, type, req, path } = opts;
    const ip = (req.headers['x-forwarded-for'] ??
      req.headers['x-real-ip'] ??
      undefined) as string | undefined;
    const url = req.url;
    const status = getHTTPStatusCodeFromError(error);
    logger.error(error, 'trpc error', { type, ip, url, status, path });
  },
});
