import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { newStorageClient, settings } from '../common';
import { z } from 'zod';

export const bucketUpload = newMethod({
  path: 'google.buckets.upload',
  label: 'Upload Google Cloud Storage Bucket File',
  description: '',
  settings,
  input: z.object({
    bucket: z.string().describe('bucket name'),
    file: z.string().describe('file type must match base 64 content type'),
    data: z
      .string()
      .describe('file content must be base64 string with file type header'),
  }),
  output: z.boolean(),
  async call({ settings, input: { data, bucket, file } }) {
    const storage = newStorageClient(settings);

    const contents = data.split(',')[1];
    const buffer = Buffer.from(contents, 'base64');
    try {
      await storage.bucket(bucket).file(file).save(buffer);

      console.info(`google cloud storage ${file} uploaded to ${bucket}`);
    } catch (error) {
      throw new MethodCallFailure({
        code: 500,
        message: 'unexpected google cloud storage failure',
        cause: error,
      });
    }
    return true;
  },
});
