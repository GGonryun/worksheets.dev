import { Author } from './author';
import { OgImage } from './og-image';

export interface MarkdownMetadata {
  title: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  date: string;
  author: Author;
  ogImage: OgImage;
  slug: string;
}
