import { CodedFailure, CodedFailureOptions } from '@worksheets/util-errors';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export class HttpRequestFailure extends CodedFailure<StatusCodes> {
  constructor(opts: CodedFailureOptions<StatusCodes>) {
    super({ ...opts });
    this.message = opts.message ?? getReasonPhrase(opts.code);
  }
}
