import { NextPageWithLayout } from '@worksheets/util-next';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { LayoutContainer } from '../containers/layout-container';
import { useRouter } from 'next/router';
import { FAQPageJsonLd, NextSeo } from 'next-seo';
import { helpSeo } from '../util/seo';
import { helpFaq } from '@worksheets/data-access/charity-games';

const Page: NextPageWithLayout = () => {
  const { asPath } = useRouter();
  const bookmark = asPath.split('#').at(-1);

  return (
    <>
      <NextSeo {...helpSeo} />
      <HelpScreen bookmark={bookmark} qa={helpFaq} />
      <FAQPageJsonLd
        mainEntity={helpFaq.map((data) => ({
          questionName: data.question,
          acceptedAnswerText: data.answer,
        }))}
      />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
