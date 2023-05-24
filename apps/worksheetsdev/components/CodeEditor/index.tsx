import dynamic from 'next/dynamic';

export const CodeEditor = dynamic(() => import('./CodeEditor'), { ssr: false });
