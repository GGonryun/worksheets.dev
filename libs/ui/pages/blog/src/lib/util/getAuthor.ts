import { BlogAuthorId, blogAuthors } from '@worksheets/util/blog';
import { BlogAuthor } from '@worksheets/util/types';

export const getAuthor = (authorId: BlogAuthorId): BlogAuthor => {
  return blogAuthors[authorId];
};
