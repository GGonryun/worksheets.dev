import { TRPCClientError } from '@trpc/client';

export const handleEmailSubscribeError = (error: unknown): string => {
  if (error instanceof TRPCClientError) {
    const zodError = error.data?.zodError;
    if (zodError?.fieldErrors) {
      return zodError.fieldErrors['address'].join(' ');
    } else {
      return error.message;
    }
  }

  return 'An unexpected error occurred. Please try again later.';
};
