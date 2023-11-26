import { NextPageWithLayout } from '@worksheets/util-next';
import { Box, Typography } from '@mui/material';
import {
  ArticleProps,
  MarkdownMetadata,
  getFilePaths,
  getParsedFileContentBySlug,
  markdownToHtml,
  EMPTY_METADATA,
} from '@worksheets/util-markdown';
import { GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BlogErrorPage } from '../../components/blog';
import { POSTS_PATH } from '../../util/paths';
import { BlogPostScreen, Layout } from '@worksheets/ui-charity';

type Props = {
  metadata: MarkdownMetadata;
  content: string;
  slug: string;
};

const Page: NextPageWithLayout<Props> = ({ slug, metadata, content }) => {
  const router = useRouter();

  if (!router.isFallback && !slug) {
    return <BlogErrorPage />;
  }

  return (
    <Box>
      {router.isFallback ? (
        <Typography variant="h4">Loading . . .</Typography>
      ) : (
        <>
          <Head>
            <title>{metadata.title}</title>
            <meta property="og:image" content={metadata.ogImage.url} />
          </Head>
          <BlogPostScreen metadata={metadata} content={content} />
        </>
      )}
    </Box>
  );
};

export const getStaticProps = async ({
  params,
}: {
  params: ArticleProps;
}): Promise<{ props: Props }> => {
  // read markdown file into content and frontmatter
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  if (!articleMarkdownContent) {
    // if the article doesn't exist return an empty object.
    return {
      props: {
        metadata: EMPTY_METADATA,
        slug: '',
        content: '',
      },
    };
  }

  const html = await markdownToHtml(articleMarkdownContent.content || '');

  return {
    props: {
      metadata: articleMarkdownContent.metadata,
      slug: params.slug,
      content: html,
    },
  };
};
export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = getFilePaths(POSTS_PATH);

  return {
    paths,
    fallback: false,
  };
};

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Page;
