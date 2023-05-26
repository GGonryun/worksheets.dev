/* eslint-disable @typescript-eslint/no-explicit-any */
import { Failure, FailureOptions } from '@worksheets/util/errors';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export type Context<T> = {
  input: T;
};

type zAny = z.ZodType<any, any, any>;

export type MethodDefinition<
  Input extends zAny = any,
  Output extends zAny = any
> = {
  path: string;
  label: string;
  description?: string;
  input: Input | null;
  output: Output | null;
  call: (ctx: Context<z.infer<Input>>) => Promise<z.infer<Output>>;
};

export function newMethod<Inputs extends zAny, Outputs extends zAny>(
  opts: MethodDefinition<Inputs, Outputs>
): MethodDefinition<Inputs, Outputs> {
  return opts;
}

export type ApplicationDefinition = {
  label: string;
  description: string;
  methods: MethodDefinition[];
};

export function newApplication(opts: ApplicationDefinition) {
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

export interface ApplicationLibrary {
  list(): MethodDefinition[];
  call(path: string, ...inputs: unknown[]): Promise<unknown>;
}
