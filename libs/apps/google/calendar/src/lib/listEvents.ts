import { newMethod } from '@worksheets/apps/framework';
import { newCalendarClient, newOAuth } from './common';
import { z } from 'zod';
const auth = newOAuth(
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
);

export const listEvents = newMethod({
  path: 'google.calendar.list_events',
  label: 'List Events',
  description: 'Lists the next 10 events in your google calendar',
  settings: { auth },
  input: z.object({
    calendarId: z.string().optional().default('primary'),
    maxResults: z.number().optional().default(10),
  }),
  output: null,
  async call({ settings, input }) {
    const { calendarId, maxResults } = input;
    const { accessToken } = settings.auth;

    const calendar = newCalendarClient(accessToken);

    const res = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = res.data.items;
    if (!events || events.length === 0) {
      console.log('No upcoming events found.');
      return;
    }

    console.log('Upcoming 10 events:');

    events.map((event, i) => {
      const start = event?.start?.dateTime || event?.start?.date;
      console.log(`${i}\t ${start} - ${event.summary}`);
    });
  },
});
