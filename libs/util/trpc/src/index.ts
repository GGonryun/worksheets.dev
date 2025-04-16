import { TRPCClientError } from '@trpc/client';
import { TRPC_ERROR_CODE_KEY } from '@trpc/server/unstable-core-do-not-import';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseTRPCClientErrorMessage = (error: any) => {
  if (error instanceof TRPCClientError) {
    return error.message;
  } else {
    return 'An unexpected error occurred. Please contact support.';
  }
};

export function isTRPCClientError(
  cause: unknown,
  code: TRPC_ERROR_CODE_KEY
): boolean {
  if (cause instanceof TRPCClientError) {
    return cause.data?.code === code;
  }
  return false;
}

export const NO_REFETCH = {
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  retry: false,
} as const;
