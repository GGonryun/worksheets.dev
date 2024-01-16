import dynamic from 'next/dynamic';

export const DynamicLayout = dynamic(
  () => import('../containers/layout-container'),
  {
    ssr: false,
  }
);
