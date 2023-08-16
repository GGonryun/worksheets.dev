import { newRegistry } from '@worksheets/apps-core';
import time from './internal/time';
import sys from './internal/sys';
import math from './internal/math';
import openai from './external/openai';
import http from './internal/http';
import json from './internal/json';
import gmail from './external/gmail';
import notion from './external/notion';
import slack from './external/slack';
import fullstory from './external/fullstory';
import segment from './external/segment';
import googleCalendar from './external/googleCalendar';
import pagerDuty from './external/pagerDuty';
import sendGrid from './external/sendGrid';
import tenor from './external/tenor';
import giphy from './external/giphy';
import sinch from './external/sinch';
import twilio from './external/twilio';
import jsonbin from './external/jsonbin';

export const registry = newRegistry({
  // external apps
  fullstory,
  gmail,
  googleCalendar,
  notion,
  openai,
  pagerDuty,
  segment,
  sendGrid,
  slack,
  tenor,
  giphy,
  sinch,
  twilio,
  jsonbin,
  // internal apps
  time,
  sys,
  math,
  http,
  json,
});
