import { CodedFailure, CodedFailureOptions } from '@worksheets/util-errors';
import { Context } from '../framework';

export type ExecutionFailureCodes =
  | 'unknown'
  | 'invalid-break-statement'
  | 'method-call-failure'
  | 'step-not-found'
  | 'unrecognized-step'
  | 'invalid-type'
  | 'invalid-argument-type'
  | 'missing-required-parameter';

export class ExecutionFailure extends CodedFailure<ExecutionFailureCodes> {
  public readonly definition: unknown;
  public readonly context: Context;
  constructor(
    opts: CodedFailureOptions<ExecutionFailureCodes> & {
      definition: unknown;
      context: Context;
    }
  ) {
    super(opts);
    this.definition = opts.definition;
    this.context = opts.context;
  }
}

export type EvaluateExpressionFailureCode =
  | 'unexpected-type'
  | 'unexpected-operator'
  | 'too-many-statements'
  | 'argument-required'
  | 'bad-script'
  | 'method-not-in-library';
export class EvaluateExpressionFailure extends CodedFailure<EvaluateExpressionFailureCode> {
  constructor(opts: CodedFailureOptions<EvaluateExpressionFailureCode>) {
    super(opts);
  }
}
