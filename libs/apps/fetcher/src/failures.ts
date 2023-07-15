export type FailureOptions = {
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  cause?: unknown;
  code: number;
  reason: string;
};

export class Failure extends Error {
  public readonly data?: unknown;
  public readonly cause?: unknown;
  constructor(opts: FailureOptions) {
    const cause = opts.cause != null ? convertToFailure(opts.cause) : undefined;
    super(
      `[${opts.code}] ${opts.reason}${opts.message ? ' ' + opts.message : ''}`
    );
    this.data = opts.data;
    this.cause = cause;
  }
}

function convertToFailure(error: unknown) {
  let newError: Failure;

  if (error instanceof Failure) {
    newError = error;
  } else {
    newError = new Failure({ code: 500, reason: 'error' });
  }

  return newError;
}
