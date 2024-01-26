import { BLOG_BASE_URL } from '@worksheets/ui/env';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { GetServerSideProps, NextPage } from 'next';

const Page: NextPage = () => <LoadingScreen />;

export const getServerSideProps = (async (ctx) => {
  return {
    redirect: {
      destination: BLOG_BASE_URL,
      permanent: false,
    },
  };
}) satisfies GetServerSideProps;

export default Page;
