import { verifyIdToken } from '@worksheets/auth/server';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { NextApiRequest, NextApiHandler, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';
import { CodedFailure } from '@worksheets/util/errors';
import { StatusCodes } from 'http-status-codes';

type zAny = z.ZodTypeAny;

type HandlerContext<T, Optional = never> = {
  data: T;
  req: NextApiRequest;
  res: NextApiResponse;
} & Optional;

type ContextFactoryMethod<T> = (req: NextApiRequest) => Promise<T>;
type ContextFactory<T> = {
  newContext?: ContextFactoryMethod<T>;
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

    const input = await parseInput(options.input, body, query);

    const ctx = await newContext(req, options.newContext);

    const data = await handler({ ...ctx, data: input, req, res });

    // skip output step if res was written to.
    if (res.writableEnded) {
      return;
    }

    const output = await parseOutput(options.output, data);

    if (output != null) {
      res.status(200).json(output);
    } else {
      res.status(204).end();
    }
  };

async function newContext<T>(
  req: NextApiRequest,
  factory?: ContextFactoryMethod<T>
  // eslint-disable-next-line @typescript-eslint/ban-types
): Promise<T> {
  if (!factory) return {} as T;

  try {
    return await factory(req);
  } catch (error) {
    const { method, body, query, url } = req;
    throw new HandlerFailure({
      code: 'operation-failure',
      message: 'api handler failed to build context',
      cause: error,
      data: { method, body, query, url },
    });
  }
}

async function parseInput(
  schema: z.ZodTypeAny | undefined,
  rawBody: unknown,
  query: object
): Promise<unknown> {
  let body: object;
  if (!rawBody) {
    body = {};
  } else if (typeof rawBody !== 'object' || Array.isArray(rawBody)) {
    // use the body as a spreadable object. otherwise assign it to the data object as 'body'.
    body = { body: rawBody };
  } else {
    body = rawBody;
  }

  schema = schema ?? z.any();

  try {
    return schema.parse({ ...body, ...query });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new HandlerFailure({
        code: 'invalid-argument',
        message: 'api handler failed to parse input',
        cause: error,
        data: { body, query, issues: error.issues },
      });
    }
    throw new HandlerFailure({
      code: 'unknown',
      message: 'unknown exception while parsing',
      cause: error,
      data: { body, query },
    });
  }
}

async function parseOutput<O extends zAny>(
  schema: O | undefined,
  output: unknown
): Promise<z.TypeOf<O> | undefined> {
  if (!output) return;
  if (!schema) return output;

  try {
    return schema.parse(output);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new HandlerFailure({
        code: 'invalid-argument',
        message: 'api handler failed to parse output',
        cause: error,
        data: { output },
      });
    }
    throw new HandlerFailure({
      code: 'unknown',
      message: 'unknown exception while parsing',
      cause: error,
      data: { output },
    });
  }
}

export const newPublicHandler = <I extends zAny, O extends zAny>({
  input,
  output,
}: HandlerSchema<I, O>) => newHandler({ input, output });

export const newMaybePrivateHandler = <I extends zAny, O extends zAny>({
  input,
  output,
}: HandlerSchema<I, O>) => {
  return newHandler({
    input,
    output,
    newContext: async (req) => {
      const { authorization } = req.headers;
      if (authorization) {
        const user = await verifyIdToken(req);
        return { user };
      }
      return { user: undefined };
    },
  });
};

export type PrivateContext = { user: DecodedIdToken };
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
  | 'operation-failure'
  | 'resource-exhausted'
  | 'not-found'
  | 'invalid-argument'
  | 'unsupported-operation'
  | 'conflict'
  | 'redirect';

export const handlerFailureStatusCodeMap: Record<HandlerFailures, number> = {
  unknown: StatusCodes.IM_A_TEAPOT,
  unexpected: StatusCodes.INTERNAL_SERVER_ERROR,
  unauthorized: StatusCodes.UNAUTHORIZED,
  'operation-failure': StatusCodes.INTERNAL_SERVER_ERROR,
  'resource-exhausted': StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE,
  'not-found': StatusCodes.NOT_FOUND,
  conflict: StatusCodes.CONFLICT,
  unimplemented: StatusCodes.NOT_IMPLEMENTED,
  'unsupported-operation': StatusCodes.UNPROCESSABLE_ENTITY,
  'invalid-argument': StatusCodes.BAD_REQUEST,
  redirect: StatusCodes.MOVED_TEMPORARILY,
};

export class HandlerFailure extends CodedFailure<HandlerFailures> {}

export function processError(error: unknown) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    let code: HandlerFailures = 'unknown';
    let status = handlerFailureStatusCodeMap[code];
    let message = 'failure';
    let data: unknown = {};

    if (error instanceof HandlerFailure) {
      code = error.code;
      status = handlerFailureStatusCodeMap[code];
      message = error.message ?? message;
      data = error.data;
      if (error.code === 'redirect') {
        if (typeof data === 'string') {
          res.status(status).redirect(data);
          return;
        }
        console.error(`unable to process redirect, no url was provided`, error);
        status = StatusCodes.INTERNAL_SERVER_ERROR;
      }
    }

    if (code === 'unknown') {
      const { method, url } = req;
      console.error(`${method?.toUpperCase()} ${url}: unexpected error`, error);
    }

    console.error(`${req.method} ${req.url} encountered failure`, error);

    return res.status(status).json({ code, message, data });
  };
}
