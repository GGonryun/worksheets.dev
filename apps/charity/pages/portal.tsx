import { NextPageWithLayout } from '@worksheets/util-next';
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { DynamicLayout } from '../dynamic/dynamic-layout';

const DynamicLoginPortal = dynamic(() => import('../dynamic/login-portal'), {
  ssr: false,
});

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo title="Charity Games - Login Portal" noindex />
    <DynamicLoginPortal />
  </>
);

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
