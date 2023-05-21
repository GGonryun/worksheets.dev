/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export type Context<T> = {
  input: T;
};

export type MethodDefinition<
  Input extends z.ZodType<any, any, any> = z.ZodType<any, any, any>,
  Output extends z.ZodType<any, any, any> = z.ZodType<any, any, any>
> = {
  path: string;
  label: string;
  description?: string;
  input: Input | null;
  output: Output | null;
  call(ctx: Context<z.infer<Input>>): Promise<z.infer<Output>>;
};

export function newMethod<
  Inputs extends z.ZodType<any, any, any>,
  Outputs extends z.ZodType<any, any, any>
>(opts: MethodDefinition<Inputs, Outputs>): MethodDefinition<Inputs, Outputs> {
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
