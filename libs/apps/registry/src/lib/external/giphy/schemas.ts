import { z } from '@worksheets/zod';

export const imageSchema = z
  .unknown()
  .describe('Various available formats and sizes of this gif');

export const userSchema = z
  .unknown()
  .describe("Details of this gif's uploader");

export const contentRating = z
  .enum(['G', 'PG', 'PG-13', 'R'])
  .default('G')
  .optional()
  .describe('Filter results by rating. (Default: G).');

export const gifObjectSchema = z.object({
  type: z.literal('gif').describe('Type of object returned'),
  id: z.string().describe('Unique gif id'),
  url: z.string().describe('URL of this gif'),
  slug: z.string().describe("Slug used in this gif's URL"),
  bitlyUrl: z.string().describe('Short URL for this gif'),
  embedUrl: z.string().describe('URL used for embedding this gif'),
  username: z.string().describe("Username of this gif's uploader"),
  source: z.string().describe('URL of the webpage where this gif was found'),
  rating: contentRating,
  user: userSchema,
  sourceTld: z.string().describe('Top level domain of the source URL'),
  sourcePostUrl: z
    .string()
    .describe('URL of the webpage where this gif was found'),
  title: z.string().describe('Title of this gif'),
});

export const paginationSchema = z.object({
  offset: z.number().describe('Position in pagination.'),
  totalCount: z.number().describe('Total number of items available.'),
  count: z.number().describe('Total number of items returned.'),
});

export const metaSchema = z.object({
  msg: z
    .string()
    .describe('A string indicating success or failure of the request'),
  status: z.number().describe('HTTP Response status code'),
  responseId: z.string().describe('Unique id for this response'),
});
