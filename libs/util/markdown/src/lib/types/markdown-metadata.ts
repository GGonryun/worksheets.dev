import { BlogAuthorId } from '@worksheets/util/blog';

import { OgImage } from './og-image';

export interface MarkdownMetadata {
  title: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  date: string;
  authorId: BlogAuthorId;
  ogImage: OgImage;
  slug: string;
}
