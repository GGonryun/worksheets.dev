import { NextPageWithLayout } from '@worksheets/util-next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { DynamicLayout } from '../dynamic/dynamic-layout';

const DynamicLoginScreen = dynamic(() => import('../dynamic/login-screen'), {
  ssr: false,
});

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo noindex={true} />
      <DynamicLoginScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
