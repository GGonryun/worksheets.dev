import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicBattleScreen } from '@worksheets/ui/pages/mobs';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { bossBattlesSeo } from '../../util/seo';

type Props = {
  // none
};

const Page: NextPageWithLayout<Props> = () => {
  return (
    <>
      <NextSeo {...bossBattlesSeo} />
      <DynamicBattleScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
