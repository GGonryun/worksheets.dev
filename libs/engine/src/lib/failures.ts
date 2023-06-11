import { CodedFailure, CodedFailureOptions } from '@worksheets/util/errors';
import { z } from 'zod';

export type ExecutionSuccessCode = 'success';
const l = z.literal;
export const executionFailureCodeSchema = z.union([
  l('unexpected'),
  l('method-failure'),
  l('invalid-expression'),
  l('invalid-definition'),
  l('invalid-precondition'),
  l('invalid-syntax'),
  l('invalid-instruction'),
  l('unhandled-failure'),
  l('internal-error'),
]);
export type ExecutionFailureCode = z.infer<typeof executionFailureCodeSchema>;

export class ExecutionFailure extends CodedFailure<ExecutionFailureCode> {
  constructor(opts: CodedFailureOptions<ExecutionFailureCode>) {
    super(opts);
  }
}
