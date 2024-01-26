import { Box } from '@mui/material';
import { DynamicLayout } from '@worksheets/ui/layout';
import {
  getAllPostsMetadata,
  MarkdownMetadata,
} from '@worksheets/util-markdown';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { POSTS_PATH } from '../util/paths';
import { blogSeo } from '../util/seo';

type Props = {
  posts: MarkdownMetadata[];
};

const Page: NextPageWithLayout<Props> = ({ posts }) => (
  <>
    <NextSeo {...blogSeo} />
    <Box>TODO: Blog Home Screen</Box>
    {/* <BlogHomeScreen posts={posts} /> */}
  </>
);

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const posts = getAllPostsMetadata(POSTS_PATH);
  return { props: { posts } };
};

export default Page;
