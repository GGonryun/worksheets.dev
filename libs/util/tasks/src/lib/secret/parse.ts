import { TRPCError } from '@trpc/server';

export const parseTaskSecretState = (state: unknown) => {
  if (!state) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Secret is invalid',
      cause: 'Secret information is missing',
    });
  }

  if (typeof state !== 'object' || Array.isArray(state)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Secret is invalid',
      cause: 'Secret is not an object',
    });
  }
  if (!('secret' in state)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Secret is invalid',
      cause: 'Secret text is empty',
    });
  }
  return {
    secret: state.secret,
  };
};

export const parseTaskSecretData = (data: unknown) => {
  if (!data) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Secret information is missing',
      cause: {
        data,
      },
    });
  }

  if (typeof data !== 'object' || Array.isArray(data)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Secret information is not an object',
      cause: {
        data,
      },
    });
  }

  if (!('secret' in data)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Secret is missing',
      cause: {
        data,
      },
    });
  }

  if (!data.secret || typeof data.secret !== 'string') {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Secret is invalid',
      cause: {
        data,
      },
    });
  }

  return {
    secret: data.secret,
  };
};
