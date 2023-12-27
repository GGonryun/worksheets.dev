import { GamePlayerSchema } from './game-player-schema';
import { GameQualifier } from './game-qualifier';
import { GameTag } from './tag-schema';

export type GameSchema = {
  id: string;
  name: string;
  // used by the home page and game page to display the game's size in the grid. a larger number should correspond to a more popular game.
  size: number;
  developerId: string;
  iconUrl: string;
  bannerUrl: string;
  qualifier: GameQualifier;
  platforms: GameDevices[];
  orientations: DeviceOrientation[];
  tags: GameTag[];
  category: GameTag[];
  createdAt: Date;
  updatedAt: Date;
  description: string;
  markets: Partial<MarketLinks>;
  file: {
    type: 'redirect' | 'iframe';
    url: string;
  };
};

type GameDevices = 'desktop' | 'mobile';

type DeviceOrientation = 'landscape' | 'portrait';

type MarketLinks = {
  android: string;
  ios: string;
  itch: string;
  steam: string;
};

export type SerializableGameSchema = Omit<
  GameSchema,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string;
  updatedAt: string;
};

export type GameAnalyticsSchema = {
  votes: { up: string; down: string };
  score: string;
  plays: string;
  favorites: string;
  topPlayers: GamePlayerSchema[];
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
  mobile?: boolean;
  height?: string;
  width?: string;
};
