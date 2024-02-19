import { Author } from '@worksheets/util/blog';

import { MarkdownMetadata } from './types';

export const EMPTY_METADATA: MarkdownMetadata = {
  title: '',
  excerpt: '',
  coverImage: '',
  tags: [],
  date: '',
  authorId: Author.MiguelCampos,
  ogImage: {
    url: '',
  },
  slug: '',
};
