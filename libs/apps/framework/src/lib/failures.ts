import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { Failure, FailureOptions } from '@worksheets/util-errors';

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

export class HttpRequestFailure extends CodedFailure<StatusCodes> {
  constructor(opts: CodedFailureOptions<StatusCodes>) {
    super({ ...opts });
    this.message = opts.message ?? getReasonPhrase(opts.code);
  }
}
