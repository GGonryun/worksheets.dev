import {
  DeviceOrientations,
  GameDevices,
  ProjectType,
  ViewportType,
} from '@worksheets/prisma';
import { z } from 'zod';

import {
  LootSchema,
  lootSchema,
  SeedableLootSchema,
  seedableLootSchema,
} from './items';
import { GameTag } from './tag-schema';

export const basicGameAchievementSchema = z.object({
  id: z.string(),
  gameId: z.string(),
  name: z.string(),
  description: z.string(),
  iconUrl: z.string(),
});

export const seedableGameAchievementSchema = basicGameAchievementSchema.extend({
  secret: z.boolean(),
  version: z.number(),
  loot: seedableLootSchema.array(),
});

export type SeedableGameAchievementSchema = z.infer<
  typeof seedableGameAchievementSchema
>;

export const gameAchievementSchema = seedableGameAchievementSchema.extend({
  loot: lootSchema.array(),
  players: z.number(),
});

export type GameAchievementSchema = z.infer<typeof gameAchievementSchema>;

export const playerGameAchievementSchema = z.object({
  achievementId: z.string(),
  unlockedAt: z.number(),
});

export type PlayerGameAchievementSchema = z.infer<
  typeof playerGameAchievementSchema
>;

export type ViewportKeys =
  | 'ALL-DEVICES'
  | 'COMPUTER-ONLY'
  | 'DESKTOP-PORTRAIT'
  | 'DESKTOP-LANDSCAPE'
  | 'MOBILE-ONLY'
  | 'MOBILE-LANDSCAPE'
  | 'MOBILE-PORTRAIT'
  | 'LANDSCAPE-ONLY'
  | 'PORTRAIT-ONLY';

export type MarketLinks = {
  android: string;
  ios: string;
  itch: string;
  steam: string;
  website: string;
  github: string;
};

export type GameSchema = {
  id: string;
  version: number;
  name: string;
  description: string;
  developerId: string;
  iconUrl: string;
  bannerUrl: string;
  categories: GameTag[];
  createdAt: Date;
  updatedAt: Date;
  markets: Partial<MarketLinks>;
  plays: number;
  likes: number;
  multiplier: number;
  leaderboard: boolean;
  cloudStorage: boolean;
  achievements: boolean;
  dislikes: number;
  loot: LootSchema[];
  file: {
    type: ProjectType;
    url: string;
  };
  viewport: {
    id: string;
    type: ViewportType;
    devices: GameDevices[];
    orientations: DeviceOrientations[];
  };
  trailer: string | null;
};

export type GameTask = {
  type: 'score';
  score: number;
  name?: string;
  description?: string;
};

export type SeedableGameSchema = Omit<
  GameSchema,
  'likes' | 'dislikes' | 'plays' | 'trailer' | 'loot' | 'achievements'
> &
  Partial<Pick<GameSchema, 'trailer'>> & {
    publishAt?: Date;
    loot: SeedableLootSchema[];
    achievements: SeedableGameAchievementSchema[];
    tasks?: GameTask[];
  };

export type SerializableGameSchema = Omit<
  GameSchema,
  'createdAt' | 'updatedAt' | 'version'
> & {
  createdAt: string;
  updatedAt: string;
};

export type GameMonetizeSchema = {
  id: string;
  title: string;
  description: string;
  instructions: string;
  url: string;
  category: GameTag;
  tags: string;
  thumb: string;
};
