import { z } from '@worksheets/zod';
import { newApp, newMethod } from '../../framework';

export const json = newApp(
  {
    appId: 'json',
    label: 'JSON',
    description: 'JSON utilities',
    context: z.null(),
  },
  {
    parse: newMethod({
      label: 'JSON Parse',
      description: 'Convert JSON strings back into objects',
      input: z.string(),
      output: z.unknown(),
    }),
    query: newMethod({
      label: 'JSON Query',
      description:
        'Query JavaScript objects with JSONPath expressions. Robust / safe JSONPath engine for Node.js — https://www.npmjs.com/package/jsonpath',
      input: z.object({ data: z.unknown(), query: z.string() }),
      output: z.unknown(),
    }),
    stringify: newMethod({
      label: 'JSON Stringify',
      description: 'Turn anything into a JSON string',
      input: z.any(),
      output: z.string(),
    }),
  }
);
