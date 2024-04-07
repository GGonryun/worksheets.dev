import { DynamicSubscriptionForm } from '@worksheets/ui/components/newsletter';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { SubscribeNewsletterScreen } from '../components/subscribe-newsletter-screen';
const Container: React.FC = () => {
  const { query } = useRouter();
  const id = query.id as string | undefined;

  return (
    <SubscribeNewsletterScreen
      id={id}
      form={<DynamicSubscriptionForm id={id} />}
    />
  );
};

export const DynamicSubscribeNewsletterScreen = dynamic(
  () => Promise.resolve(Container),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
