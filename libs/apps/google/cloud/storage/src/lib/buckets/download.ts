import { newMethod } from '@worksheets/apps/framework';
import {
  handleGoogleCloudStorageFailure,
  newStorageClient,
  settings,
} from '../common';
import { z } from 'zod';

export const bucketDownload = newMethod({
  path: 'google.buckets.download',
  label: 'Download File from Google Cloud Bucket',
  description: '',
  settings,
  input: z.object({
    bucket: z.string().describe('bucket name'),
    file: z.string().describe('file type must match base 64 content type'),
  }),
  output: z.string().describe('base 64 encoded file'),
  async call({ settings, input: { bucket, file } }) {
    const storage = newStorageClient(settings);

    try {
      const contents = await storage.bucket(bucket).file(file).download();
      const size = Buffer.byteLength(contents[0]);
      console.info(
        `Contents of gs://${bucket}/${file} are downloaded: ${size}`
      );

      return contents[0].toString('base64');
    } catch (error) {
      throw handleGoogleCloudStorageFailure(error);
    }
  },
});
