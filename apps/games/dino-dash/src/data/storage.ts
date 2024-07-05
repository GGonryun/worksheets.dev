import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

export const CHARACTER_SELECTION = {
  KEY: 'character-selection',
  DEFAULT: 0,
};
export const UNLOCKED_CHARACTERS = {
  KEY: 'unlocked-characters',
  DEFAULT: [0],
};
export const GAME_VOLUME = {
  KEY: 'game-volume',
  DEFAULT: 1,
};
export const COIN_PURSE = {
  KEY: 'coin-purse',
  DEFAULT: 0,
};
export const HIGH_SCORE = {
  KEY: 'high-score',
  DEFAULT: 0,
};
export const LIFETIME_COINS = {
  KEY: 'lifetime-coins',
  DEFAULT: 0,
};
export const LIFETIME_DAMAGE = {
  KEY: 'lifetime-damage',
  DEFAULT: 0,
};
export const LIFETIME_JUMPS = {
  KEY: 'lifetime-jumps',
  DEFAULT: 0,
};

export const getUnlockedCharacters = (server: CharityGamesPlugin) => {
  return server.storage.get(
    UNLOCKED_CHARACTERS.KEY,
    UNLOCKED_CHARACTERS.DEFAULT
  );
};

export const getCharacterSelection = (server: CharityGamesPlugin) => {
  return server.storage.get(
    CHARACTER_SELECTION.KEY,
    CHARACTER_SELECTION.DEFAULT
  );
};

export const getGameVolume = (server: CharityGamesPlugin) => {
  return server.storage.get(GAME_VOLUME.KEY, GAME_VOLUME.DEFAULT);
};

export const getPlayerCoins = (server: CharityGamesPlugin) => {
  return server.storage.get(COIN_PURSE.KEY, COIN_PURSE.DEFAULT);
};

export const getHighScore = (server: CharityGamesPlugin) => {
  return server.storage.get(HIGH_SCORE.KEY, HIGH_SCORE.DEFAULT);
};

export const getLifetimeCoins = (server: CharityGamesPlugin) => {
  return server.storage.get(LIFETIME_COINS.KEY, LIFETIME_COINS.DEFAULT);
};

export const getLifetimeDamage = (server: CharityGamesPlugin) => {
  return server.storage.get(LIFETIME_DAMAGE.KEY, LIFETIME_DAMAGE.DEFAULT);
};

export const getLifetimeJumps = (server: CharityGamesPlugin) => {
  return server.storage.get(LIFETIME_JUMPS.KEY, LIFETIME_JUMPS.DEFAULT);
};
