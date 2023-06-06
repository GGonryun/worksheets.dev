import { newMethod } from '@worksheets/apps/framework';
import {
  handleGoogleCloudStorageFailure,
  newStorageClient,
  settings,
} from '../common';
import { z } from 'zod';

const bucketsSchema = z.object({
  id: z.string(),
  location: z.string(),
  name: z.string(),
  link: z.string(),
});

const filesSchema = z.object({
  id: z.string(),
  name: z.string(),
  content_type: z.string(),
  updated: z.string(),
  size: z.string(),
  bucket: z.string(),
  self_link: z.string().describe('a link to the self'),
  media_link: z.string().describe('a link to the downloadable data'),
});

export const getBuckets = newMethod({
  path: 'google.buckets.read',
  label: 'Read Google Cloud Storage Buckets',
  description: '',
  settings,
  input: z.string().optional().describe('bucket id'),
  output: z.union([z.array(bucketsSchema), z.array(filesSchema)]),
  async call({ settings, input }) {
    const storage = newStorageClient(settings);
    try {
      if (input) {
        const [files] = await storage.bucket(input).getFiles();
        return files.map(({ metadata }) => ({
          id: metadata.id,
          name: metadata.name,
          content_type: metadata.contentType,
          updated: metadata.updated,
          size: metadata.size,
          bucket: metadata.bucket,
          self_link: metadata.selfLink,
          media_link: metadata.mediaLink,
        }));
      } else {
        const [buckets] = await storage.getBuckets();
        return buckets.map(({ metadata }) => ({
          id: metadata.id,
          location: metadata.location,
          name: metadata.name,
          link: metadata.selfLink,
        }));
      }
    } catch (error) {
      throw handleGoogleCloudStorageFailure(error);
    }
  },
});
