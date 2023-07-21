import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export const json = newApp({
  appId: 'json',
  label: 'JSON',
  description: 'JSON utilities',
  context: z.null(),
  methods: {
    parse: newMethod({
      appId: 'json',
      methodId: 'parse',
      label: 'JSON Parse',
      description: 'Convert JSON strings back into objects',
      input: z.string(),
      output: z.unknown(),
    }),
    query: newMethod({
      appId: 'json',
      methodId: 'query',
      label: 'JSON Query',
      description:
        'Query JavaScript objects with JSONPath expressions. Robust / safe JSONPath engine for Node.js — https://www.npmjs.com/package/jsonpath',
      input: z.object({ data: z.unknown(), query: z.string() }),
      output: z.unknown(),
    }),
    stringify: newMethod({
      appId: 'json',
      methodId: 'stringify',
      label: 'JSON Stringify',
      description: 'Turn anything into a JSON string',
      input: z.any(),
      output: z.string(),
    }),
  },
});
