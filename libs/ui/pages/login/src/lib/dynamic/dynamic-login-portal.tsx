import dynamic from 'next/dynamic';

export const DynamicLoginPortal = dynamic(
  () => import('../containers/login-portal-container'),
  {
    ssr: false,
  }
);
