import { trpc } from '@worksheets/trpc-charity';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { ConfirmNewsletterScreen } from '../components/confirm-newsletter-screen';

const Container: React.FC = () => {
  const snackbar = useSnackbar();

  const { query } = useRouter();
  const id = query.id as string;

  const confirm = trpc.newsletter.confirm.useMutation();
  const subscription = trpc.newsletter.subscription.useQuery(
    {
      id,
    },
    {
      enabled: !!id,
      retry: false,
    }
  );

  const handleConfirm = async () => {
    if (!subscription.data) return;
    try {
      await confirm.mutateAsync(subscription.data);
      await subscription.refetch();
      snackbar.success('Confirmed! You are now subscribed to our newsletter!');
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  if (subscription.isFetching) {
    return <LoadingScreen />;
  }

  if (subscription.isError) {
    return <ErrorScreen message={subscription.error.message} />;
  }

  if (!subscription.data) {
    return <ErrorScreen message="Subscription not found" />;
  }

  return (
    <ConfirmNewsletterScreen
      loading={confirm.isLoading}
      subscription={subscription.data}
      onConfirm={handleConfirm}
    />
  );
};

export const DynamicConfirmNewsletterScreen = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
