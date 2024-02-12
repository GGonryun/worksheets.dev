import { BasicGameInfo } from './arcade';

export type RecentlyPlayedSchema = {
  playedLast: number;
} & BasicGameInfo;
