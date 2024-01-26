import dynamic from 'next/dynamic';

export const DynamicLayout = dynamic(
  () => import('../container/layout-container'),
  {
    ssr: false,
  }
);
