import { NextPageWithLayout } from '@worksheets/util-next';
import {
  MarkdownMetadata,
  getAllPostsMetadata,
} from '@worksheets/util-markdown';
import { POSTS_PATH } from '../../util/paths';
import { BlogScreen } from '@worksheets/ui/pages/blog';
import { LayoutContainer } from '../../containers/layout-container';
import { NextSeo } from 'next-seo';

type Props = {
  posts: MarkdownMetadata[];
};

const openGraph = {
  url: `https://www.charity.games/blog/`,
  title: `Charity Games - Blog and Learn`,
  description: `Stay up to date with the latest news and updates from Charity Games. Learn about our mission and how you can help us make a difference.`,
};

const Page: NextPageWithLayout<Props> = ({ posts }) => (
  <>
    <NextSeo
      title={openGraph.title}
      description={openGraph.description}
      canonical={openGraph.url}
      openGraph={openGraph}
    />
    <BlogScreen posts={posts} />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const posts = getAllPostsMetadata(POSTS_PATH);
  return { props: { posts } };
};

export default Page;
