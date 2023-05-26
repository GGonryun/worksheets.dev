import { User } from 'firebase/auth';
import { UserAccessFailure } from './failures';

type Info = RequestInfo | URL;

type Init = RequestInit | undefined;

type Fetcher = (info: Info, init?: Init) => Promise<Response>;
type FetcherDecorator<T> = (fetcher: Fetcher, data: T) => Fetcher;

export const poster: Fetcher = async (
  info: Info,
  init: Init
): Promise<Response> => {
  const i: Init = init ?? {};
  i.method = 'POST';
  return fetch(info, init);
};

export const getter: Fetcher = async (info, init) => {
  const i: Init = init ?? {};
  i.method = 'GET';
  return fetch(info, init);
};

export const deleter: Fetcher = async (info, init) => {
  const i: Init = init ?? {};
  i.method = 'DELETE';
  return fetch(info, init);
};

export const authorized: FetcherDecorator<User | null> =
  (fetcher, user) => async (info, init) => {
    if (!user) throw new UserAccessFailure({ code: 'unauthorized' });

    const token = await user.getIdToken();

    const headed = withHeaders(fetcher, { Authorization: `Bearer ${token}` });

    return headed(info, init);
  };

export function yamled(fetch: Fetcher): Fetcher {
  return withHeaders(fetch, {
    'Content-Type': 'text/vnd.yaml',
  });
}

/**
 * merges new headers into existing list of headers
 * @param fetcher the target we are decorating
 * @param adding the new headers we are adding.
 * @returns
 */
export const withHeaders: FetcherDecorator<HeadersInit | undefined> =
  (fetcher, adding) => async (info, init) => {
    const { headers, ...rest } = init ?? {};
    return fetcher(info, { ...rest, headers: { ...headers, ...adding } });
  };
