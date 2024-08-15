import { helpTokens } from '@worksheets/ui/components/help';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { helpPageJson, HelpScreen } from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpTokensSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpTokensSeo} />
      <HelpScreen
        title="Tokens"
        description={
          'Charity Games converts your playtime into tokens, which you can use to redeem rewards. Find out how to earn tokens and how to redeem them for real world prize sand rewards'
        }
        qa={helpTokens}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpTokens)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
