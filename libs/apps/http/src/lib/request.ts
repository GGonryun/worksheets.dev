import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { AbortFailure, fetcher } from '@worksheets/util/http';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

const TEN_SECONDS = 10000;

const { aborter, applier } = fetcher;
const client = applier(fetch, aborter(TEN_SECONDS));

export const request = newMethod({
  path: 'http',
  label: 'request',
  description:
    'Sends an HTTP request to the specified URL, body should be stringified',

  settings: null,

  input: z.object({
    url: z.string(),
    method: z
      .union([
        z.literal('GET'),
        z.literal('POST'),
        z.literal('PUT'),
        z.literal('DELETE'),
      ])
      .optional(),
    headers: z.record(z.string()).optional(),
    body: z.string().optional(),
  }),

  output: z.object({
    url: z.string(),
    code: z.number(),
    body: z.any(),
    headers: z.record(z.string().optional()).optional(),
  }),

  async call(ctx) {
    const { url, method, headers, body } = ctx.input;
    let response;
    try {
      response = await client(url, {
        method,
        headers,
        body,
      });
    } catch (error) {
      if (error instanceof AbortFailure) {
        throw new MethodCallFailure({
          code: StatusCodes.REQUEST_TIMEOUT,
          message: `http request: ${error.message}`,
        });
      }

      throw new MethodCallFailure({
        code: StatusCodes.SERVICE_UNAVAILABLE,
        message: 'http request: host is unavailable',
      });
    }

    let data: unknown = await response.text();

    if (!response.ok) {
      throw new MethodCallFailure({
        code: response.status,
        message: response.statusText,
        data,
      });
    }

    try {
      data = JSON.parse(data as string);
    } catch (error) {
      throw new MethodCallFailure({
        code: StatusCodes.UNSUPPORTED_MEDIA_TYPE,
        message: 'http request expects json data',
      });
    }

    return {
      url: response.url,
      code: response.status,
      body: data,
    };
  },
});
