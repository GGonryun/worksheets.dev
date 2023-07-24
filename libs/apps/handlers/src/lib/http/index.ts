import { AbortFailure, fetcher } from '@worksheets/util/http';
import { ApplicationExecutors } from '../framework';
import { TRPCError } from '@trpc/server';
import { HTTP_STATUS_CODE_TRPC_ERROR } from '@worksheets/util/errors';

const TEN_SECONDS = 10000;

const { aborter, applier } = fetcher;
const client = applier(fetch, aborter(TEN_SECONDS));

export const http: ApplicationExecutors<'http'> = {
  async request({ input }) {
    const { url, method, headers, body } = input;
    let response;
    try {
      response = await client(url, {
        method,
        headers,
        body,
      });
    } catch (error) {
      if (error instanceof AbortFailure) {
        throw new TRPCError({
          code: 'TIMEOUT',
          message: 'exceeded 10 second timeout',
        });
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'host is currently unavailable',
      });
    }

    let data = await response.text();

    if (!response.ok) {
      throw new TRPCError({
        code: HTTP_STATUS_CODE_TRPC_ERROR[response.status],
        message: data,
      });
    }

    try {
      data = JSON.parse(data);
    } catch (error) {
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: 'http request expects json response data',
      });
    }

    return {
      url: response.url,
      code: response.status,
      body: data,
    };
  },
};
