import { ZodTypeAny, z } from '@worksheets/zod';

export type StringLiteral<T> = T extends string
  ? string extends T
    ? never
    : T
  : never;

export type Method<App, Method, Input, Output> = {
  appId?: StringLiteral<App>;
  methodId?: StringLiteral<Method>;
  description?: string;
  label?: string;
  input: Input;
  output: Output;
};

export type Application<
  App extends string,
  MethodId extends string,
  Methods extends {
    [K in MethodId]: Method<App, K, ZodTypeAny, ZodTypeAny>;
  },
  Context extends ZodTypeAny
> = {
  logo?: string;
  label?: string;
  description?: string;
  appId?: App;
  methods: Methods;
  context: Context;
  // unused types
  methodIds?: {
    [K in MethodId]: K;
  };
};

export function newApp<
  AppId extends string,
  MethodId extends string,
  MethodType extends {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in MethodId]: Method<AppId, K, any, any>;
  },
  Context extends ZodTypeAny,
  MethodIds extends keyof MethodType
>(
  opts: {
    appId: AppId;
    logo?: string;
    label?: string;
    description?: string;
    keys?: MethodIds;
    context: Context;
  },
  methods: MethodType
): Application<AppId, MethodId, MethodType, z.infer<Context>> {
  return {
    methods,
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
  appId?: StringLiteral<AppId>;
  methodId?: StringLiteral<MethodId>;
  description?: string;
  label?: string;
  input: Input;
  output: Output;
}): Method<AppId, MethodId, z.infer<Input>, z.infer<Output>> {
  return {
    appId,
    methodId,
    description,
    label,
    input,
    output,
  };
}

export function newRegistry<T>(apps: T) {
  return apps;
}
