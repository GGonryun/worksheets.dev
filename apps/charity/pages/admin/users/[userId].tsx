import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicAdminUserScreen } from '@worksheets/ui/pages/admin';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { adminMiddleware } from '../../../util/middleware/admins-only';

type Props = {
  userId: string;
};

const Page: NextPageWithLayout<Props> = ({ userId }) => (
  <>
    <NextSeo noindex title="Admin - User Details" />
    <DynamicAdminUserScreen userId={userId} />
  </>
);

export const getServerSideProps = adminMiddleware<Props>(async (ctx) => {
  const userId = ctx.params?.userId as string;
  if (!userId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      userId,
    },
  };
});

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
