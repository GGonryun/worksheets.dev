import { trpc } from '@worksheets/trpc-charity';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { validateEmail } from '@worksheets/util/strings';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { UnsubscribeNewsletterScreen } from '../components/unsubscribe-newsletter-screen';

const Container: React.FC = () => {
  const snackbar = useSnackbar();

  const { query } = useRouter();
  const id = query.id as string | undefined;

  const subscription = trpc.newsletter.subscription.useQuery(
    { id },
    { enabled: !!id, retry: false }
  );
  const unsubscribe = trpc.newsletter.unsubscribe.useMutation();

  const [email, setEmail] = useState('');
  const [unsubscribed, setUnsubscribed] = useState(false);

  useEffect(() => {
    setEmail(subscription.data?.email ?? '');
  }, [subscription.data]);

  const handleEmailUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setUnsubscribed(false);
  };

  const handleUnsubscribe = async () => {
    if (validateEmail(email)) {
      try {
        await unsubscribe.mutateAsync({ email });
        setUnsubscribed(true);
        snackbar.warning('Subscription removed successfully');
      } catch (error) {
        snackbar.error(parseTRPCClientErrorMessage(error));
      } finally {
        setEmail('');
      }
    } else {
      snackbar.error('Please enter a valid email address.');
    }
  };

  if (subscription.isFetching) {
    return <LoadingScreen />;
  }

  return (
    <UnsubscribeNewsletterScreen
      loading={unsubscribe.isLoading}
      unsubscribed={unsubscribed}
      email={email}
      onEmailUpdate={handleEmailUpdate}
      onUnsubscribe={handleUnsubscribe}
    />
  );
};

export const DynamicUnsubscribeNewsletterScreen = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
