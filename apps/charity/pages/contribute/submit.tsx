import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
// import { GameSubmissionScreen } from '@worksheets/ui/pages/contributions';
import { NextSeo } from 'next-seo';
import { submitGameSeo } from '../../util/seo';
import { UnderConstruction } from '@worksheets/ui/pages/under-construction';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...submitGameSeo} />
      <UnderConstruction />
      {/* TODO: add props */}
      {/* <GameSubmissionScreen invalidProfile={false} formErrors={{}} /> */}
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
