import { GCP_BUCKET_ID } from '@worksheets/services/environment';

import { newStorageClient } from './client';
import { StorageError } from './errors';

type GetSignedUrlOptions = {
  bucket?: string;
  path: string;
  contentType: string;
  version?: 'v4';
  action?: 'write';
  expires?: number;
};
export const getSignedUrl = async ({
  bucket = GCP_BUCKET_ID,
  path,
  contentType,
  action = 'write',
  version = 'v4',
  expires = Date.now() + 30 * 60 * 1000, // 30 minutes
}: GetSignedUrlOptions) => {
  const storage = newStorageClient();

  try {
    const [uploadUrl] = await storage.bucket(bucket).file(path).getSignedUrl({
      version,
      action,
      expires,
      contentType,
    });

    return uploadUrl;
  } catch (error) {
    throw new StorageError({
      code: 'GCP_GET_SIGNED_URL_ERROR',
      message: 'Error getting signed url from GCP',
      cause: error,
    });
  }
};
