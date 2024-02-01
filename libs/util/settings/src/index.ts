import {
  BasicGameDetails,
  RecommendationsSchema,
} from '@worksheets/util/types';

// game play
export const MAX_TOKENS_PER_GAME = 5;
export const MAX_TOKENS_FROM_GAME_PLAY_PER_DAY = 100;
export const BONUS_GAMES_MULTIPLIER = 2;
// daily rewards
export const BASE_DAILY_REWARD = 20;
// referrals
export const TOKENS_PER_REFERRAL_PLAY = 1;
export const MAX_TOKENS_FROM_REFERRAL_PLAYS = 100;
export const TOKENS_PER_REFERRAL_ACCOUNT = 100;
export const TOKENS_PER_REFERRAL_PURCHASE = 100;
export const GIFT_BOXES_PER_REFERRAL_ACCOUNT = 5;
// gift boxes
export const GIFT_BOX_DROP_RATE = 2.5;
export const MAX_TOKENS_IN_GIFT_BOX = 20;
export const MAX_DAILY_GIFT_BOX_SHARES = 5;
// starting values
export const STARTING_TOKENS = 100;
export const STARTING_GIFT_BOXES = 5;
// raffles
export const BULK_ENTRY_DISCOUNT = 0.8;

export const dailyBonusGames: BasicGameDetails[] = [
  {
    id: 'baku-gamu',
    name: 'Baku Gamu',
  },
  {
    id: 'fragile-floor',
    name: 'Fragile Floor',
  },
  {
    id: 'blasteroids',
    name: 'Blasteroids',
  },
  {
    id: 'freedom-run',
    name: 'Freedom Run',
  },
  {
    id: 'invention-timeline-game',
    name: 'Time Travel',
  },
];

// TODO: this should be fetched from a database.
export const recommendations: RecommendationsSchema = {
  featured: [
    'baku-gamu',
    'blasteroids',
    'stick-jump',
    'solitaire',
    'air-hockey-neon',
    'quickbeat',
    'solitaire-2048',
    'puzzle-words',
  ],
  popular: [
    'baku-gamu',
    'invention-timeline-game',
    'fragile-floor',
    'quickbeat',
    'solitaire-2048',
    'stick-jump',
    'air-hockey-neon',
    'kuttuk',
    'solitaire',
    '1d-chess',
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
