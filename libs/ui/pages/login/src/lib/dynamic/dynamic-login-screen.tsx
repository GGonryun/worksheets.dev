import dynamic from 'next/dynamic';

export const DynamicLoginScreen = dynamic(
  () => import('../containers/login-screen-container'),
  {
    ssr: false,
  }
);
