import { NextPageWithLayout } from '@worksheets/util-next';
import { Box, Container } from '@mui/material';
import { WebsiteLayout } from '../../components/Layout';
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
import {
  BlogErrorPage,
  PostBody,
  PostHeader,
  PostTitle,
  PostFooter,
} from '../../components/blog';
import { POSTS_PATH } from '../../util/paths';

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
        <PostTitle>Loading . . .</PostTitle>
      ) : (
        <article>
          <Head>
            <title>{metadata.title}</title>
            <meta property="og:image" content={metadata.ogImage.url} />
          </Head>
          <Container
            maxWidth="md"
            sx={{
              py: 3,
            }}
          >
            <PostHeader
              title={metadata.title}
              coverImage={metadata.coverImage}
              date={metadata.date}
              author={metadata.author}
            />
            <PostBody content={content} />
            <PostFooter />
          </Container>
        </article>
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
  return <WebsiteLayout hideNavigationBar>{page}</WebsiteLayout>;
};

export default Page;
