import { DynamicLayout } from '@worksheets/ui/layout';
import { getRandomGame } from '@worksheets/ui/pages/game';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo noindex />
      <LoadingScreen />
    </>
  );
};

export const getServerSideProps = (async () => {
  const randomGame = getRandomGame(false);

  return {
    props: {
      redirect: {
        destination: `/play/${randomGame.id}`,
        permanent: false,
      },
    },
  };
}) satisfies GetServerSideProps;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
