import dynamic from 'next/dynamic';

import { SubscriptionFormContainer } from '../container/subscription-form-container';

export const DynamicSubscriptionForm = dynamic(
  () => Promise.resolve(SubscriptionFormContainer),
  {
    ssr: false,
  }
);
