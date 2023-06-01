import { ZodTypeAny, z } from 'zod';
import { Settings, Infer } from './settings';
import { Failure, FailureOptions } from '@worksheets/util/errors';
import { StatusCodes } from 'http-status-codes';

export type Context<T, S> = {
  input: T;
  settings: S;
};

export type MethodDefinition<
  Input extends ZodTypeAny | null = ZodTypeAny | null,
  Output extends ZodTypeAny | null = ZodTypeAny | null,
  Globals extends Settings | null = Settings | null // TODO: is it safe to drop to null here?
> = {
  path: string;
  label: string;
  description: string | null;
  settings: Globals;
  input: Input;
  output: Output;
  call: (
    ctx: Context<
      Input extends ZodTypeAny ? z.infer<Input> : never,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Globals extends Settings ? Infer<Globals> : any
    >
  ) => Promise<Output extends ZodTypeAny ? z.infer<Output> : void>;
};

export function newMethod<
  Inputs extends ZodTypeAny | null,
  Outputs extends ZodTypeAny | null,
  Globals extends Settings | null
>(
  opts: MethodDefinition<Inputs, Outputs, Globals>
): MethodDefinition<Inputs, Outputs, Globals> {
  return opts;
}

export class MethodCallFailure extends Failure {
  public readonly code: StatusCodes;
  constructor(opts: FailureOptions & { code: StatusCodes }) {
    super(opts);
    this.code = opts.code;
  }

  toSimple() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}
