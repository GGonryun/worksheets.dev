import { GCP_BUCKET_ID } from '@worksheets/services/environment';

import { newStorageClient } from './client';
import { StorageError } from './errors';

export const deleteFile = async (path: string) => {
  // 1. delete from GCP
  try {
    const storage = newStorageClient();

    await storage.bucket(GCP_BUCKET_ID).file(path).delete();
  } catch (error) {
    // TODO: log this somewhere else so we can retry or handle manually.
    throw new StorageError({
      code: 'GCP_DELETE_ERROR',
      message: 'Error deleting file from GCP',
      cause: error,
    });
  }
};
