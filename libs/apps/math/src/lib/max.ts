import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

export const max = newMethod({
  id: 'max',
  label: 'Maximum',
  description: 'Returns the maximum value from a list of items',
  settings: null,
  input: z.array(z.number()),
  output: z.number(),
  async call(ctx) {
    return Math.max(...ctx.input);
  },
});
