import dynamic from 'next/dynamic';

export const DynamicCodeEditor = dynamic(
  () => import('./unopinionated-editor'),
  {
    ssr: false,
  }
);
