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
import { POSTS_PATH } from '../../util/paths';
import { BlogErrorScreen, BlogPostScreen } from '@worksheets/ui/pages/blog';
import { LayoutContainer } from '../../containers/layout-container';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { blogAuthors } from '@worksheets/data-access/charity-games';

type Props = {
  metadata: MarkdownMetadata;
  content: string;
  slug: string;
};

const Page: NextPageWithLayout<Props> = ({ slug, metadata, content }) => {
  const router = useRouter();

  if (!router.isFallback && !slug) {
    return <BlogErrorScreen />;
  }
  const author = blogAuthors[metadata.authorId];
  const openGraph = {
    url: `https://www.charity.games/blog/${slug}`,
    title: `${metadata.title} - Charity Games`,
    description: metadata.excerpt,
    type: 'article',
    article: {
      publishedTime: metadata.date,
      modifiedTime: metadata.date,
      authors: ['https://www.charity.games/about'],
      tags: metadata.tags,
    },
    images: [
      {
        url: metadata.ogImage.url,
        alt: metadata.title,
      },
    ],
  };

  return (
    <>
      <NextSeo
        title={openGraph.title}
        description={openGraph.description}
        canonical={openGraph.url}
        openGraph={openGraph}
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

      <ArticleJsonLd
        type="BlogPosting"
        url={openGraph.url}
        title={openGraph.title}
        images={[metadata.ogImage.url]}
        datePublished={metadata.date}
        dateModified={metadata.date}
        authorName={author.name}
        description={openGraph.description}
      />
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
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
