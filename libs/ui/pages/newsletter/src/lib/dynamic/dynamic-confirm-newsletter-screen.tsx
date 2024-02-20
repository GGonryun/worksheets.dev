import { TRPCClientError } from '@trpc/client';
import { trpc } from '@worksheets/trpc-charity';
import { Snackbar, useSnackbar } from '@worksheets/ui/components/snackbar';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { validateEmail } from '@worksheets/util/strings';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ConfirmNewsletterScreen } from '../components/confirm-newsletter-screen';

const Container: React.FC = () => {
  const snackbar = useSnackbar();

  const { query } = useRouter();

  const email = query.email as string;

  const confirm = trpc.public.newsletter.confirm.useMutation();

  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = async () => {
    if (!validateEmail(email)) {
      snackbar.trigger({
        message: 'Please enter a valid email address.',
        severity: 'error',
      });
      return;
    }

    try {
      await confirm.mutateAsync({
        email,
      });

      snackbar.trigger({
        message: 'Confirmed! You are now subscribed to our newsletter!',
        severity: 'success',
      });

      setConfirmed(true);
    } catch (error) {
      if (error instanceof TRPCClientError) {
        snackbar.trigger({
          message: error.message,
          severity: 'error',
        });
      } else {
        snackbar.trigger({
          message: 'An unexpected error occurred. Please contact support.',
          severity: 'error',
        });
      }
    }
  };

  return (
    <>
      <ConfirmNewsletterScreen
        loading={confirm.isLoading}
        confirmed={confirmed}
        email={email}
        onConfirm={handleConfirm}
      />
      <Snackbar {...snackbar.props} />
    </>
  );
};

export const DynamicConfirmNewsletterScreen = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
