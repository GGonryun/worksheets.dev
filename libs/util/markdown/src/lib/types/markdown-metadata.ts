import { Author } from '@worksheets/util/blog';

import { OgImage } from './og-image';

export interface MarkdownMetadata {
  title: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  date: string;
  authorId: Author;
  ogImage: OgImage;
  slug: string;
}
