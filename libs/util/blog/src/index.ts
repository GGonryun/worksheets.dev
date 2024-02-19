import { BlogAuthor } from '@worksheets/util/types';

export enum Author {
  MiguelCampos = 'miguel-campos',
  EsbeidyCampos = 'esbeidy-campos',
  TakiPineda = 'taki-pineda',
}

export const blogAuthors: Record<Author, BlogAuthor> = {
  [Author.TakiPineda]: {
    id: 'taki-pineda',
    name: 'Taki Pineda',
    avatar: '/blog/authors/taki.png',
  },
  [Author.MiguelCampos]: {
    id: 'miguel-campos',
    name: 'Miguel Campos',
    avatar: '/blog/authors/miguel.jpeg',
  },
  [Author.EsbeidyCampos]: {
    id: 'esbeidy-campos',
    name: 'Esbeidy Campos',
    avatar: '/blog/authors/esbeidy.png',
  },
};
