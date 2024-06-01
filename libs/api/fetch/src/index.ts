import { TRPCError } from '@trpc/server';

export const request = async <T>(
  uri: string,
  opts?: RequestInit
): Promise<T> => {
  try {
    const url = encodeURI(uri);
    console.info(`FETCH ${url}`, { opts });

    const result = await fetch(url, opts);

    if (!result.ok || result.status >= 400) {
      const cause = await result.json();
      console.error(
        `[${result.status}]: GET ${url} failed`,
        JSON.stringify(cause, null, 2)
      );

      if (result.status === 401) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `Unauthorized access`,
          cause,
        });
      }

      if (result.status === 403) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `Forbidden access`,
          cause,
        });
      }

      // TODO: handle other status codes

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to communicate`,
        cause,
      });
    }

    return await result.json();
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Unexpected error occurred`,
      cause: error,
    });
  }
};
