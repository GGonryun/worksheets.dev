import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

export const min = newMethod({
  path: 'math.min',
  label: 'Minimum',
  description: 'Returns the minimum value from a list of items',
  settings: null,
  input: z.array(z.number()),
  output: z.number(),
  async call(ctx) {
    return Math.min(...ctx.input);
  },
});
