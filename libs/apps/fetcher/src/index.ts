/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationRouter } from '@worksheets/apps-registry';
import { z } from '@worksheets/zod';

export const fetcherOptionsSchema = z.object({
  baseUrl: z.string().optional(),
  credentials: z
    .object({
      apiKey: z.string().optional(),
    })
    .optional(),
  development: z.boolean().optional(),
  logging: z.enum(['verbose', 'debug', 'info', 'warn', 'error']).optional(),
});

export type FetcherOverrides = {
  interceptor?: MethodHandler;
};

export type FetcherOptions = z.infer<typeof fetcherOptionsSchema> &
  FetcherOverrides;

// TODO: fix redundant appId/methodId declarations..
export function newClient({
  interceptor,
  ...opts
}: FetcherOptions): ApplicationRouter {
  const handler = newHandler(opts, interceptor);
  return {
    openai: (ctx) => ({
      createCompletion: handler(ctx, 'openai', 'createCompletion'),
      createImage: handler(ctx, 'openai', 'createImage'),
      listModels: handler(ctx, 'openai', 'listModels'),
    }),
    time: (ctx) => ({
      now: handler(ctx, 'time', 'now'),
    }),
    sys: (ctx) => ({
      log: handler(ctx, 'sys', 'log'),
    }),
    math: (ctx) => ({
      calc: handler(ctx, 'math', 'calc'),
      abs: handler(ctx, 'math', 'abs'),
      min: handler(ctx, 'math', 'min'),
      max: handler(ctx, 'math', 'max'),
      identity: handler(ctx, 'math', 'identity'),
      avg: handler(ctx, 'math', 'avg'),
    }),
  };
}

type MethodHandler = (request: MethodCallRequest) => Promise<any>;

export const methodCallRequestSchema = z.object({
  app: z.string(),
  method: z.string(),
  options: fetcherOptionsSchema,
  input: z.any(),
  context: z.any(),
});

export type MethodCallRequest = z.infer<typeof methodCallRequestSchema>;

const newHandler =
  (options: FetcherOptions = {}, interceptor?: MethodHandler) =>
  (
    context: any,
    // TODO: add type safety to app keys and id's.
    appId: string,
    methodId: string
  ): ((input: any) => Promise<any>) =>
  async (input: any) => {
    const request: MethodCallRequest = {
      app: appId,
      method: methodId,
      options,
      input,
      context,
    };
    if (interceptor) {
      return await interceptor(request);
    }

    return await defaultFetchInterceptor(request);
  };

// TODO: import server settings without it importing everything else.
export const DEFAULT_HOST_URL = `https://api.worksheets.dev/v1`;
const defaultFetchInterceptor = async ({
  app,
  method,
  context,
  options,
  input,
}: MethodCallRequest) => {
  const url = options.baseUrl || DEFAULT_HOST_URL;
  if (options.logging === 'verbose') {
    console.log('calling', url, app, method, context, input);
  }

  const result = await fetch(`${url}/call/${app}/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ context, input }),
  });

  if (result.ok) {
    return await result.json();
  }

  console.error(
    'failed to call',
    result.status,
    result.statusText,
    await result.text()
  );

  return {
    error: {
      status: result.status,
      statusText: result.statusText,
    },
  };
};
