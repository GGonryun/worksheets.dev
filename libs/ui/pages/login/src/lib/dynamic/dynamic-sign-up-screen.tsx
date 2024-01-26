import dynamic from 'next/dynamic';

export const DynamicSignUpScreen = dynamic(
  () => import('../containers/sign-up-screen-container'),
  {
    ssr: false,
  }
);
