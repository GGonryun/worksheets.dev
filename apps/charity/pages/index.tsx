import { DynamicLayout } from '@worksheets/ui/layout';
import { DynamicArcadeScreen } from '@worksheets/ui/pages/arcade';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { homeSeo } from '../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...homeSeo} />
      <DynamicArcadeScreen />
    </>
  );
};

export const getServerSideProps = (async (ctx) => {
  return {
    props: {},
  };
}) satisfies GetServerSideProps;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
