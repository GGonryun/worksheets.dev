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
