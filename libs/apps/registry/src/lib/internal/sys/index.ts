import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
export const sys = newApp({
  appId: 'sys',
  context: z.null(),
  methods: {
    log: newMethod({
      appId: 'sys',
      methodId: 'log',
      input: z.any(),
      output: z.null(),
    }),
  },
});
