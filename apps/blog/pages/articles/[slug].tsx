import { prisma } from '@worksheets/prisma';
import { BlogPostScreen } from '@worksheets/ui/pages/blog';
import { blogAuthors } from '@worksheets/util/blog';
import { BasicGameInfo, BlogAuthor } from '@worksheets/util/types';
import {
  ArticleProps,
  getFilePaths,
  getParsedFileContentBySlug,
  MarkdownMetadata,
  markdownToHtml,
} from '@worksheets/util-markdown';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  ArticleJsonLd,
  ArticleJsonLdProps,
  NextSeo,
  NextSeoProps,
} from 'next-seo';

import { POSTS_PATH } from '../../util/paths';
import { blogArticleJsonLd, blogArticleSeo } from '../../util/seo';

type ComponentProps = {
  metadata: MarkdownMetadata;
  popularGames: BasicGameInfo[];
  content: string;
  seo: NextSeoProps;
  articleJsonLd: ArticleJsonLdProps;
  author: BlogAuthor;
};

const Page: NextPageWithLayout<ComponentProps> = ({
  popularGames,
  metadata,
  content,
  seo,
  articleJsonLd,
  author,
}) => {
  return (
    <>
      <NextSeo {...seo} />
      <BlogPostScreen
        popularGames={popularGames}
        metadata={metadata}
        content={content}
        author={author}
      />
      <ArticleJsonLd {...articleJsonLd} />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  const params = ctx.params as ArticleProps;
  // read markdown file into content and frontmatter
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  if (!articleMarkdownContent) {
    return {
      notFound: true,
    };
  }

  const metadata = articleMarkdownContent.metadata;
  const slug = params.slug;
  const author = blogAuthors[metadata.authorId];
  const content = await markdownToHtml(articleMarkdownContent.content || '');
  const seo = blogArticleSeo(slug, metadata);
  const articleJsonLd = blogArticleJsonLd(slug, metadata, author);

  const popularGames = await prisma.game.findMany({
    orderBy: {
      plays: 'desc',
    },
    take: 8,
    select: {
      id: true,
      title: true,
      plays: true,
      thumbnail: true,
      cover: true,
    },
  });

  return {
    props: {
      // marketing
      seo,
      articleJsonLd,
      // content
      metadata,
      content,
      author,
      popularGames,
    },
  };
}) satisfies GetStaticProps<ComponentProps>;

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = getFilePaths(POSTS_PATH);

  return {
    paths,
    fallback: false,
  };
};

export default Page;
