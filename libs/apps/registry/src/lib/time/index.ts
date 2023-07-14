import { z } from '@worksheets/zod';
import { newApp, newMethod } from '../../framework';

export const time = newApp(
  {
    appId: 'time',
    logo: '',
    label: 'Time',
    description: 'Methods for working with dates and times',
    context: z.null(),
  },
  {
    now: newMethod({
      label: 'Now',
      description: 'Returns the current date and time',
      input: z
        .object({
          timeZone: z.enum(['PST', 'UTC', 'GMT', 'EST']).optional(),
        })
        .optional(),
      output: z.number().describe('the current time as a UTC timestamp'),
    }),
  }
);
