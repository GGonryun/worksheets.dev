import { Box, Typography } from '@mui/material';
import { blogAuthors } from '@worksheets/data-access/charity-games';
import { BlogErrorScreen, BlogPostScreen } from '@worksheets/ui/pages/blog';
import { BlogAuthor } from '@worksheets/util/types';
import {
  ArticleProps,
  EMPTY_METADATA,
  getFilePaths,
  getParsedFileContentBySlug,
  MarkdownMetadata,
  markdownToHtml,
} from '@worksheets/util-markdown';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArticleJsonLd, ArticleJsonLdProps, NextSeo } from 'next-seo';

import { DynamicLayout } from '../../dynamic/dynamic-layout';
import { POSTS_PATH } from '../../util/paths';
import {
  blogArticleJsonLd,
  blogArticleSeo,
  OpenGraphProps,
} from '../../util/seo';

type Props = {
  metadata: MarkdownMetadata;
  content: string;
  slug: string;
  seo: OpenGraphProps;
  articleJsonLd: ArticleJsonLdProps;
  author: BlogAuthor;
};

const Page: NextPageWithLayout<Props> = ({
  slug,
  metadata,
  content,
  seo,
  articleJsonLd,
  author,
}) => {
  const router = useRouter();

  if (!router.isFallback && !slug) {
    return <BlogErrorScreen />;
  }

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        openGraph={seo}
      />

      <Box>
        {router.isFallback ? (
          <Typography variant="h4">Loading . . .</Typography>
        ) : (
          <article>
            <Head>
              <title>{metadata.title}</title>
              <meta property="og:image" content={metadata.ogImage.url} />
            </Head>
            <BlogPostScreen
              metadata={metadata}
              content={content}
              author={author}
            />
          </article>
        )}
      </Box>
      <ArticleJsonLd {...articleJsonLd} />
    </>
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
        seo: {},
        metadata: EMPTY_METADATA,
        slug: '',
        content: '',
        articleJsonLd: {
          url: '',
          title: '',
          images: [],
          datePublished: '',
          authorName: undefined,
          description: '',
        },
        author: {
          id: '',
          name: '',
          avatar: '',
        },
      },
    };
  }

  const metadata = articleMarkdownContent.metadata;
  const slug = params.slug;
  const author = blogAuthors[metadata.authorId];
  const content = await markdownToHtml(articleMarkdownContent.content || '');

  const seo = blogArticleSeo(slug, metadata);
  const articleJsonLd = blogArticleJsonLd(slug, metadata, author);

  return {
    props: {
      seo,
      metadata,
      slug,
      content,
      articleJsonLd,
      author,
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
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
