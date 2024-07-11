import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { ThemeKey } from './settings';

export const THEME_KEY = 'theme';
export const MUTE_KEY = 'muted';
export const BEST_KEY = 'best';
export const BLOCKS_KEY = 'blocks';
export const LINES_KEY = 'lines';
export const GAMES_KEY = 'games';
export const SCORE_KEY = 'score';

export const getThemeSetting: (server: CharityGamesPlugin) => ThemeKey = (
  server
) => {
  return server.storage.get(THEME_KEY, 'light');
};

export const saveThemeSetting: (
  server: CharityGamesPlugin,
  theme: string
) => void = (server, theme) => {
  server.storage.set(THEME_KEY, theme);
  server.storage.save();
};

export const getSoundSetting: (server: CharityGamesPlugin) => boolean = (
  server
) => {
  return server.storage.get(MUTE_KEY, false);
};

export const saveSoundSetting: (
  server: CharityGamesPlugin,
  sound: boolean
) => void = (server, sound) => {
  server.storage.set(MUTE_KEY, sound);
  server.storage.save();
};
