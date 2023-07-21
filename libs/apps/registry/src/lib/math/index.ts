import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export const math = newApp({
  appId: 'math',
  logo: '',
  label: 'Math',
  description: 'Methods for performing mathematical operations',
  context: z.null(),
  methods: {
    calc: newMethod({
      appId: 'math',
      methodId: 'calc',
      label: 'Calculate',
      description: 'Executes an operation (+, -, *, /, ^) between X and Y',
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
      label: 'Identity',
      description:
        "This function always returns the value that was passed in as it's argument",
      input: z.number(),
      output: z.number(),
    }),
    min: newMethod({
      appId: 'math',
      methodId: 'min',
      label: 'Minimum',
      description: 'Returns the minimum value from a list of items',
      input: z.array(z.number()),
      output: z.number(),
    }),
    max: newMethod({
      appId: 'math',
      methodId: 'max',
      label: 'Maximum',
      description: 'Returns the maximum value from a list of items',
      input: z.array(z.number()),
      output: z.number(),
    }),
    abs: newMethod({
      appId: 'math',
      methodId: 'abs',
      label: 'Absolute',
      description: 'Returns the absolute value of a number',
      input: z.number(),
      output: z.number(),
    }),
    avg: newMethod({
      appId: 'math',
      methodId: 'avg',
      label: 'Average',
      description: 'Combines all inputs and returns the average',
      input: z.array(z.number()),
      output: z.number(),
    }),
  },
});
