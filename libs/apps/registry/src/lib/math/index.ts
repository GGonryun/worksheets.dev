import { z } from '@worksheets/zod';
import { newApp, newMethod } from '../../framework';

export const math = newApp(
  {
    appId: 'math',
    logo: '',
    label: 'Math',
    description: 'Methods for performing mathematical operations',
    context: z.null(),
  },
  {
    calc: newMethod({
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
      label: 'Identity',
      description:
        "This function always returns the value that was passed in as it's argument",
      input: z.number(),
      output: z.number(),
    }),
    min: newMethod({
      label: 'Minimum',
      description: 'Returns the minimum value from a list of items',
      input: z.array(z.number()),
      output: z.number(),
    }),
    max: newMethod({
      label: 'Maximum',
      description: 'Returns the maximum value from a list of items',
      input: z.array(z.number()),
      output: z.number(),
    }),
    abs: newMethod({
      label: 'Absolute',
      description: 'Returns the absolute value of a number',
      input: z.number(),
      output: z.number(),
    }),
    avg: newMethod({
      label: 'Average',
      description: 'Combines all inputs and returns the average',
      input: z.array(z.number()),
      output: z.number(),
    }),
  }
);
