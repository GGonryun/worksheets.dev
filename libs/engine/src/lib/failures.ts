import { CodedFailure, CodedFailureOptions } from '@worksheets/util-errors';

export type ExecutionFailureCodes =
  | 'unexpected'
  | 'invalid-expression'
  | 'invalid-precondition'
  | 'invalid-syntax'
  | 'invalid-instruction'
  | 'unhandled-failure';

export class ExecutionFailure extends CodedFailure<ExecutionFailureCodes> {
  constructor(opts: CodedFailureOptions<ExecutionFailureCodes>) {
    super(opts);
  }
}
