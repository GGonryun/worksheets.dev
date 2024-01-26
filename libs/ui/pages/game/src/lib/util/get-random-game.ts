import { games } from '@worksheets/data-access/charity-games';
import { GameSchema } from '@worksheets/util/types';

export const getRandomGame = (gameMustSupportMobile: boolean): GameSchema => {
  let randomGame;
  do {
    const randomIndex = Math.floor(Math.random() * games.length);
    randomGame = games[randomIndex];
  } while (gameMustSupportMobile && !randomGame.platforms.includes('mobile'));

  return randomGame;
};
