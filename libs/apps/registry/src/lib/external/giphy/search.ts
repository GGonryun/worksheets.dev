import { newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import {
  gifObjectSchema,
  paginationSchema,
  metaSchema,
  contentRating,
} from './schemas';

const searchRequestSchema = z.object({
  query: z.string().describe('Search query term or phrase'),
  limit: z
    .number()
    .default(25)
    .optional()
    .describe('The maximum number of objects to return. (Default: 25)'),
  offset: z
    .number()
    .max(4999)
    .default(0)
    .optional()
    .describe('An optional results offset. Defaults to 0.'),
  lang: z
    .string()
    .default('en')
    .optional()
    .describe(
      'Specify default country for regional content; format is 2-letter ISO 639-1 country code.'
    ),
  randomId: z
    .string()
    .optional()
    .describe(
      'An ID or proxy for a specific user, for static consistent randomness.'
    ),
  rating: contentRating,
});

const searchResponseSchema = z.object({
  data: z.array(gifObjectSchema),
  pagination: paginationSchema,
  meta: metaSchema,
});

export default newMethod({
  appId: 'giphy',
  methodId: 'search',
  input: searchRequestSchema,
  output: searchResponseSchema,
});
