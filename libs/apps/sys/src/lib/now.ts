import { z } from 'zod';
import { newMethod } from '@worksheets/apps/framework';

export const now = newMethod({
  path: 'sys.now',
  label: 'Current System Time',
  description: null,
  settings: null,
  input: null,
  output: z.number(),
  async call() {
    return new Date().getTime();
  },
});
