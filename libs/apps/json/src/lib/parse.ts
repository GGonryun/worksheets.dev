import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

export const parse = newMethod({
  id: 'parse',
  label: 'JSON Parse',
  description: 'Convert JSON strings back into objects',
  settings: null,
  input: z.string(),
  output: z.unknown(),
  async call(ctx) {
    return JSON.parse(ctx.input);
  },
});
