import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export default newApp({
  appId: 'json',
  context: z.null(),
  methods: {
    parse: newMethod({
      appId: 'json',
      methodId: 'parse',
      input: z.string(),
      output: z.unknown(),
    }),
    query: newMethod({
      appId: 'json',
      methodId: 'query',
      input: z.object({ data: z.unknown(), query: z.string() }),
      output: z.unknown(),
    }),
    stringify: newMethod({
      appId: 'json',
      methodId: 'stringify',
      input: z.any(),
      output: z.string(),
    }),
  },
});
