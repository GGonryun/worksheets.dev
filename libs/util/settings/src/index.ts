export * from './copyright';
export * from './version';

// raffles
export const RAFFLE_ENTRY_FEE = 10;
// alerts
export const BASE_EXPIRATION_TIME = 5; // days
export const EXPIRATION_TIME_THRESHOLD = 2; // send reminder days before expiration

export const GAME_TRACK_FREQUENCY_SECONDS = 60;
export const CHEAT_DETECTION_THRESHOLD = 1.05;

export const MAX_CONSUMPTION_RATE = 30;

export const MAX_ITEMS_PER_STRIKE = 15;

export const SESSION_EXPIRATION_DAYS = 1;
export const SESSION_AGE_MINUTES = 30;

export const DAMAGE_PER_ATTACK = 1;
export const STRIKES_PER_ATTACK = 1;

export const MAX_BASIC_IMAGE_SIZE = 1.5 * 1000 * 1000; // 1.5MB
export const VALID_BASIC_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
export const MAX_GAME_FILE_SIZE = 100 * 1000 * 1000; // 100MB

export const MAX_TEAM_MEMBERS = 10;
export const MAX_TEAM_GAMES = 10;
export const MAX_TEAM_MEMBERSHIP = 5;
