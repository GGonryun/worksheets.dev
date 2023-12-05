import { games } from '@worksheets/data-access/charity-games';
import { GameSchema } from '@worksheets/util/types';

export const getRandomGame = (gameMustSupportMobile: boolean): GameSchema => {
  const randomIndex = Math.floor(Math.random() * games.length);

  let randomGame;
  do {
    randomGame = games[randomIndex];
  } while (gameMustSupportMobile && !randomGame.platforms.includes('mobile'));

  return randomGame;
};
