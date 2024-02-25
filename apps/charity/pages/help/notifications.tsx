import { AppLayoutContainer } from '@worksheets/ui/layout';
import {
  helpNotifications,
  helpPageJson,
  HelpScreen,
} from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpNotificationsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpNotificationsSeo} />
      <HelpScreen
        title={'Notifications'}
        description={
          'We will notify you when you win a prize, when a raffle you entered is about to end, and when a raffle you entered has ended. You can also opt in to receive notifications for new raffles and other updates.'
        }
        qa={helpNotifications}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpNotifications)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
