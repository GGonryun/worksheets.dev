import { AggregateError } from '@worksheets/util/errors';

export const fireAndForget = <T>(promise: Promise<T>): void => {
  promise
    .then(() => {
      // do nothing
    })
    .catch((error) => {
      console.error('[F&F]: received an error', error);
    });
};

export const fireAndForgetFn = <T>(fn: () => Promise<T>): void => {
  fireAndForget(fn());
};

export const isFulfilled = <T>(
  input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';

export const isRejected = <T>(
  input: PromiseSettledResult<T>
): input is PromiseRejectedResult => input.status === 'rejected';

export function aggregateSettledErrors<T>(
  results: PromiseSettledResult<T>[]
): T[] {
  const errors = results.filter(isRejected).map((r) => r.reason);
  if (errors.length > 0) {
    throw new AggregateError(
      errors,
      `${errors.map((err) => err.message).join('\n')}`
    );
  }
  return results.filter(isFulfilled).map((r) => r.value);
}
