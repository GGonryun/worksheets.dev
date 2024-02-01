// this page is used by our partners to embed the progress bar on their website
import { ProgressWidget } from '@worksheets/ui/widgets';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

// TODO: take this down.
const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo noindex={true} />
      <ProgressWidget current={63} required={100} />
    </>
  );
};

export default Page;
