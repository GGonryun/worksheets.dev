import { BlogAuthor } from '@worksheets/util/types';

export type BlogAuthorId = 'miguel-campos' | 'esbeidy-campos';
export const blogAuthors: Record<BlogAuthorId, BlogAuthor> = {
  'miguel-campos': {
    id: 'miguel-campos',
    name: 'Miguel Campos',
    avatar: '/blog/authors/miguel.jpeg',
  },
  'esbeidy-campos': {
    id: 'esbeidy-campos',
    name: 'Esbeidy Campos',
    avatar: '/blog/authors/esbeidy.png',
  },
};
