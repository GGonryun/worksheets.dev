import { TypeOf, z } from 'zod';

export const dropboxFileSchema = z.object({
  tag: z.literal('file'),
  name: z.string(),
  path_lower: z.string(),
  id: z.string(),
  size: z.number(),
  is_downloadable: z.boolean(),
  content_hash: z.string(),
});

export const dropboxFolderSchema = z.object({
  tag: z.literal('folder'),
  name: z.string(),
  path_lower: z.string(),
  id: z.string(),
});

export type DropboxFile = TypeOf<typeof dropboxFileSchema>;
export type DropboxFolder = TypeOf<typeof dropboxFolderSchema>;
