import { TRPCClientError } from '@trpc/client';
import { trpc } from '@worksheets/trpc-charity';
import { Snackbar, useSnackbar } from '@worksheets/ui/components/snackbar';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { validateEmail } from '@worksheets/util/strings';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { SubscribeNewsletterScreen } from '../components/subscribe-newsletter-screen';

const Container: React.FC = () => {
  const snackbar = useSnackbar();

  const subscribe = trpc.public.newsletter.subscribe.useMutation();

  const [email, setEmail] = useState('');

  const [subscribed, setSubscribed] = useState(false);

  const handleUpdate = (email: string) => {
    setEmail(email);
    setSubscribed(false);
  };

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
      snackbar.trigger({
        message: 'Please enter a valid email address.',
        severity: 'error',
      });
      return;
    }

    try {
      await subscribe.mutateAsync({
        email,
      });
      snackbar.trigger({
        message: 'A confirmation email has been sent to your email address!',
        severity: 'success',
      });
      setSubscribed(true);
      setEmail('');
    } catch (error) {
      if (error instanceof TRPCClientError) {
        snackbar.trigger({
          message: error.message,
          severity: 'error',
        });
      } else {
        snackbar.trigger({
          message: 'An unexpected error occurred. Please try again later.',
          severity: 'error',
        });
      }
    }
  };

  return (
    <>
      <SubscribeNewsletterScreen
        loading={subscribe.isLoading}
        subscribed={subscribed}
        email={email}
        onUpdate={handleUpdate}
        onSubscribe={handleSubscribe}
      />
      <Snackbar {...snackbar.props} />
    </>
  );
};

export const DynamicSubscribeNewsletterScreen = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
