import { NextPageWithLayout } from '@worksheets/util-next';
import {
  MarkdownMetadata,
  getAllPostsMetadata,
} from '@worksheets/util-markdown';
import { POSTS_PATH } from '../../util/paths';
import { BlogScreen } from '@worksheets/ui/pages/blog';
import { LayoutContainer } from '../../containers/layout-container';
import { NextSeo } from 'next-seo';
import { blogSeo } from '../../util/seo';

type Props = {
  posts: MarkdownMetadata[];
};

const Page: NextPageWithLayout<Props> = ({ posts }) => (
  <>
    <NextSeo {...blogSeo} />
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
