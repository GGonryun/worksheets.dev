import { Recommendations } from '@worksheets/util/types';

import { sampleCategories } from './categories';
import { sampleGames } from './games';

export const sampleRecommendations: Recommendations = {
  new: sampleGames,
  popular: sampleGames,
  recent: sampleGames,
  categories: sampleCategories,
};
