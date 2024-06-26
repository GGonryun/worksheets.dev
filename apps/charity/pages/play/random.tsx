import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicRandomGameScreen } from '@worksheets/ui/pages/game';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo noindex />
      <DynamicRandomGameScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
