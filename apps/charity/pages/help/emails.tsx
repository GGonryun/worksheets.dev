import { AppLayoutContainer } from '@worksheets/ui/layout';
import {
  helpEmails,
  helpPageJson,
  HelpScreen,
} from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpEmailsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpEmailsSeo} />
      <HelpScreen
        title={'Emails'}
        description={
          'Emails are sent to keep you informed about your account, rewards, and new games. We never send spam emails.'
        }
        qa={helpEmails}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpEmails)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
