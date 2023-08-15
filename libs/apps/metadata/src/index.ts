import { ApplicationMetadataMask } from './framework';
import { fullstory } from './lib/fullstory';
import { gmail } from './lib/gmail';
import { googleCalendar } from './lib/googleCalendar';
import { http } from './lib/http';
import { json } from './lib/json';
import { math } from './lib/math';
import { notion } from './lib/notion';
import { openai } from './lib/openai';
import { pagerDuty } from './lib/pagerDuty';
import { segment } from './lib/segment';
import { sendGrid } from './lib/sendGrid';
import { slack } from './lib/slack';
import { sys } from './lib/sys';
import { time } from './lib/time';
import { giphy } from './lib/giphy';
import { tenor } from './lib/tenor';
import { sinch } from './lib/sinch';

export * from './framework';

export const metadata: ApplicationMetadataMask = {
  // internal
  time,
  sys,
  math,
  http,
  json,
  // external
  slack,
  openai,
  gmail,
  fullstory,
  notion,
  sendGrid,
  googleCalendar,
  pagerDuty,
  segment,
  tenor,
  giphy,
  sinch,
};
