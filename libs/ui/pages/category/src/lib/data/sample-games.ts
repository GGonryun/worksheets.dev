import { BasicGameInfo } from '@worksheets/util/types';

export const sampleGames: BasicGameInfo[] = Array.from({ length: 10 }).map(
  (_, index) => ({
    id: `${index}`,
    name: `Game ${index}`,
    image: `https://picsum.photos/seed/${index}/200/300`,
  })
);
