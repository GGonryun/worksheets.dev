import { Context, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

export const avg = newMethod({
  label: 'Average',
  description: 'Combines all inputs and returns the average',
  input: z.array(z.number()),
  output: z.number(),
  call: async function ({ input }: Context<number[]>): Promise<number> {
    return input.reduce((a, b) => a + b) / input.length;
  },
});
