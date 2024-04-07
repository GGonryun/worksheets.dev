import { TRPCClientError } from '@trpc/client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseTRPCClientErrorMessage = (error: any) => {
  if (error instanceof TRPCClientError) {
    return error.message;
  } else {
    return 'An unexpected error occurred. Please contact support.';
  }
};
