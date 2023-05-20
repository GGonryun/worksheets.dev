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
    this.cause = cause;
  }
}

export type CodedFailureOptions<T> = ConstructorParameters<
  typeof CodedFailure<T>
>[0];

export class CodedFailure<T> extends Failure {
  public readonly code: T;
  constructor(
    opts: {
      code: T;
    } & FailureOptions
  ) {
    const { code, message, data, cause } = opts;
    super({
      message: message ?? `failure ${code}`,
      data: data,
      cause: cause,
    });
    this.code = code;
  }
}
