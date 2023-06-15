import { CodedFailure, CodedFailureOptions } from '@worksheets/util/errors';
import { z } from 'zod';

export type ExecutionSuccessCode = 'success';
const l = z.literal;
export const executionFailureCodeSchema = z.union([
  l('unexpected'),
  l('unknown'),
  l('unauthorized'),
  l('method-failure'),
  l('invalid-expression'),
  l('invalid-definition'),
  l('invalid-precondition'),
  l('invalid-syntax'),
  l('invalid-operation'),
  l('invalid-instruction'),
  l('unhandled-failure'),
  l('internal-error'),
  l('not-implemented'),
  l('stack-overflow'),
  l('timeout'),
  l('retry'),
]);
export type ExecutionFailureCode = z.infer<typeof executionFailureCodeSchema>;

export class ExecutionFailure extends CodedFailure<ExecutionFailureCode> {
  // if retry is set, the execution should be retried after the requested delay
  delay: number;
  constructor(
    opts: CodedFailureOptions<ExecutionFailureCode> & { delay?: number }
  ) {
    super(opts);
    this.delay = opts.delay ?? 0;
  }

  /**
   * @name serialize
   * @description converts the failure into a simple object and stringifies internal data
   * @remarks we will lose our original cause through serialization
   * @returns the serialized failure
   */
  serialize(): object {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      data: JSON.stringify(this.data),
    };
  }

  /**
   * @name isRetryable
   * @description returns true if the failure is retryable
   */
  isRetryable(): boolean {
    return this.code === 'retry';
  }

  /**
   * @name getData
   * @description gets a value from the data object
   * @returns the value from the data object or undefined if it does not exist
   */
  getData(key: string) {
    // check if the data can be accessed by a key and return it
    if (
      typeof this.data === 'object' &&
      this.data !== null &&
      key in this.data
    ) {
      return this.data[key as keyof typeof this.data];
    }
    return undefined;
  }
}
