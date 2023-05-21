import {
  CodedFailure,
  CodedFailureOptions,
  Failure,
} from '@worksheets/util-errors';
import { Context, Instruction } from '../framework';
import { Heap, Stack } from '../structures';

export type ExecutionFailureCodes =
  | 'unknown'
  | 'invalid-break-statement'
  | 'method-call-failure'
  | 'step-not-found'
  | 'unrecognized-step'
  | 'invalid-type'
  | 'invalid-argument-type'
  | 'invalid-operation'
  | 'missing-required-parameter';

export class ExecutionFailure extends CodedFailure<ExecutionFailureCodes> {
  public readonly definition: unknown;
  public readonly memory: Heap;
  public readonly instructions: Stack<Instruction>;
  constructor(
    opts: CodedFailureOptions<ExecutionFailureCodes> & {
      definition: unknown;
      context: Context;
    }
  ) {
    super(opts);
    this.definition = opts.definition;
    this.memory = opts.context.memory;
    this.instructions = opts.context.instructions;
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

export enum FailureCodes {
  UNEXPECTED = 1,
}

export class DomainFailure {
  public readonly code: FailureCodes;
  public readonly message: string;
  /**
   * All errors that a user might see during or after execution should be converted to this class. This class represents a known interface for the user to interact with error's during a worksheet's execution.
   * @param convert this failure into a domain failure.
   */
  constructor(convert: Failure | DomainFailure) {
    this.code = FailureCodes.UNEXPECTED;
    this.message = convert.message;
  }
}
