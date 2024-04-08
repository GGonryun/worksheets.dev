import { BasicGameInfo } from '@worksheets/util/types';

export const sampleGames: BasicGameInfo[] = Array.from({
  length: 10,
}).map((_, i) => ({
  id: i.toString(),
  title: `Game ${i}`,
  thumbnail: 'https://via.placeholder.com/150',
  cover: 'https://via.placeholder.com/300',
  plays: 0,
}));
