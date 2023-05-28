import { verifyIdToken } from '@worksheets/auth/server';
import { CodedFailure } from '@worksheets/util/errors';
import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiHandler, NextApiResponse } from 'next';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type zAny = z.ZodType<any, any, any>;

type HandlerContext<T, Optional = never> = {
  data: T;
} & Optional;

type ContextFactory<T> = {
  newContext?: (ctx: NextApiRequest) => Promise<T>;
};

type HandlerSchema<TInput extends zAny, TOutput extends zAny> = {
  input?: TInput;
  output?: TOutput;
};

type Handler<I, O, C> = (ctx: HandlerContext<I, C>) => Promise<O>;

type HandlerAdapter<I, O, C> = (handler: Handler<I, O, C>) => NextApiHandler;

/**
 * Creates a domain specific handler with input and output schema validation. You can also specify a special context factory which will pass extra data into your handler.
 * @param options schema for the handlers inputs and outputs
 * @returns an adapter handler that converts our domain requests into NextApiRequests.
 */
const newHandler =
  <I extends zAny, O extends zAny, C>(
    options: HandlerSchema<I, O> & ContextFactory<C>
  ): HandlerAdapter<z.infer<I>, z.infer<O>, C> =>
  (handler) =>
  async (req, res) => {
    const body = req.body;
    const query = req.query;

    let parsed;
    if (options.input) {
      if (!body && !query) {
        throw new Error('expected a query or body in request');
      }
      parsed = options.input.parse({ ...body, ...query });
    }

    let obj: C = {} as C;
    if (options.newContext) {
      obj = await options.newContext(req);
    }

    let data;
    try {
      data = await handler({ ...obj, data: parsed });
    } catch (error) {
      return convertError(error)(res);
    }

    if (data) {
      let results = data;
      if (options.output) {
        results = options.output.parse(data);
      }
      res.status(200).json(results);
      return;
    }

    res.status(204).end();
  };

export const newPublicHandler = <I extends zAny, O extends zAny>({
  input,
  output,
}: HandlerSchema<I, O>) => newHandler({ input, output });

export const newPrivateHandler = <I extends zAny, O extends zAny>({
  input,
  output,
}: HandlerSchema<I, O>) => {
  return newHandler({
    input,
    output,
    newContext: async (req) => {
      const user = await verifyIdToken(req);
      return { user };
    },
  });
};

export type HandlerFailures =
  | 'unknown'
  | 'unexpected'
  | 'unauthorized'
  | 'unimplemented'
  | 'resource-exhausted'
  | 'not-found'
  | 'conflict';

export const handlerFailureStatusCodeMap: Record<HandlerFailures, number> = {
  unknown: StatusCodes.IM_A_TEAPOT,
  unexpected: StatusCodes.INTERNAL_SERVER_ERROR,
  unauthorized: StatusCodes.UNAUTHORIZED,
  'resource-exhausted': StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE,
  'not-found': StatusCodes.NOT_FOUND,
  conflict: StatusCodes.CONFLICT,
  unimplemented: StatusCodes.NOT_IMPLEMENTED,
};

export class HandlerFailure extends CodedFailure<HandlerFailures> {}
export function convertError(error: unknown) {
  return function (res: NextApiResponse) {
    let code: HandlerFailures = 'unknown';
    let status = handlerFailureStatusCodeMap[code];
    let message = 'failure';

    if (error instanceof HandlerFailure) {
      code = error.code;
      status = handlerFailureStatusCodeMap[code];
      message = error.message ?? message;
    }

    if (code === 'unknown') {
      console.error('encountered unknown handler failure', error);
    }

    return res.status(status).json({ code, message });
  };
}
