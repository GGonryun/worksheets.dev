import {
  DeviceOrientations,
  GameDevices,
  ProjectType,
  ViewportType,
} from '@worksheets/prisma';

import { LootSchema } from './items';
import { GameTag } from './tag-schema';

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

export type SeedableGameSchema = Omit<
  GameSchema,
  'likes' | 'dislikes' | 'plays' | 'trailer' | 'loot'
> &
  Partial<Pick<GameSchema, 'trailer'>> & {
    publishAt?: Date;
    loot: {
      itemId: string;
      chance: number;
      quantity: number;
    }[];
  };

type MarketLinks = {
  android: string;
  ios: string;
  itch: string;
  steam: string;
  website: string;
  github: string;
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
