import { z } from 'zod';

export type LogLevel = z.infer<typeof logLevelEntity>;
export const logLevelEntity = z.enum([
  'trace',
  'debug',
  'info',
  'warn',
  'error',
  'fatal',
  'silent',
]);
