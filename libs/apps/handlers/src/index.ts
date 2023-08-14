import { ExecutorActions } from './lib/framework';

import { sys } from './lib/sys';
import { time } from './lib/time';
import { math } from './lib/math';
import { openai } from './lib/openai';
import { json } from './lib/json';
import { http } from './lib/http';
import { gmail } from './lib/gmail';
import { notion } from './lib/notion';
import { slack } from './lib/slack';
import { fullstory } from './lib/fullstory';
import { googleCalendar } from './lib/googleCalendar';
import { pagerDuty } from './lib/pagerDuty';
import { segment } from './lib/segment';
import { sendGrid } from './lib/sendGrid';
import { tenor } from './lib/tenor';
import { giphy } from './lib/giphy';

export const handlers: ExecutorActions = {
  time,
  sys,
  math,
  openai,
  http,
  json,
  gmail,
  notion,
  slack,
  fullstory,
  googleCalendar,
  pagerDuty,
  segment,
  sendGrid,
  tenor,
  giphy,
};
