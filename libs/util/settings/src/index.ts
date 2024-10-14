export * from './newsletter';
export * from './copyright';
export * from './version';

// game play
export const BONUS_GAMES_MULTIPLIER = 2;
// starting values
export const STARTING_TOKENS = 100;
export const STARTING_SMALL_CHESTS = 5;
export const STARTING_GIFT_BOXES = 5;
export const STARTING_SWORDS = 5;
export const STARTING_APPLES = 10;
// raffles
export const RAFFLE_ENTRY_FEE = 10;
// prizes
export const PRIZE_TOKEN_MODIFIER = 1000;
// alerts
export const EXPIRATION_TIME_THRESHOLD = 2; // send reminder days before expiration

export const MAX_FRIENDS = 20;
export const MAX_REFERRALS = 100;
export const MAX_BEST_FRIENDS = 5;

export const TOKENS_PER_REFERRAL_ACCOUNT = 500;

export const PLAY_MINUTE_DROP_CHANCE = 0.06;

export const GAME_TRACK_FREQUENCY_SECONDS = 90;

export const MAX_CONSUMPTION_RATE = 30;

export const MAX_ITEMS_PER_STRIKE = 15;

export const SESSION_EXPIRATION_DAYS = 1;
export const SESSION_AGE_MINUTES = 30;

export const DAMAGE_PER_ATTACK = 1;
export const STRIKES_PER_ATTACK = 1;

export const PRIZE_WALL_INTERVAL = 6; // TODO: load from vercel cron job json file.
export const MAX_DAILY_PRIZES = 6;
export const MAX_PRIZE_DISCOUNT = 0.5;
export const MIN_PRIZE_DISCOUNT = 0.1;
