import {
  ConnectionContextTranslationFunctions,
  ConnectionForms,
  ConnectionValidationFunctions,
} from './lib/framework';

import fullstory from './lib/fullstory';

import gmail from './lib/gmail';
import googleCalendar from './lib/googleCalendar';
import notion from './lib/notion';
import openai from './lib/openai';
import pagerDuty from './lib/pagerDuty';
import segment from './lib/segment';
import sendGrid from './lib/sendGrid';
import slack from './lib/slack';

export const connections: ConnectionForms = {
  time: undefined,
  sys: undefined,
  math: undefined,
  http: undefined,
  json: undefined,
  /* OAuth Apps */
  gmail: gmail.form,
  googleCalendar: googleCalendar.form,
  /* API Key Apps */
  fullstory: fullstory.form,
  notion: notion.form,
  openai: openai.form,
  pagerDuty: pagerDuty.form,
  segment: segment.form,
  sendGrid: sendGrid.form,
  slack: slack.form,
};

export const connectionValidationFunctions: ConnectionValidationFunctions = {
  time: undefined,
  sys: undefined,
  math: undefined,
  http: undefined,
  json: undefined,
  fullstory: fullstory.validator,
  gmail: gmail.validator,
  googleCalendar: googleCalendar.validator,
  notion: notion.validator,
  openai: openai.validator,
  pagerDuty: pagerDuty.validator,
  segment: segment.validator,
  sendGrid: sendGrid.validator,
  slack: slack.validator,
};

export const connectionTranslationFunctions: ConnectionContextTranslationFunctions =
  {
    time: undefined,
    sys: undefined,
    math: undefined,
    http: undefined,
    json: undefined,
    fullstory: fullstory.translator,
    gmail: gmail.translator,
    googleCalendar: googleCalendar.translator,
    notion: notion.translator,
    openai: openai.translator,
    pagerDuty: pagerDuty.translator,
    segment: segment.translator,
    sendGrid: sendGrid.translator,
    slack: slack.translator,
  };

export * from './lib/framework';
