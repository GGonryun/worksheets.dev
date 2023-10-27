import { MarkdownMetadata } from './types';

export const EMPTY_METADATA: MarkdownMetadata = {
  title: '',
  excerpt: '',
  coverImage: '',
  tags: [],
  date: '',
  author: {
    name: '',
    picture: '',
    id: '',
  },
  ogImage: {
    url: '',
  },
  slug: '',
};
