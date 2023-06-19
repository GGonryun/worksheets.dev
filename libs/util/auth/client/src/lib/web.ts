import { User } from 'firebase/auth';
import { compose } from '@worksheets/util/functional';
import useSWR, { useSWRConfig } from 'swr';
import {
  Fetcher,
  fetcher,
  ContentType,
  RequestMethods,
  FetchDecorator,
} from '@worksheets/util/http';
import { UserAccessFailure } from './failures';

const { method, body, bearer, content } = fetcher;

const userBearer: FetchDecorator<User | null> =
  (user) => (fetcher) => async (info, init) => {
    if (!user) throw new UserAccessFailure({ code: 'unauthorized' });
    const token = await user.getIdToken();
    return bearer(token)(fetcher)(info, init);
  };

const usePublic = <Output>(url: string, shouldLoad = true) => {
  const insecure = compose(fetch)(); // add global attributes here.
  return useSWR<Output>(shouldLoad && url, errorAdapter<Output>(insecure));
};

/**
 *
 * @param url
 * @param user
 * @param shouldLoad checks if the request should be made
 * @returns
 */
const usePrivate = <Output>(
  url: string,
  user: User | null,
  shouldLoad = true
) => {
  const secure = compose(fetch)(userBearer(user));
  return useSWR<Output>(
    Boolean(user) && shouldLoad && url,
    errorAdapter<Output>(secure)
  );
};

/**
 * ensures that all errors are acknowledged.
 *
 * @param fetcher that will be wrapped
 * @returns the wrapped fetcher with a translation set
 * @note when we return status codes with json payloads, fetch promises resolve without acknowledging invalid status codes.
 */
const errorAdapter =
  <Output>(fetcher: Fetcher): Fetcher<Output> =>
  (info, init) =>
    fetcher(info, init).then(async (r) => {
      if (r.ok) {
        if (r.status === 204) return r.text();
        return r.json();
      }
      throw await r.json();
    });

const useMutate = () => {
  const { mutate } = useSWRConfig();
  return mutate;
};

export const request = {
  command: {
    private:
      (user: User | null) =>
      <Output, Input>(url: string, mode: RequestMethods, data?: Input) =>
        errorAdapter<Output>(
          compose(fetch)(
            method(mode),
            userBearer(user),
            content(ContentType.JSON),
            body(JSON.stringify(data))
          )
        )(url),
    maybe:
      (user: User | null) =>
      <Output, Input>(url: string, mode: RequestMethods, data?: Input) =>
        errorAdapter<Output>(
          compose(fetch)(
            method(mode),
            user ? userBearer(user) : (t) => t,
            content(ContentType.JSON),
            body(JSON.stringify(data))
          )
        )(url),
    public:
      () =>
      <Output, Input>(url: string, mode: RequestMethods, data?: Input) =>
        errorAdapter<Output>(
          compose(fetch)(
            method(mode),
            content(ContentType.JSON),
            body(JSON.stringify(data))
          )
        )(url),
  },
  // query
  query: { usePublic, usePrivate, useMutate },
};
