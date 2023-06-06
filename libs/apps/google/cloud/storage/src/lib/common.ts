import { Storage } from '@google-cloud/storage';
import {
  Infer,
  MethodCallFailure,
  newTokenSetting,
} from '@worksheets/apps/framework';
import { escapeNewLines } from '@worksheets/util/strings';

export const settings = {
  project_id: newTokenSetting({ required: true }),
  client_email: newTokenSetting({ required: true }),
  private_key: newTokenSetting({ required: true }),
};

export const newStorageClient = (opts: Infer<typeof settings>) => {
  return new Storage({
    projectId: opts.project_id,
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
    credentials: {
      client_email: opts.client_email,
      private_key: escapeNewLines(opts.private_key),
    },
  });
};

export const handleGoogleCloudStorageFailure = (error: unknown) => {
  if (error instanceof Error && 'code' in error) {
    if (error.code === 'ERR_SOCKET_CONNECTION_TIMEOUT') {
      return new MethodCallFailure({
        code: 408,
        message: 'Request timed out waiting for google-cloud services',
        cause: error,
      });
    }
  }
  return new MethodCallFailure({
    code: 500,
    message: 'unexpeected google cloud storage failure',
    cause: error,
  });
};
