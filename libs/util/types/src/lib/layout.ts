import { BasicCategoryInfo, BasicGameInfo } from './arcade';

export type Recommendations = {
  popular: BasicGameInfo[];
  new: BasicGameInfo[];
  recent: BasicGameInfo[];
  categories: BasicCategoryInfo[];
};

export type SearchResultsData = {
  games: BasicGameInfo[];
  categories: BasicCategoryInfo[];
};
