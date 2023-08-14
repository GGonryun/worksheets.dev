import { z } from '@worksheets/zod';

export const gifObjectSchema = z.object({
  id: z.string().describe('The unique ID for this GIF'),
  title: z.string().describe('The title for this GIF'),
  description: z.string().describe('The description for this GIF'),
  url: z.string().describe('The URL for this GIF'),
  hasAudio: z.boolean().describe('Whether or not this GIF has a caption'),
  itemUrl: z.string().describe('The unique URL for this GIF'),
  mediaFormats: z
    .array(z.unknown())
    .describe("An array of media objects for this GIF's different formats"),
  tags: z.array(z.string()).describe('An array of tags for this GIF'),
});
