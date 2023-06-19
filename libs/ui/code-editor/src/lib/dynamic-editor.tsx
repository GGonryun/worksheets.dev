import dynamic from 'next/dynamic';

export const DynamicCodeEditor = dynamic(() => import('./ace-editor'), {
  ssr: false,
});
