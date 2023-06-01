import { newMethod } from '@worksheets/apps/framework';

export const noop = newMethod({
  path: 'sys.no-op',
  label: 'No Op',
  description: 'Accepts any inputs and does nothing.',
  input: null,
  settings: null,
  output: null,
  async call() {
    // no operation
  },
});
