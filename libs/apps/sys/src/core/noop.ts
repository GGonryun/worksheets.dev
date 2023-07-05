import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

export const noop = newMethod({
  id: 'no_op',
  label: 'No Op',
  description: 'Accepts any inputs and does nothing.',
  input: z.any(),
  settings: null,
  output: null,
  async call() {
    // no operation
  },
});
