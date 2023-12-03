import { GameIcon } from './game-icon';

export type Recommendations = {
  popular: GameIcon[];
  new: GameIcon[];
  categories: { id: string; name: string }[];
};

export type RecommendationsSchema = {
  popular: string[];
  new: string[];
  categories: string[];
};
