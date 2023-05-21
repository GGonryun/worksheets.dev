import { z } from 'zod';
import { newMethod } from '@worksheets/apps/framework';

export const noop = newMethod({
  label: 'No Op',
  description: 'Accepts any inputs and does nothing.',
  input: z.any(),
  output: null,
  async call() {
    // console.log('universal function call received', ctx);
  },
});
