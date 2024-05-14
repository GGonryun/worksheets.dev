import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicUserScreen } from '@worksheets/ui/pages/users';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { userSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();
  const userId = query.userId as string;
  return (
    <>
      <NextSeo noindex {...userSeo(userId)} />
      <DynamicUserScreen userId={userId} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
