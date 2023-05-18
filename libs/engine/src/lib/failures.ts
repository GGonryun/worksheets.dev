import { CodedFailure, CodedFailureOptions } from '@worksheets/util-errors';
import { Instruction } from './instructions/framework';

export type ExecutionFailureCodes = 'unknown' | 'incorrect-break-statement';

export class ExecutionFailure extends CodedFailure<ExecutionFailureCodes> {
  public readonly definition: unknown;
  constructor(
    opts: CodedFailureOptions<ExecutionFailureCodes> & {
      definition: unknown;
    }
  ) {
    super(opts);
    this.definition = opts.definition;
  }
}
