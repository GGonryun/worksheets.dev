export type FailureOptions = {
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  cause?: unknown;
  code: number;
  reason: string;
};

export class ApplicationFailure extends Error {
  public readonly data?: unknown;
  public readonly cause?: unknown;
  public readonly code: number;
  public readonly reason: string;
  // a user friendly string representation of the error, combined code, reason and message into one object
  public readonly friendly: string;
  constructor(opts: FailureOptions) {
    const cause = opts.cause != null ? convertToFailure(opts.cause) : undefined;

    super(opts.message ?? opts.reason);

    this.cause = cause;
    this.data = opts.data;
    this.code = opts.code;
    this.reason = opts.reason;
    this.friendly = `[${opts.code}] ${opts.reason}${
      opts.message ? ' ' + opts.message : ''
    }`;
  }
}

function convertToFailure(error: unknown) {
  let newError: ApplicationFailure;

  if (error instanceof ApplicationFailure) {
    newError = error;
  } else {
    newError = new ApplicationFailure({ code: 500, reason: 'error' });
  }

  return newError;
}
