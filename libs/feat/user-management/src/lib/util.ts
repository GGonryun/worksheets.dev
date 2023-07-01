import { HandlerFailure } from '@worksheets/util/next';
import { API_TOKEN_PREFIX } from './constants';

export function splitTokenFromHeader(authorization?: string): string {
  if (!authorization) {
    throw new HandlerFailure({
      code: 'unauthorized',
      message: 'authorization header cannot be empty',
    });
  }

  const pieces = authorization.split(' ');
  if (!pieces || pieces.length !== 2 || pieces[0] !== `Bearer`) {
    throw new HandlerFailure({
      code: 'unauthorized',
      message: 'authorization format is invalid expected: `Bearer <token>`',
    });
  }

  return pieces[1];
}

export const isApiToken = (token: string) => {
  return token.startsWith(API_TOKEN_PREFIX);
};
