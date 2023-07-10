import { Command } from 'commander';
import Debug from 'debug';

export const configFileName =
  process.env['WORKSHEETS_CONFIG_FILE'] ?? '.cfg.yaml';

export const apiUrl =
  process.env['WORKSHEETS_API_URL'] ?? 'http://localhost:4200';

export const appUrl =
  process.env['WORKSHEETS_APP_URL'] ?? 'http://localhost:4200';

export const apiKey = process.env['WORKSHEETS_API_KEY'];

export const rootDebug = Debug('worksheets');
export const verboseDebug = Debug('v:worksheets');

export const printVerboseHook = (thisCommand: Command) => {
  const options = thisCommand.opts();

  Debug.enable('worksheets*');

  if (options['verbose']) {
    Debug.enable('(v|worksheets)*');
    rootDebug(`CLI arguments`);
    rootDebug(options);
  }
};
