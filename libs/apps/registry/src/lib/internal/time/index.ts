import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export const time = newApp({
  appId: 'time',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/time.svg',
  label: 'Time',
  description:
    'The time package supplies methods for manipulating dates and times.',
  context: z.null(),
  methods: {
    now: newMethod({
      appId: 'time',
      methodId: 'now',
      label: 'Now',
      description: 'Returns the current date and time',
      input: z
        .object({
          timeZone: z.enum(['PST', 'UTC', 'GMT', 'EST']).optional(),
        })
        .optional(),
      output: z.number().describe('the current time as a UTC timestamp'),
    }),
  },
});
