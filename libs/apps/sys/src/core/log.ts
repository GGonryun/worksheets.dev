import { z } from 'zod';
import { newMethod } from '@worksheets/apps/framework';

export const log = newMethod({
  id: 'log',
  label: 'System Console Logger',
  description: 'Logs information to the system console',

  settings: null,

  input: z.object({
    data: z.any(),
    level: z
      .union([z.literal('warn'), z.literal('log'), z.literal('error')])
      .optional(),
  }),

  output: null,

  async call(ctx) {
    const { data, level } = ctx.input;
    let fn;
    switch (level) {
      case 'warn':
        fn = console.warn;
        break;
      case 'error':
        fn = console.error;
        break;
      default:
        fn = console.debug;
    }
    fn(data);
  },
});
