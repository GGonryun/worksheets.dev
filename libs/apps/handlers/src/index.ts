import { ApplicationHandlers } from '@worksheets/apps-registry';
import { openai } from './lib/openai';
import { sys } from './lib/sys';
import { time } from './lib/time';
import { math } from './lib/math';

export const handlers: ApplicationHandlers = {
  openai,
  time,
  sys,
  math,
};
