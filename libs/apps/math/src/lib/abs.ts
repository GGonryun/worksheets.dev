import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

export const abs = newMethod({
  id: 'abs',
  label: 'Absolute Value',
  description: 'Removes the "-" sign from a value',
  settings: null,
  input: z.number(),
  output: z.number(),
  async call({ input }) {
    const number = Math.abs(input);
    return number;
  },
});
