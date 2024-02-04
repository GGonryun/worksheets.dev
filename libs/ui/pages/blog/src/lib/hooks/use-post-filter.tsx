import { MarkdownMetadata } from '@worksheets/util-markdown';

export const usePostFilter = (
  posts: MarkdownMetadata[],
  tag: string
): MarkdownMetadata[] => {
  if (!tag) return posts;

  return posts.filter((post) => post.tags.includes(tag));
};
