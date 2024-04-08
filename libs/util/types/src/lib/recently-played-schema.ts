import { BasicGameInfo } from './arcade';

export type RecentlyPlayedSchema = {
  playedLast: number;
} & Omit<BasicGameInfo, 'cover'>;
