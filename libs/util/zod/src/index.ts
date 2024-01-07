import { z } from 'zod';

export * from 'zod';

export function useZodValidator<
  TSchema extends z.ZodObject<any, any, any>,
  TValues extends z.infer<TSchema>,
  TKey extends keyof TValues
>(schema: TSchema) {
  return function (field: TKey, values: TValues) {
    const result = schema.safeParse(values);
    if (!result.success) {
      return result.error.flatten().fieldErrors[field]?.at(0) ?? '';
    } else {
      return '';
    }
  };
}
