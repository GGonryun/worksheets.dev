import { createOpenApiNextHandler } from 'trpc-openapi';
import { errors } from '@worksheets/feat/error-reporting';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import cors from 'nextjs-cors';
import { NextApiHandler } from 'next';
import { appRouter } from './routers/_app';
import { createContext } from './context/context';

export const createNextApiHandler: NextApiHandler = async (req, res) => {
  await cors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  return createOpenApiNextHandler({
    router: appRouter,
    createContext,
    responseMeta: (opts) => ({
      headers: {
        'x-trpc-length': opts.data ? String(opts.data.length) : '0',
        'x-trpc-error': opts.errors.length ? '1' : '0',
        'x-trpc-request-type': opts.type,
        'x-trpc-user-request': opts.ctx?.user ? '1' : '0',
      },
    }),
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
  })(req, res);
};
