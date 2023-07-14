import { newApp } from '../../framework';
import { z } from '@worksheets/zod';
import { newMethod } from '../../framework';
export const sys = newApp(
  {
    appId: 'sys',
    label: 'System',
    context: z.null(),
    description: 'System methods',
  },
  {
    log: newMethod({
      label: 'Log',
      description: 'Logs information to the system console',
      input: z.any(),
      output: z.null(),
    }),
  }
);
