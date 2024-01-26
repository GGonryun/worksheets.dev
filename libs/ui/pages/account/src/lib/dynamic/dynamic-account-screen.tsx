import dynamic from 'next/dynamic';

export const DynamicAccountScreen = dynamic(
  () => import('../containers/account-screen-container'),
  {
    ssr: false,
  }
);
