import { z } from 'zod';
import { newMethod } from '@worksheets/apps/framework';

export const now = newMethod({
  label: 'Current System Time',
  input: null,
  output: z.number(),
  async call() {
    return new Date().getTime();
  },
});
