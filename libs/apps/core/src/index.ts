/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeOf, ZodTypeAny } from '@worksheets/zod';

// returns the inferred schema type of the context
export type ApplicationContext<T extends AnyApplication> =
  T extends Application<any, infer Context, any, any> ? TypeOf<Context> : never;

export type StringLiteral<T> = T extends string
  ? string extends T
    ? never
    : T
  : never;

export type AnyMethod = Method<any, any, any, any>;

export type Method<
  App extends string,
  Method extends string,
  Input extends ZodTypeAny,
  Output extends ZodTypeAny
> = {
  appId?: StringLiteral<App>;
  methodId?: StringLiteral<Method>;
  description?: string;
  label?: string;
  input: Input;
  output: Output;
};

export type Application<
  App extends string,
  Context extends ZodTypeAny,
  MethodIds extends string,
  Methods extends {
    [K in MethodIds]: Method<App, K, ZodTypeAny, ZodTypeAny>;
  }
> = {
  logo?: string;
  label?: string;
  description?: string;
  appId?: App;
  methods: Methods;
  context: Context;
};

export type AnyApplication = Application<any, any, any, any>;

export type Applications<T extends AnyApplication> = { [appId: string]: T };

export type Registry<T extends Applications<AnyApplication>> = T;

export function newApp<
  AppId extends string,
  Context extends ZodTypeAny,
  MethodId extends string,
  MethodType extends {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in MethodId]: Method<AppId, K, any, any>;
  }
>(opts: {
  appId: AppId;
  logo?: string;
  label?: string;
  description?: string;
  context: Context;
  methods: MethodType;
}): Application<AppId, Context, MethodId, MethodType> {
  return {
    ...opts,
  };
}

export function newMethod<
  AppId extends string,
  MethodId extends string,
  Input extends ZodTypeAny,
  Output extends ZodTypeAny
>({
  appId,
  methodId,
  description,
  label,
  input,
  output,
}: {
  appId: StringLiteral<AppId>;
  methodId: StringLiteral<MethodId>;
  description?: string;
  label?: string;
  input: Input;
  output: Output;
}): Method<AppId, MethodId, Input, Output> {
  return {
    appId,
    methodId,
    description,
    label,
    input,
    output,
  };
}

export function newRegistry<T extends { [appId: string]: AnyApplication }>(
  apps: T
): Registry<T> {
  return apps;
}

export type FailureOptions = {
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  cause?: unknown;
  code: number;
  reason: string;
};

export class ApplicationFailure extends Error {
  public readonly data?: unknown;
  public readonly cause?: unknown;
  public readonly code: number;
  public readonly reason: string;
  // a user friendly string representation of the error, combined code, reason and message into one object
  public readonly friendly: string;
  constructor(opts: FailureOptions) {
    const cause = opts.cause != null ? convertToFailure(opts.cause) : undefined;

    super(opts.message ?? opts.reason);

    this.cause = cause;
    this.data = opts.data;
    this.code = opts.code;
    this.reason = opts.reason;
    this.friendly = `[${opts.code}] ${opts.reason}${
      opts.message ? ' ' + opts.message : ''
    }`;
  }
}

function convertToFailure(error: unknown) {
  let newError: ApplicationFailure;

  if (error instanceof ApplicationFailure) {
    newError = error;
  } else {
    newError = new ApplicationFailure({ code: 500, reason: 'error' });
  }

  return newError;
}
