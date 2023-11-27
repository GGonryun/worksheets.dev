import { NextPageWithLayout } from '@worksheets/util-next';
import {
  MarkdownMetadata,
  getAllPostsMetadata,
} from '@worksheets/util-markdown';
import { POSTS_PATH } from '../../util/paths';
import { BlogScreen } from '@worksheets/ui-charity';
import { LayoutContainer } from '../../containers/layout-container';

type Props = {
  posts: MarkdownMetadata[];
};

const Page: NextPageWithLayout<Props> = ({ posts }) => (
  <BlogScreen posts={posts} />
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const posts = getAllPostsMetadata(POSTS_PATH);
  return { props: { posts } };
};

export default Page;
