import { newMethod } from '@worksheets/apps/framework';
import { newCalendarClient, settings } from './common';
import { z } from 'zod';

export const listEvents = newMethod({
  id: 'list_events',
  label: 'List Events',
  description: 'Lists the next 10 events in your google calendar',
  settings,
  input: z.object({
    calendarId: z.string().optional().default('primary'),
    maxResults: z.number().optional().default(10),
  }),
  output: null,
  async call({ settings, input }) {
    const { calendarId, maxResults } = input;
    const { accessToken } = settings.tokens;

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
      console.info('No upcoming events found.');
      return;
    }

    console.info('Upcoming 10 events:');

    events.map((event, i) => {
      const start = event?.start?.dateTime || event?.start?.date;
      console.info(`${i}\t ${start} - ${event.summary}`);
    });
  },
});
