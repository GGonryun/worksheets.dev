import * as games from '@worksheets/ui-games';

export const urls = {
  home: () => '/',
  game: () => '/game',
  ...games.urls,
};
