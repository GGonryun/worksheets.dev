import { Method } from './framework';
import { registry } from './registry';

export type Applications = typeof registry;
export type ApplicationKeys = keyof Applications;
export type ApplicationMethods<T extends ApplicationKeys> =
  Applications[T]['methods'];

export type ApplicationMethodKeys<T> = T extends ApplicationKeys
  ? keyof ApplicationMethods<T>
  : never;

export type ApplicationContext<T> = T extends ApplicationKeys
  ? Applications[T]['context']
  : never;

export type ApplicationMethodData<
  T extends ApplicationKeys,
  K extends ApplicationMethodKeys<T>
> = ApplicationMethods<T>[K] extends Method<T, K, infer U, infer V>
  ? {
      context: inferApplicationContextSchema<T>;
      input: U;
      output: V;
    }
  : never;

export type ApplicationMethodAction<
  K extends ApplicationKeys,
  L extends ApplicationMethodKeys<K>
> = (
  input: ApplicationMethodData<K, L>['input']
) => Promise<ApplicationMethodData<K, L>['output']>;

export type inferApplicationContextSchema<T extends ApplicationKeys> =
  Applications[T]['context'];

export type inferSchema<T extends Applications> = {
  [K in keyof T]: (
    ctx?: K extends ApplicationKeys ? inferApplicationContextSchema<K> : never
  ) => {
    [L in ApplicationMethodKeys<K>]: K extends ApplicationKeys
      ? ApplicationMethodAction<K, L>
      : never;
  };
};

export type ApplicationMethodRoutes<K extends ApplicationKeys> = {
  [L in ApplicationMethodKeys<K>]: K extends ApplicationKeys
    ? ApplicationMethodAction<K, L>
    : never;
};

export type inferApplicationSchema<K extends ApplicationKeys> = inferSchema<
  typeof registry
>[K];

export type inferApplicationMethodAction<
  K extends ApplicationKeys,
  M extends ApplicationMethodKeys<K>
> = ApplicationMethodAction<K, M>;

export type ApplicationRouter = inferSchema<typeof registry>;

export type ApplicationHandlers = {
  [AppId in keyof Applications]: ApplicationMethodHandlers<AppId>;
};

export type ApplicationMethodHandler<
  AppId extends ApplicationKeys,
  MethodId extends ApplicationMethodKeys<AppId>
> = (
  ctx: Pick<ApplicationMethodData<AppId, MethodId>, 'context' | 'input'>
) => Promise<ApplicationMethodData<AppId, MethodId>['output']>;

export type ApplicationMethodHandlers<AppId extends ApplicationKeys> = {
  [MethodId in ApplicationMethodKeys<AppId>]: ApplicationMethodHandler<
    AppId,
    MethodId
  >;
};

export type ApplicationMask<Mask> = {
  [K in keyof Applications]: Mask;
};

export type ApplicationMethodMask<Mask> = {
  [K in keyof Applications]: {
    [L in ApplicationMethodKeys<K>]: Mask;
  };
};

// Mask the individual properties of the data
export type ApplicationDataMask<Mask> = {
  [K in keyof Applications]?: ApplicationMethodDataMask<K, Mask>;
};

export type ApplicationMethodDataMask<App extends ApplicationKeys, Mask> = {
  [L in ApplicationMethodKeys<App>]?: {
    [M in keyof ApplicationMethodData<App, L>]?: ApplicationMethodData<
      App,
      L
    >[M] extends unknown[] | string | number | boolean | null | undefined
      ? Mask
      : { [N in keyof ApplicationMethodData<App, L>[M]]?: Mask };
  };
};
