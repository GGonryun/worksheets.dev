import { Storage } from '@google-cloud/storage';
import {
  GCP_CLIENT_EMAIL,
  GCP_PRIVATE_KEY,
} from '@worksheets/services/environment';

export const newStorageClient = (): Storage => {
  const storage = new Storage({
    credentials: {
      client_email: GCP_CLIENT_EMAIL,
      private_key: GCP_PRIVATE_KEY,
    },
  });

  return storage;
};
