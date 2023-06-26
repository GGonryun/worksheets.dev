import { newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';

export const stringify = newMethod({
  id: 'stringify',
  label: 'JSON Stringify',
  description: 'Turn anything into a JSON string',
  settings: null,
  input: z.any(),
  output: z.string(),
  async call(ctx) {
    return JSON.stringify(ctx.input);
  },
});
