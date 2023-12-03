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

type MarketLinks = {
  android: string;
  ios: string;
  itch: string;
  steam: string;
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
