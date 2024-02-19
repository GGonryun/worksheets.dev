import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { routes } from '@worksheets/ui/routes';
import { Author, blogAuthors } from '@worksheets/util/blog';
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
  const authorId = ctx.params?.authorId as Author;
  const author = blogAuthors[authorId];

  if (!author) {
    return {
      notFound: true,
    };
  }

  const authorUrl = routes.about.url({
    bookmark: authorId,
  });

  return {
    redirect: {
      destination: authorUrl,
      permanent: false,
    },
  };
}) satisfies GetServerSideProps;

export default BlogAuthorPage;
