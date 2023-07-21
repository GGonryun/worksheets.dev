import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export const time = newApp({
  appId: 'time',
  logo: '',
  label: 'Time',
  description: 'Methods for working with dates and times',
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
