import { BasicGameDetails } from '@worksheets/util/types';

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
// prizes
export const PRIZE_TOKEN_MODIFIER = 1000;
// alerts
export const CLAIM_ALERT_LAST_SENT_THRESHOLD = 3 * 24; // 3 days
export const CLAIM_ALERT_SENT_COUNT_THRESHOLD = 6;

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

export const FEATURED_GAMES = [
  'fruit-merge',
  'baku-gamu',
  'blasteroids',
  'solitaire',
  'quickbeat',
  'solitaire-2048',
  'puzzle-words',
  'mini-golf',
];
