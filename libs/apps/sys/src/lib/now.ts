import { z } from 'zod';
import { newMethod } from '@worksheets/apps/framework';

export const now = newMethod({
  path: 'time.now',
  label: 'Current System Time',
  input: null,
  output: z.number(),
  async call() {
    return new Date().getTime();
  },
});
