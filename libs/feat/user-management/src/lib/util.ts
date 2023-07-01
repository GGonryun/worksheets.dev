import { API_TOKEN_PREFIX } from './constants';
import { TRPCError } from '@trpc/server';

export function splitTokenFromHeader(authorization?: string): string {
  if (!authorization) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'authorization header cannot be empty',
    });
  }

  const pieces = authorization.split(' ');
  if (!pieces || pieces.length !== 2 || pieces[0] !== `Bearer`) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'authorization format is invalid expected: `Bearer <token>`',
    });
  }

  return pieces[1];
}

export const isApiToken = (token: string) => {
  return token.startsWith(API_TOKEN_PREFIX);
};

export const hasher = {
  hash: (id: string) => id,
  unhash: (hash: string) => hash,
};
