import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { LoadingBar } from '@worksheets/ui/components/loading';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

import { SubscriptionFormContainer } from '../container/subscription-form-container';

const Container: React.FC = () => {
  const session = useSession();
  const connected = session.status === 'authenticated';
  const subscription = trpc.user.newsletter.subscription.useQuery(undefined, {
    enabled: connected,
    retry: false,
  });

  if (subscription.isLoading) return <LoadingBar />;
  if (subscription.isError)
    return <ErrorComponent message={subscription.error.message} />;

  return <SubscriptionFormContainer hideEmail id={subscription.data.id} />;
};

export const DynamicUserSubscriptionForm = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: LoadingBar,
  }
);
