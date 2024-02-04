import { MarkdownMetadata } from '@worksheets/util-markdown';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { BlogListScreen } from '../components/blog-list-screen';

const BlogListScreenContainer: React.FC<{ posts: MarkdownMetadata[] }> = ({
  posts,
}) => {
  const { query } = useRouter();
  const tag = query.tag as string;

  return <BlogListScreen tag={tag} posts={posts} />;
};

export const DynamicBlogListScreen = dynamic(
  () => Promise.resolve(BlogListScreenContainer),
  { ssr: false }
);
