import { MethodCallFailure } from '@worksheets/apps/framework';
import { DropboxResponseError } from 'dropbox';

export const handleDropboxError = (error: unknown, input: string) => {
  if (error instanceof DropboxResponseError) {
    if (error.status === 409) {
      throw new MethodCallFailure({
        code: error.status,
        message: `dropbox could not find folder at path '${input}': ${error?.error?.error_summary}`,
        cause: error,
      });
    }
    if (error.status === 400) {
      throw new MethodCallFailure({
        code: error.status,
        message: `dropbox received a bad path '${input}': ${error.error}`,
        data: error.error,
        cause: error,
      });
    }
  }
};
