import { TRPCError } from '@trpc/server';
import { HTTP_STATUS_CODE_TRPC_ERROR } from '@worksheets/util/errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleOpenAIError = (error: any) => {
  const data = error?.response?.data ?? {};
  const message = data?.error?.message ?? 'unknown open ai failure';
  const status = error?.response?.status ?? 500;

  if (status == 429) {
    return new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message,
    });
  }

  return new TRPCError({
    code: HTTP_STATUS_CODE_TRPC_ERROR[status] ?? 'INTERNAL_SERVER_ERROR',
    message,
  });
};
