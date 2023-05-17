import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

export const min = newMethod({
  label: 'Minimum',
  description: 'Returns the minimum value from a list of items',
  input: z.array(z.number()),
  output: z.number(),
  async call(ctx) {
    return Math.min(...ctx.input);
  },
});
