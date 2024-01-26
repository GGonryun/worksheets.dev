import { BasicGameInfo } from '../components/types/game-info';

export const sampleGames: BasicGameInfo[] = Array.from({
  length: 10,
}).map((_, i) => ({
  id: i.toString(),
  name: `Game ${i}`,
  image: '/games/c/game.png',
}));
