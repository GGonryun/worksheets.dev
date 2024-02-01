import { BasicGameInfo } from './basic-game-info';

export type RecentlyPlayedSchema = {
  playedLast: number;
} & BasicGameInfo;
