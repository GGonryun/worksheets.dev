import { NextApiHandler } from 'next';
import { ZodError } from 'zod';
import { Wrapper } from '@worksheets/util/functional';

type MethodHandler = {
  get: Handler;
  post: Handler;
  delete: Handler;
  put: Handler;
  global: Handler;
};

type Handler = NextApiHandler;
type CustomHandler = (handler: Partial<MethodHandler>) => Handler;

const methodUndefinedHandler: Handler = async (_, res) => res.send(405);

const lastSecondExceptionHandler: Wrapper<Handler> =
  (fn) => async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .json({ message: 'invalid input arguments', data: error.issues });
      } else {
        const header = `${req.method?.toUpperCase()} ${req.url}`;
        const message =
          'last second exception handler encountered an unexpected error';
        console.error(`${header} ${message}`, error);
        res.status(500).json({ message: 'unexpected error' });
      }
    }
  };

export const skeleton: CustomHandler = (methods) => async (req, res) => {
  const fallback = (method?: Handler) =>
    method ?? methods.global ?? methodUndefinedHandler;

  let method;
  switch (req.method) {
    case 'GET':
      method = methods.get;
      break;
    case 'POST':
      method = methods.post;
      break;
    case 'DELETE':
      method = methods.delete;
      break;
    case 'PUT':
      method = methods.put;
      break;
    default:
      method = methods.global;
      break;
  }

  await lastSecondExceptionHandler(fallback(method))(req, res);
};
