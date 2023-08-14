import { newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import { gifObjectSchema } from './schemas';

const searchResponseSchema = z.object({
  next: z.string().optional(),
  results: z.array(gifObjectSchema),
});

const searchRequestSchema = z.object({
  query: z.string(),
  limit: z.number().max(50).default(20).optional(),
  position: z
    .string()
    .optional()
    .describe(
      "The position in the result set from which to start returning results. Uses the output of the previous search call's next field"
    ),
});

export default newMethod({
  appId: 'tenor',
  methodId: 'search',
  input: searchRequestSchema,
  output: searchResponseSchema,
});
