import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { errors } from '@worksheets/feat/error-reporting';
import { appRouter } from './routers/_app';
import { NextApiHandler } from 'next';
import { createOpenApiNextHandler } from 'trpc-openapi';
import cors from 'nextjs-cors';

export const createNextApiHandler: NextApiHandler = async (req, res) => {
  await cors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  return createOpenApiNextHandler({
    router: appRouter,
    responseMeta: (opts) => ({
      headers: {
        'x-trpc-length': opts.data ? String(opts.data.length) : '0',
        'x-trpc-error': opts.errors.length ? '1' : '0',
        'x-trpc-request-type': opts.type,
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
