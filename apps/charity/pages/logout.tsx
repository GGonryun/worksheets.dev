import { AppLayoutContainer } from '@worksheets/ui/layout';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { routes } from '@worksheets/ui/routes';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

const Page: NextPageWithLayout = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'loading') {
      return;
    } else if (session.status === 'unauthenticated') {
      router.replace(routes.play.path());
    } else {
      signOut({ callbackUrl: routes.play.path() });
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
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
