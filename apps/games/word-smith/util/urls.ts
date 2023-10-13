import * as games from '@worksheets/ui-games';
import { Difficulty } from './puzzle';

export const urls = {
  home: () => '/',
  puzzle: (difficulty: Difficulty) => `/puzzle?difficulty=${difficulty}`,
  ...games.urls,
};
