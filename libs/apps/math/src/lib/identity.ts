import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

export const identity = newMethod({
  path: 'math.identity',
  label: 'Identity',
  description:
    "This function always returns the value that was passed in as it's argument",
  settings: null,
  input: z.number(),
  output: z.number(),
  async call(ctx) {
    return ctx.input;
  },
});
