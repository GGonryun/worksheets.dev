import Head from 'next/head';
import { FC } from 'react';
import { MobileMeta } from './MobileMeta';

export const DocumentHead: FC<{
  title: string;
}> = ({ title }) => (
  <Head>
    <title>{title}</title>
    <MobileMeta />
  </Head>
);
