import { BasicGameInfo } from '@worksheets/util/types';

export const sampleGames: BasicGameInfo[] = Array.from({ length: 10 }).map(
  (_, index) => ({
    id: `${index}`,
    title: `Game ${index}`,
    thumbnail: `https://picsum.photos/seed/${index}/200/300`,
    cover: `https://picsum.photos/seed/${index}/400/600`,
    plays: 0,
  })
);
