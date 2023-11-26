import { MarkdownText } from '../lib/typography';
import { GameTags } from './tag-schema';

export type GameSchema = {
  id: string;
  name: string;
  // used by the home page and game page to display the game's size in the grid. a larger number should correspond to a more popular game.
  size: number;
  developerId: string;
  iconUrl: string;
  bannerSrc: string;
  qualifier: 'hot' | 'new' | 'played' | 'none';
  platforms: GameDevices[];
  tags: GameTags[];
  category: GameTags[];
  createdAt: Date;
  updatedAt: Date;
  description: MarkdownText;
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
