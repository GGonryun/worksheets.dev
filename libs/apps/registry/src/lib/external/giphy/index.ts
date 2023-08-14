import { newApp } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import search from './search';

export default newApp({
  appId: 'giphy',
  context: z.object({
    apiKey: z.string(),
  }),
  methods: {
    search,
  },
});
