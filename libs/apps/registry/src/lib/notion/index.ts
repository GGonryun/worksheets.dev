import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export const notion = newApp({
  appId: 'notion',
  logo: '',
  label: 'Notion',
  description:
    "Developers can use Notion's public API to interact with Notion workspaces programmatically.",
  context: z.object({
    internal: z.object({
      token: z.string(),
    }),
  }),
  methods: {
    addItem: newMethod({
      appId: 'notion',
      methodId: 'addDatabaseItem',
      label: 'Add Item to Database',
      description: 'Add an item to a notion database',
      input: z.object({
        data: z.any(),
      }),
      output: z.string(),
    }),
  },
});
