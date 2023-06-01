import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

export const avg = newMethod({
  path: 'math.avg',
  label: 'Average',
  description: 'Combines all inputs and returns the average',
  settings: null,
  input: z.array(z.number()),
  output: z.number(),
  call: async function ({ input }): Promise<number> {
    return input.reduce((a, b) => a + b) / input.length;
  },
});
