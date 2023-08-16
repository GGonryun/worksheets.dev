//https://jsonbin.io/api-reference/collections/bins/uncategorized

import { newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export default newMethod({
  appId: 'jsonbin',
  methodId: 'listBins',
  input: z.object({
    collectionId: z
      .string()
      .optional()
      .describe(
        'If omitted, the API will return only uncategorized records. If you wish to filter the records by a specific Collection, you can pass the Collection Id here.'
      ),
    sortOrder: z.enum(['ascending', 'descending']).optional(),
  }),
  output: z.object({
    bins: z.array(
      z.object({
        snippetMeta: z.unknown(),
        binId: z.string().describe('The id of the bin.'),
        createdAt: z.string().describe('The date the bin was created.'),
        private: z.boolean().describe('Whether the bin is private or not.'),
      })
    ),
  }),
});
