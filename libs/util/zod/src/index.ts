import { z } from 'zod';

type SafeGlobalValidation<T extends string | number | symbol> =
  | {
      success: false;
      errors: Record<T, string>;
    }
  | {
      success: true;
    };

export function useZodValidator<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TSchema extends z.ZodObject<any, any, any> | z.ZodEffects<any, any>,
  TValues extends z.infer<TSchema>,
  TKey extends keyof TValues
>(schema: TSchema) {
  function fieldValidator(field: TKey, values: TValues) {
    const result = schema.safeParse(values);
    if (!result.success) {
      return result.error.flatten().fieldErrors[field]?.at(0) ?? '';
    } else {
      return '';
    }
  }

  function globalValidator(values: TValues): SafeGlobalValidation<TKey> {
    const result = schema.safeParse(values);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const entries = Object.entries(errors);

      const map = entries.reduce((acc, [key, value]) => {
        acc[key as TKey] = value?.at(0) ?? '';
        return acc;
      }, {} as Record<TKey, string>);

      return {
        errors: map,
        success: false,
      };
    }
    return { success: true };
  }

  return { fieldValidator, globalValidator };
}

export function makeOptionalPropsNullable<Schema extends z.AnyZodObject>(
  schema: Schema
) {
  const entries = Object.entries(schema.shape) as [
    keyof Schema['shape'],
    z.ZodTypeAny
  ][];
  const newProps = entries.reduce(
    (acc, [key, value]) => {
      acc[key] =
        value instanceof z.ZodOptional ? value.unwrap().nullable() : value;
      return acc;
    },
    {} as {
      [key in keyof Schema['shape']]: Schema['shape'][key] extends z.ZodOptional<
        infer T
      >
        ? z.ZodNullable<T>
        : Schema['shape'][key];
    }
  );
  return z.object(newProps);
}
