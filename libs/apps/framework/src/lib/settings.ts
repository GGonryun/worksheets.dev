import {
  TypeOf,
  ZodBoolean,
  ZodError,
  ZodIssue,
  ZodString,
  ZodTypeAny,
  any,
  boolean,
  string,
  z,
} from 'zod';
import { Keys } from '@worksheets/util/types';
import { OAuthOptions } from '@worksheets/util/oauth/client';

/* Base Definitions */

export const settingTypeSchema = z.union([
  z.literal('flag'),
  z.literal('token'),
  z.literal('oauth'),
]);

export type SettingType = TypeOf<typeof settingTypeSchema>;

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

export type FlagSetting<Required extends boolean> = BaseSetting<
  'flag',
  ZodBoolean,
  Required
>;

export type TokenSetting<Required extends boolean> = BaseSetting<
  'token',
  ZodString,
  Required
>;

export type OAuthSetting<
  Schema extends ZodTypeAny,
  Required extends boolean
> = BaseSetting<'oauth', Schema, Required> & {
  options: OAuthOptions;
};

export type Setting =
  | FlagSetting<boolean>
  | TokenSetting<boolean>
  | OAuthSetting<ZodTypeAny, boolean>;

export type Settings = {
  [id: string]: Setting;
};

/** Setting Constructors */
type Options<R extends boolean> = Omit<
  Setting,
  'schema' | 'type' | 'required'
> & {
  // our compiler can make type checks because we explicitely define the type R on the required property.
  required: R;
};

type SafeParseSuccess<Output> = {
  success: true;
  data: Output;
};
type SafeParseError = {
  success: false;
  errors: ZodIssue[];
};
type SafeParseReturnType<Output> = SafeParseSuccess<Output> | SafeParseError;

export const safeParse = <S extends Settings>(
  settings: S,
  rawObject: unknown
): SafeParseReturnType<Infer<S>> => {
  const object = (rawObject ?? {}) as Record<string, unknown>;
  const actualType = typeof rawObject;

  if (actualType !== 'object' || Array.isArray(settings)) {
    return {
      success: false,
      errors: [
        {
          code: 'invalid_type',
          message: 'input must be an object with keys',
          expected: 'object',
          received: actualType,
          path: ['value'],
        },
      ],
    };
  }
  const errors: ZodIssue[] = [];
  const output: Record<string, unknown> = {};
  for (const key in settings) {
    const setting = settings[key];
    const comparingTo = object[key];
    try {
      const data = setting.schema.optional().parse(comparingTo);
      if (setting.required && !data) {
        errors.push({
          code: 'custom',
          message: `required setting '${key}' has not been set`,
          expected: setting.type,
          received: 'undefined',
          path: [key],
        });
        continue;
      }
      output[key] = data;
    } catch (error) {
      if (error instanceof ZodError) {
        errors.push(...error.issues);
      }
    }
  }
  if (errors.length) {
    return { success: false, errors };
  }

  return { success: true, data: output as Infer<S> };
};

export const newFlagSetting = <R extends boolean>(
  opts: Options<R>
): R extends true ? FlagSetting<true> : FlagSetting<false> =>
  ({
    ...opts,
    type: 'flag',
    schema: boolean(),
  } as R extends true ? FlagSetting<true> : FlagSetting<false>);

export const newTokenSetting = <R extends boolean>(
  opts: Options<R>
): R extends true ? TokenSetting<true> : TokenSetting<false> =>
  ({
    ...opts,
    type: 'token',
    schema: string(),
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
