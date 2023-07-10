import { Command } from 'commander';
import { printVerboseHook, rootDebug } from '../utils.js';

const key = 'init';
const debug = rootDebug.extend(key);
const debugError = rootDebug.extend(`${key}:error`);

export const init = () => {
  const command = new Command(key);
  command
    .option('--verbose', 'output verbose debug logs', false)
    .hook('preAction', printVerboseHook)
    .action(async () => {
      debug('Starting init process');

      const apiKey = process.env['WORKSHEETS_API_KEY'];
      const folder = process.env['WORKSHEETS_FOLDER'];
      const url = process.env['WORKSHEETS_API_URL'];
      if (!apiKey) {
        debugError(
          'You must have the environment variable WORKSHEET_API_KEY set to use this tool'
        );
        process.exit(1);
      }

      if (!folder) {
        debug('No WORKSHEETS_FOLDER environment variable set, using default');
      }

      if (!url) {
        debug('No WORKSHEETS_API_URL environment variable set, using default');
      }

      debug('Valid configuration was found');
    });
  return command;
};
