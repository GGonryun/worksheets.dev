import { BasicCategoryInfo } from './basic-category-info';
import { BasicGameInfo } from './basic-game-info';

export type Recommendations = {
  popular: BasicGameInfo[];
  new: BasicGameInfo[];
  recent: BasicGameInfo[];
  categories: BasicCategoryInfo[];
};

export type RecommendationsSchema = {
  featured: string[];
  popular: string[];
  new: string[];
  categories: string[];
};

export type SearchResultsData = {
  games: BasicGameInfo[];
  categories: BasicCategoryInfo[];
};
