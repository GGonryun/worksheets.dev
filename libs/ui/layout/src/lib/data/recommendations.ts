import { Recommendations, RecommendationsSchema } from '../types';
import { sampleCategories } from './categories';
import { sampleGames } from './games';

export const sampleRecommendations: Recommendations = {
  new: sampleGames,
  popular: sampleGames,
  recent: sampleGames,
  categories: sampleCategories,
};

export const recommendations: RecommendationsSchema = {
  popular: [
    'baku-gamu',
    'invention-timeline-game',
    'fragile-floor',
    'quickbeat',
    'solitaire-2048',
    'stick-jump',
    'air-hockey-neon',
    'solitaire',
    'freedom-run',
  ],
  new: [
    'blasteroids',
    'skwatta',
    '1d-chess',
    'feaare',
    'kuttuk',
    'conquer-the-world',
    'fragile-floor',
    'baku-gamu',
    'invention-timeline-game',
    'quickbeat',
    'dino-rush',
    'stick-jump',
    'freedom-run',
    'plane-fly',
    'solitaire-2048',
    'air-hockey-neon',
  ],
  categories: [
    'ad-free',
    'card',
    'board',
    'puzzle',
    'brain',
    'action',
    'word',
    'popular',
    'mobile',
  ],
};
