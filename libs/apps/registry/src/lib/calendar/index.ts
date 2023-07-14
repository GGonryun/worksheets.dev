import { z } from '@worksheets/zod';
import { newApp, newMethod } from '../../framework';

export const googleCalendar = newApp(
  {
    appId: 'googleCalendar',
    label: 'Google Calendar',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/Google_Calendar_icon.svg',
    description: '',
    context: z.object({
      accessToken: z.string(),
    }),
  },
  {
    listEvents: newMethod({
      label: 'List Events',
      description: 'Lists the next 10 events in your google calendar',
      input: z.object({
        calendarId: z.string().optional().default('primary'),
        maxResults: z.number().optional().default(10),
      }),
      output: z.null(),
    }),
  }
);
