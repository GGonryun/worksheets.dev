import { LayoutContainer } from '@worksheets/ui/layout';
import {
  helpFriends,
  helpPageJson,
  HelpScreen,
} from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpFriendsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpFriendsSeo} />
      <HelpScreen
        title={'Friends'}
        description={
          'Get help with adding, managing, and removing friends. Friends can help you earn tokens and rewards. Find out how to add friends and how to remove friends.'
        }
        qa={helpFriends}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpFriends)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
