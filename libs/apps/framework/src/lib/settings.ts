import {
  TypeOf,
  ZodBoolean,
  ZodError,
  ZodString,
  ZodTypeAny,
  any,
  z,
} from '@worksheets/zod';
import { Keys } from '@worksheets/util/types';
import { OAuthOptions } from '@worksheets/util/oauth/client';
import { SettingType } from '@worksheets/schemas-applications';

/* Base Definitions */

export type BaseSetting<
  Type extends SettingType,
  Schema extends ZodTypeAny,
  Required extends boolean
> = {
  schema: Schema;
  type: Type;
  label?: string;
  required: Required;
};

/* Setting Definitions */

export type FlagSetting = BaseSetting<'flag', ZodBoolean, false>;

export type TokenSetting<Required extends boolean> = BaseSetting<
  'token',
  ZodString,
  Required
>;

export type OAuthSetting<
  Schema extends ZodTypeAny = ZodTypeAny,
  Required extends boolean = boolean
> = BaseSetting<'oauth', Schema, Required> & {
  options: OAuthOptions;
};

export type Setting =
  | FlagSetting
  | TokenSetting<boolean>
  | OAuthSetting<ZodTypeAny, boolean>;

export type Settings = {
  [id: string]: Setting;
};

export const newSettings = <T>(settings: T) => {
  return settings;
};

/** Setting Constructors */
type Options<R extends boolean> = Omit<
  Setting,
  'schema' | 'type' | 'required'
> & {
  // our compiler can make type checks because we explicitely define the type R on the required property.
  required: R;
};

export const parseSettings = <S extends Settings>(
  settings: S,
  rawObject: unknown
): Infer<S> => {
  const object = (rawObject ?? {}) as Record<string, unknown>;
  const actualType = typeof rawObject;

  if (actualType !== 'object' || Array.isArray(settings)) {
    throw new ZodError([
      {
        code: 'invalid_type',
        message: 'input must be an object with keys',
        expected: 'object',
        received: actualType,
        path: ['value'],
      },
    ]);
  }

  const output: Record<string, unknown> = {};
  for (const key in settings) {
    const setting = settings[key];
    const comparingTo = object[key];
    const data = setting.schema.optional().parse(comparingTo);
    if (setting.required && !data) {
      throw new ZodError([
        {
          code: 'invalid_type',
          fatal: false,
          message: `required setting '${key}' has not been set`,
          expected: 'string',
          received: 'undefined',
          path: [key],
        },
      ]);
    }
    output[key] = data;
  }

  return output as Infer<S>;
};

export const newFlagSetting = (
  opts: Omit<Options<false>, 'required'> = {}
): FlagSetting => ({
  ...opts,
  required: false,
  type: 'flag',
  schema: z.boolean(),
});

export const newTokenSetting = <R extends boolean>(
  opts: Options<R>
): R extends true ? TokenSetting<true> : TokenSetting<false> =>
  ({
    ...opts,
    type: 'token',
    schema: z.string(),
  } as R extends true ? TokenSetting<true> : TokenSetting<false>);

export const newOAuthSetting = <S extends ZodTypeAny, R extends boolean>(
  opts: Options<R> & {
    options: OAuthOptions;
    schema: S;
  }
): R extends true ? OAuthSetting<S, true> : OAuthSetting<S, false> =>
  ({
    ...opts,
    schema: opts.schema ?? any(),
    type: 'oauth',
  } as R extends true ? OAuthSetting<S, true> : OAuthSetting<S, false>);

/**
 * Infer's a settings object's theoretical shape given a list of schemas.
 */
export type Infer<T extends Settings> = T extends null
  ? never
  : {
      [P in Keys<T>]: T[P] extends { required?: true }
        ? TypeOf<T[P]['schema']>
        : TypeOf<T[P]['schema']> | undefined;
    };
