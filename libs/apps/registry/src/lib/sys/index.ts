import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
export const sys = newApp({
  appId: 'sys',
  label: 'System',
  context: z.null(),
  description: 'System methods',
  methods: {
    log: newMethod({
      appId: 'sys',
      methodId: 'log',
      label: 'Log',
      description: 'Logs information to the system console',
      input: z.any(),
      output: z.null(),
    }),
  },
});
