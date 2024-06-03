import { TRPCError } from '@trpc/server';

import { ValidationOptions } from '../task';
import { parseTaskSecretData, parseTaskSecretState } from './parse';

export const validateSecretInput = (opts: ValidationOptions) => {
  const data = parseTaskSecretData(opts.data);
  const state = parseTaskSecretState(opts.state);

  if (data.secret !== state.secret) {
    throw new TRPCError({
      code: 'PRECONDITION_FAILED',
      message: `Secret does not match`,
    });
  }

  return { state, skip: false };
};
