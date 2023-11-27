import { GameIconProps } from '../lib/games/game-icon';

export type Recommendations = {
  popular: GameIconProps[];
  new: GameIconProps[];
  categories: { id: string; name: string }[];
};

export type RecommendationsSchema = {
  popular: string[];
  new: string[];
  categories: string[];
};
