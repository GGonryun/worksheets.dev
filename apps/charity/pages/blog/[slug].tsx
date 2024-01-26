import { BLOG_BASE_URL } from '@worksheets/ui/env';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { GetServerSideProps, NextPage } from 'next';

const Page: NextPage = () => <LoadingScreen />;

export const getServerSideProps = (async (ctx) => {
  const slug = ctx.params?.slug;
  return {
    redirect: {
      destination: `${BLOG_BASE_URL}/posts/${slug}`,
      permanent: true,
    },
  };
}) satisfies GetServerSideProps;

export default Page;
