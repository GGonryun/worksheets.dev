import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export default newApp({
  appId: 'time',
  context: z.null(),
  methods: {
    now: newMethod({
      appId: 'time',
      methodId: 'now',
      input: z
        .object({
          timeZone: z.enum(['PST', 'UTC', 'GMT', 'EST']).optional(),
        })
        .optional(),
      output: z.number().describe('the current time as a UTC timestamp'),
    }),
  },
});
