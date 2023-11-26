import { OgImage } from './og-image';

export interface MarkdownMetadata {
  title: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  date: string;
  authorId: string;
  ogImage: OgImage;
  slug: string;
}
