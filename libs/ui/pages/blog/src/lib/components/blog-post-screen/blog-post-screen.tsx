import { BasicGameInfo, BlogAuthor } from '@worksheets/util/types';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { FC } from 'react';

import { BlogPost } from './blog-post';
import { BlogPostLayout } from './blog-post-layout';

export type BlogPostScreenProps = {
  popularGames: BasicGameInfo[];
  metadata: MarkdownMetadata;
  content: string;
  author: BlogAuthor;
};

export const BlogPostScreen: FC<BlogPostScreenProps> = ({
  metadata,
  popularGames,
  content,
  author,
}) => {
  return (
    <BlogPostLayout games={popularGames}>
      <BlogPost metadata={metadata} content={content} author={author} />
    </BlogPostLayout>
  );
};
