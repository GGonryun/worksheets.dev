import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export default newApp({
  appId: 'math',
  context: z.null(),
  methods: {
    calc: newMethod({
      appId: 'math',
      methodId: 'calc',
      input: z.object({
        op: z.union([
          z.literal('+'),
          z.literal('-'),
          z.literal('*'),
          z.literal('/'),
          z.literal('^'),
        ]),
        x: z.number(),
        y: z.number(),
      }),
      output: z.number(),
    }),
    identity: newMethod({
      appId: 'math',
      methodId: 'identity',
      input: z.number(),
      output: z.number(),
    }),
    min: newMethod({
      appId: 'math',
      methodId: 'min',
      input: z.array(z.number()),
      output: z.number(),
    }),
    max: newMethod({
      appId: 'math',
      methodId: 'max',
      input: z.array(z.number()),
      output: z.number(),
    }),
    abs: newMethod({
      appId: 'math',
      methodId: 'abs',
      input: z.number(),
      output: z.number(),
    }),
    avg: newMethod({
      appId: 'math',
      methodId: 'avg',
      input: z.array(z.number()),
      output: z.number(),
    }),
  },
});
