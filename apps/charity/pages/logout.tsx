import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

import { DynamicLayout } from '../dynamic/dynamic-layout';

const Page: NextPageWithLayout = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'loading') {
      return;
    } else if (session.status === 'unauthenticated') {
      router.replace('/');
    } else {
      signOut({ callbackUrl: '/' });
    }
  }, [router, session]);

  return (
    <>
      <NextSeo noindex={true} title={'Log Out - Charity Games'} />
      <LoadingScreen message="We're logging you out..." />
    </>
  );
};

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;