import { Author } from '@worksheets/util/blog';

export interface MarkdownMetadata {
  title: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  date: string;
  authorId: Author;
  slug: string;
}
