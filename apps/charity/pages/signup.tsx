import { NextPageWithLayout } from '@worksheets/util-next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { DynamicLayout } from '../dynamic/dynamic-layout';

const DynamicSignUpScreen = dynamic(() => import('../dynamic/sign-up-screen'), {
  ssr: false,
});

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo noindex={true} />
    <DynamicSignUpScreen />
  </>
);

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
