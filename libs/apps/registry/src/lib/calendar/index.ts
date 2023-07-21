import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export const googleCalendar = newApp({
  appId: 'googleCalendar',
  label: 'Google Calendar',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/Google_Calendar_icon.svg',
  description: '',
  context: z.object({
    accessToken: z.string(),
  }),
  methods: {
    listEvents: newMethod({
      appId: 'googleCalendar',
      methodId: 'listEvents',
      label: 'List Events',
      description: 'Lists the next 10 events in your google calendar',
      input: z.object({
        calendarId: z.string().optional().default('primary'),
        maxResults: z.number().optional().default(10),
      }),
      output: z.null(),
    }),
  },
});
