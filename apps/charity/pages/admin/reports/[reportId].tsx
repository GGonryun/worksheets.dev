import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicAdminReportScreen } from '@worksheets/ui/pages/admin';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { adminMiddleware } from '../../../util/middleware/admins-only';

type Props = {
  reportId: string;
};

const Page: NextPageWithLayout<Props> = ({ reportId }) => (
  <>
    <NextSeo noindex title="Admin - Report Details" />
    <DynamicAdminReportScreen reportId={reportId} />
  </>
);

export const getServerSideProps = adminMiddleware<Props>(async (ctx) => {
  const reportId = ctx.params?.reportId as string;
  if (!reportId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      reportId,
    },
  };
});

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
