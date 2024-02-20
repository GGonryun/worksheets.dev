import { trpc } from '@worksheets/trpc-charity';
import { Snackbar, useSnackbar } from '@worksheets/ui/components/snackbar';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { validateEmail } from '@worksheets/util/strings';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { UnsubscribeNewsletterScreen } from '../components/unsubscribe-newsletter-screen';

const Container: React.FC = () => {
  const snackbar = useSnackbar();

  const { query } = useRouter();
  const defaultEmail = query.email as string | undefined;

  const unsubscribe = trpc.public.newsletter.unsubscribe.useMutation();

  const [email, setEmail] = useState(defaultEmail || '');
  const [unsubscribed, setUnsubscribed] = useState(false);

  useEffect(() => {
    setEmail(defaultEmail || '');
  }, [defaultEmail]);

  const handleEmailUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setUnsubscribed(false);
  };

  const handleUnsubscribe = async () => {
    if (validateEmail(email)) {
      try {
        await unsubscribe.mutateAsync({ email });
      } finally {
        snackbar.trigger({
          message: 'You have been unsubscribed from our newsletter!',
          severity: 'success',
        });
        setUnsubscribed(true);
        setEmail('');
      }
    } else {
      snackbar.trigger({
        message: 'Please enter a valid email address.',
        severity: 'error',
      });
    }
  };

  return (
    <>
      <UnsubscribeNewsletterScreen
        loading={unsubscribe.isLoading}
        unsubscribed={unsubscribed}
        email={email}
        onEmailUpdate={handleEmailUpdate}
        onUnsubscribe={handleUnsubscribe}
      />
      <Snackbar {...snackbar.props} />
    </>
  );
};

export const DynamicUnsubscribeNewsletterScreen = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
