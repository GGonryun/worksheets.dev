import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

export const length = newMethod({
  path: 'length',
  label: 'Length',
  description:
    "Returns the length of an iterable element or throws 0 if the element isn't iterable",
  settings: null,
  input: z.unknown(),
  output: z.number(),
  async call({ input }) {
    if (input == null) return 0;

    if (typeof input === 'string') {
      return input.length;
    }
    if (typeof input === 'object') {
      if (Array.isArray(input)) {
        return input.length;
      }
      return Object.keys(input).length;
    }
    return 0;
  },
});
