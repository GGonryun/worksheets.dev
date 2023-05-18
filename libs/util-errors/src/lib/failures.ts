function convertToFailure(error: unknown) {
  let newError: Failure;

  if (error instanceof Failure) {
    newError = error;
  } else {
    newError = new Failure({ message: `${error}` });
  }

  return newError;
}

export type FailureOptions = {
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  cause?: unknown;
};

export class Failure extends Error {
  public readonly data?: unknown;
  public readonly cause?: unknown;
  constructor(opts: FailureOptions) {
    const cause = opts.cause != null ? convertToFailure(opts.cause) : undefined;
    super(opts.message);
    this.data = {
      ...opts.data,
      cause,
    };
    this.cause = cause?.message;
  }
}
