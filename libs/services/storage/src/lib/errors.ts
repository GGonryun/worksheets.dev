// create a custom error.
type StorageErrorCode = 'GCP_DELETE_ERROR' | 'GCP_GET_SIGNED_URL_ERROR';

export class StorageError extends Error {
  cause?: unknown;
  code: StorageErrorCode;

  constructor(opts: {
    code: StorageErrorCode;
    message: string;
    cause?: unknown;
  }) {
    super(opts.message);
    Object.setPrototypeOf(this, StorageError.prototype);
    this.name = 'StorageError';
    this.code = opts.code;
    this.cause = opts.cause;
  }
}
