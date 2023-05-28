import { NextApiHandler } from 'next';
import { Wrapper } from '@worksheets/util/functional';
import { HandlerFailure, processError } from './handlers';

type MethodHandler = {
  get: Handler;
  post: Handler;
  del: Handler;
  put: Handler;
  global: Handler;
};

type Handler = NextApiHandler;
type CustomHandler = (handler: Partial<MethodHandler>) => Handler;

const methodUndefinedHandler: Handler = async () => {
  throw new HandlerFailure({
    code: 'unimplemented',
    message: 'feature unimplemented',
  });
};

const lastSecondExceptionHandler: Wrapper<Handler> =
  (fn) => async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      processError(error)(req, res);
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
      method = methods.del;
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
