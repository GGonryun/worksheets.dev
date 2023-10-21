import { GameDifficulty } from './enums';

export const difficultyImage: Record<GameDifficulty, string> = {
  [GameDifficulty.None]: '/cards/back4.png',
  [GameDifficulty.Easy]: '/cards/back3.png',
  [GameDifficulty.Hard]: '/cards/back2.png',
};
export const difficultyName: Record<GameDifficulty, string> = {
  [GameDifficulty.None]: 'Pick a difficulty',
  [GameDifficulty.Easy]: 'Easy',
  [GameDifficulty.Hard]: 'Hard',
};
