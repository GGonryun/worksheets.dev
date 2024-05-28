export const fireAndForget = <T>(promise: Promise<T>): void => {
  promise
    .then(() => {
      // do nothing
    })
    .catch((error) => {
      console.error('[F&F]: received an error', error);
    });
};
