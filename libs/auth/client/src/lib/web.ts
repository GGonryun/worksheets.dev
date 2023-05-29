import { UserAccessFailure } from './failures';
import { User } from 'firebase/auth';
import { Decorator, Wrapper, compose } from '@worksheets/util/functional';
import useSWR, { useSWRConfig } from 'swr';

type Info = RequestInfo | URL;
type Init = RequestInit | undefined;
type Body = BodyInit | undefined;

type Fetcher<T = Response> = (info: Info, init?: Init) => Promise<T>;
export type FetchWrapper = Wrapper<Fetcher>;
type FetchDecorator<T> = Decorator<T, Fetcher>;

/**
 * provides current request for inline modifications
 * @param fetcher the target we are decorating
 * @param adding the new headers we are adding.
 * @returns
 */
const updateRequest: FetchDecorator<Wrapper<Init>> =
  (fn) => (fetcher) => async (info, original) => {
    return fetcher(info, fn(original));
  };

/**
 * applies incoming changes over original input
 * @param fetcher the target we are decorating
 * @param incoming the new properties we are setting.
 * @returns
 */
const setRequest: FetchDecorator<Init> =
  (incoming) => (fetcher) => async (info, original) => {
    return fetcher(info, { ...original, ...incoming });
  };

type RequestMethods = 'GET' | 'DELETE' | 'POST' | 'PUT';
const method: FetchDecorator<RequestMethods> = (method) =>
  setRequest({ method });

const body: FetchDecorator<Body> = (body) => setRequest({ body });

const header: FetchDecorator<HeadersInit> = (headers) =>
  updateRequest((init) =>
    !init ? { headers } : { ...init, headers: { ...init.headers, ...headers } }
  );

enum ContentType {
  JSON = 'application/json',
  YAML = 'text/vnd.yaml',
  TEXT = 'text/text',
}
const content: FetchDecorator<ContentType> = (contentType) =>
  header({
    'Content-Type': contentType,
  });

const bearer: FetchDecorator<User | null> =
  (user) => (fetcher) => async (info, init) => {
    if (!user) throw new UserAccessFailure({ code: 'unauthorized' });
    const token = await user.getIdToken();
    return header({ Authorization: `Bearer ${token}` })(fetcher)(info, init);
  };

const usePublic = <Output>(url: string, shouldLoad = true) => {
  const insecure = compose(fetch)(); // add global attributes here.
  return useSWR<Output>(shouldLoad && url, errorAdapter<Output>(insecure));
};

const usePrivate = <Output>(url: string, user: User | null) => {
  const secure = compose(fetch)(bearer(user));
  return useSWR<Output>(Boolean(user) && url, errorAdapter<Output>(secure));
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
      <Output>(url: string, mode: RequestMethods, data?: unknown) =>
        errorAdapter<Output>(
          compose(fetch)(
            method(mode),
            bearer(user),
            content(ContentType.JSON),
            body(JSON.stringify(data))
          )
        )(url),
    public:
      () =>
      <Output>(url: string, mode: RequestMethods, data?: unknown) =>
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
