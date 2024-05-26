import { AggregateError } from '@worksheets/util/errors';

export const defer = <TInput, TOutput>(func: (input: TInput) => TOutput) => {
  return (input: TInput) => () => func(input);
};

export const aggregateErrors = <TOutput>(func: (() => TOutput)[]) => {
  const errors: Error[] = [];
  const results: TOutput[] = [];
  for (const f of func) {
    try {
      results.push(f());
    } catch (e) {
      if (e instanceof Error) {
        errors.push(e);
      } else if (typeof e === 'string') {
        errors.push(new Error(e));
      } else {
        errors.push(new Error('Unknown error'));
      }
    }
  }

  if (errors.length > 0) {
    throw new AggregateError(errors, `Failed to parse form fields`);
  }

  return results;
};

export const valuesFrom = <T extends object>(raw: T): (keyof T)[] => {
  return Object.values(raw);
};

export const objectIncludes = <T extends object>(
  raw: T,
  value: unknown
): value is keyof T => {
  return valuesFrom(raw).includes(value as keyof T);
};
