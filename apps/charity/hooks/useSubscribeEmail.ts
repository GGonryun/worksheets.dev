import { TRPCClientError } from '@trpc/client';
import { trpc } from '@worksheets/trpc-charity';
import { useState } from 'react';

export const parseEmailSubscribeError = (error: unknown): string => {
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

export const useSubscribeEmail = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const subscribe = trpc.emails.subscribe.useMutation();

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError('');
    setSuccess('');
  };

  const subscribeEmail = async () => {
    try {
      await subscribe.mutateAsync({ address: email });
      setSuccess('You have been subscribed to our newsletter!');
    } catch (error) {
      setError(parseEmailSubscribeError(error));
    }
  };

  const keyboardSubscribeEmail = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      subscribeEmail();
    }
  };

  return {
    email,
    error,
    success,
    isLoading: subscribe.isLoading,
    setEmail: updateEmail,
    subscribeEmail,
    keyboardSubscribeEmail,
  };
};
