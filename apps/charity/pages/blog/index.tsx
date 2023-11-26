import { NextPageWithLayout } from '@worksheets/util-next';
import {
  MarkdownMetadata,
  getAllPostsMetadata,
} from '@worksheets/util-markdown';
import { POSTS_PATH } from '../../util/paths';
import { Layout, BlogScreen } from '@worksheets/ui-charity';

type Props = {
  posts: MarkdownMetadata[];
};

const Page: NextPageWithLayout<Props> = ({ posts }) => (
  <BlogScreen posts={posts} />
);

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const posts = getAllPostsMetadata(POSTS_PATH);
  return { props: { posts } };
};

export default Page;
