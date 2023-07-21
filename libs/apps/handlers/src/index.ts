import { ExecutorActions } from './lib/framework';

import { sys } from './lib/sys';
import { time } from './lib/time';
import { math } from './lib/math';
import { openai } from './lib/openai';

export const handlers: ExecutorActions = {
  time,
  sys,
  math,
  openai,
};
