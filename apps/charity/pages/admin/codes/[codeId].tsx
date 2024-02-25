import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicAdminCodeScreen } from '@worksheets/ui/pages/admin';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { adminMiddleware } from '../../../util/middleware/admins-only';

type Props = {
  codeId: string;
};

const Page: NextPageWithLayout<Props> = ({ codeId }) => (
  <>
    <NextSeo noindex title="Admin - Activation Code Details" />
    <DynamicAdminCodeScreen codeId={codeId} />
  </>
);

export const getServerSideProps = adminMiddleware<Props>(async (ctx) => {
  const codeId = ctx.params?.codeId as string;
  if (!codeId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      codeId,
    },
  };
});

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
