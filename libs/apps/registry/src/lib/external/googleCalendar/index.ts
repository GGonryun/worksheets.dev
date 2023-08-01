import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import { calendarEventSchema } from './schemas';

export const googleCalendar = newApp({
  appId: 'googleCalendar',
  context: z.object({
    accessToken: z.string(),
  }),
  methods: {
    listEvents: newMethod({
      appId: 'googleCalendar',
      methodId: 'listEvents',
      input: z.object({
        calendarId: z
          .string()
          .optional()
          .default('primary')
          .describe(
            `Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.`
          ),
        maxResults: z.number().optional().default(10),
      }),
      output: z.object({
        kind: z.literal('calendar#events'),
        summary: z.string().nullable().optional(),
        updated: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
        timeZone: z.string().nullable().optional(),
        accessRole: z.string().nullable().optional(),
        nextPageToken: z.string().nullable().optional(),
        nextSyncToken: z.string().nullable().optional(),
        items: z.array(calendarEventSchema).nullable().optional(),
      }),
    }),
  },
});
