import { Author, blogAuthors } from '@worksheets/util/blog';
import { BlogAuthor } from '@worksheets/util/types';

export const getAuthor = (authorId: Author): BlogAuthor => {
  return blogAuthors[authorId];
};
