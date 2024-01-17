import { helpContributions, HelpScreen } from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { DynamicLayout } from '../../dynamic/dynamic-layout';
import { helpContributionsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpContributionsSeo} />
      <HelpScreen
        title={'Get Involved'}
        description={
          "Embark on a quest to raise money for charity by playing games, and help us spread the word. Whether you're a developer looking to add your game to our platform, or a player looking to help us spread the word, we'd love to hear from you!"
        }
        qa={helpContributions}
      />
      <FAQPageJsonLd
        mainEntity={helpContributions
          .filter((data) => Boolean(data.summary))
          .map((data) => ({
            questionName: data.question,
            acceptedAnswerText: data.summary,
          }))}
      />
    </>
  );
};

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
