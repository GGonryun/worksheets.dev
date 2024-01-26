import dynamic from 'next/dynamic';

export const DynamicArcadeScreen = dynamic(
  () => import('../container/arcade-screen-container'),
  {
    ssr: false,
  }
);
