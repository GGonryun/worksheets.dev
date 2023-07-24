/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from '@worksheets/zod';
import { ApplicationFailure } from '@worksheets/apps-core';
import { ApplicationRegistryRequests } from './framework';

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
}: FetcherOptions): ApplicationRegistryRequests {
  const handler = newHandler(opts, interceptor);
  return {
    time: () => ({
      now: handler({}, 'time.now'),
    }),
    sys: () => ({
      log: handler({}, 'sys.log'),
    }),
    math: () => ({
      calc: handler({}, 'math.calc'),
      identity: handler({}, 'math.identity'),
      min: handler({}, 'math.min'),
      max: handler({}, 'math.max'),
      abs: handler({}, 'math.abs'),
      avg: handler({}, 'math.avg'),
    }),
    json: () => ({
      parse: handler({}, 'json.parse'),
      stringify: handler({}, 'json.stringify'),
      query: handler({}, 'json.query'),
    }),
    http: () => ({
      request: handler({}, 'http.request'),
    }),
    openai: (ctx) => ({
      createCompletion: handler(ctx, 'openai.createCompletion'),
      createImage: handler(ctx, 'openai.createImage'),
      listModels: handler(ctx, 'openai.listModels'),
    }),
    gmail: (ctx) => ({
      sendEmail: handler(ctx, 'gmail.sendEmail'),
      getUserEmail: handler(ctx, 'gmail.getUserEmail'),
    }),
    notion: (ctx) => ({
      listUsers: handler(ctx, 'notion.listUsers'),
      getUser: handler(ctx, 'notion.getUser'),
      getBot: handler(ctx, 'notion.getBot'),
      getDatabase: handler(ctx, 'notion.getDatabase'),
      createPage: handler(ctx, 'notion.createPage'),
    }),
    slack: (ctx) => ({
      postChatMessage: handler(ctx, 'slack.postChatMessage'),
      listConversations: handler(ctx, 'slack.listConversations'),
    }),
    fullstory: (ctx) => ({
      listSessions: handler(ctx, 'fullstory.listSessions'),
      createEvent: handler(ctx, 'fullstory.createEvents'),
      createUser: handler(ctx, 'fullstory.createUser'),
      listUsers: handler(ctx, 'fullstory.listUsers'),
      deleteUser: handler(ctx, 'fullstory.deleteUser'),
      updateUser: handler(ctx, 'fullstory.updateUser'),
      getUser: handler(ctx, 'fullstory.getUser'),
    }),
    googleCalendar: (ctx) => ({
      listEvents: handler(ctx, 'googleCalendar.listEvents'),
    }),
    pagerDuty: (ctx) => ({
      listPriorities: handler(ctx, 'pagerDuty.listPriorities'),
      listServices: handler(ctx, 'pagerDuty.listServices'),
      createIncident: handler(ctx, 'pagerDuty.createIncident'),
      updateIncident: handler(ctx, 'pagerDuty.updateIncident'),
      listIncidents: handler(ctx, 'pagerDuty.listIncidents'),
    }),
    segment: (ctx) => ({
      alias: handler(ctx, 'segment.alias'),
      group: handler(ctx, 'segment.group'),
      page: handler(ctx, 'segment.page'),
      track: handler(ctx, 'segment.track'),
      identify: handler(ctx, 'segment.identify'),
    }),
    sendGrid: (ctx) => ({
      sendEmail: handler(ctx, 'sendGrid.sendEmail'),
    }),
  };
}

type MethodHandler = (request: MethodCallRequest) => Promise<any>;

export const methodCallRequestSchema = z.object({
  path: z.string(),
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
    path: string
  ): ((input: any) => Promise<any>) =>
  async (input: any) => {
    const request: MethodCallRequest = {
      path,
      options,
      input,
      context,
    };
    if (interceptor) {
      return await interceptor(request);
    }

    return await defaultFetchInterceptor(request);
  };

export const DEFAULT_HOST_URL = `https://api.worksheets.dev/v1`;
const defaultFetchInterceptor = async ({
  path,
  context,
  options,
  input,
}: MethodCallRequest) => {
  const url = options.baseUrl || DEFAULT_HOST_URL;
  if (options.logging === 'verbose') {
    console.log('calling', url, path, context, input);
  }

  const [appId, methodId] = path.split('.');
  if (!appId || !methodId) {
    throw new ApplicationFailure({
      message: `Application call path ${path} is invalid.`,
      code: 400,
      reason: 'bad_request',
    });
  }

  const result = await fetch(`${url}/call/${appId}/${methodId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${options.credentials?.apiKey}`,
    },
    body: JSON.stringify({ context, input }),
  });

  if (result.ok) {
    return await result.json();
  }

  if (options.logging === 'verbose') {
    console.error('failed to call', result.status, result.statusText);
  }

  const error = await result.json();

  throw new ApplicationFailure({
    message: error?.message || result.statusText,
    code: result.status,
    reason: result.statusText,
  });
};
