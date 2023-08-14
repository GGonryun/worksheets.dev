import { newApp } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import search from './search';

export default newApp({
  appId: 'tenor',
  context: z.object({
    key: z.string(),
    clientKey: z
      .string()
      .optional()
      .describe(
        "Strongly Recommended. A client key can be used to track your app's API usage. If you do not have a client key, you can leave this field blank."
      ),
  }),
  methods: {
    search,
  },
});
