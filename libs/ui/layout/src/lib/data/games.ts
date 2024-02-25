import { BasicGameInfo } from '@worksheets/util/types';

export const sampleGames: BasicGameInfo[] = Array.from({
  length: 10,
}).map((_, i) => ({
  id: i.toString(),
  name: `Game ${i}`,
  imageUrl: 'https://via.placeholder.com/150',
  plays: 0,
}));
