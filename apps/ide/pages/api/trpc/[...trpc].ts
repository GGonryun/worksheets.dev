import * as trpcNext from '@trpc/server/adapters/next';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { errors } from '@worksheets/feat/error-reporting';
import { appRouter, createContext } from '@worksheets/trpc/ide/server';
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError(opts) {
    const { error, type, req } = opts;
    errors.report(error, {
      statusCode: getHTTPStatusCodeFromError(error),
      url: req.url,
      remoteAddress: (req.headers['x-forwarded-for'] ??
        req.headers['x-real-ip'] ??
        undefined) as string | undefined,
      method: type,
    });
  },
});
