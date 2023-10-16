import * as games from '@worksheets/ui-games';

export const urls = {
  home: () => '/',
  levels: () => '/levels',
  puzzle: (id: string) => `/puzzle?id=${id}`,
  gallery: () => '/gallery',
  ...games.urls,
};
