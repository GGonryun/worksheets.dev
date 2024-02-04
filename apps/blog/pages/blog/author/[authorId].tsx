import { CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { BlogAuthorId, blogAuthors } from '@worksheets/util/blog';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { Layout } from '../../../components/layout';

const BlogAuthorPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo noindex />
      <LoadingScreen />
    </>
  );
};

BlogAuthorPage.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = (async (ctx) => {
  const authorId = ctx.params?.authorId as BlogAuthorId;
  const author = blogAuthors[authorId];

  if (!author) {
    return {
      notFound: true,
    };
  }

  const authorUrl = `${CHARITY_GAMES_BASE_URL}/about#${author.id}`;

  return {
    redirect: {
      destination: authorUrl,
      permanent: false,
    },
  };
}) satisfies GetServerSideProps;

export default BlogAuthorPage;
