import { BasicCategoryInfo } from './category-info';
import { BasicGameInfo } from './game-info';

export type Recommendations = {
  popular: BasicGameInfo[];
  new: BasicGameInfo[];
  recent: BasicGameInfo[];
  categories: BasicCategoryInfo[];
};

export type RecommendationsSchema = {
  popular: string[];
  new: string[];
  categories: string[];
};
