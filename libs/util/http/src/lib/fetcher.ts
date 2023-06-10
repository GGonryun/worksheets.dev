import { Failure } from '@worksheets/util/errors';
import { Decorator, Wrapper, compose } from '@worksheets/util/functional';

type Info = RequestInfo | URL;
type Init = RequestInit | undefined;
type Body = BodyInit | undefined;

export type Fetcher<T = Response> = (info: Info, init?: Init) => Promise<T>;
export type FetchWrapper = Wrapper<Fetcher>;
export type FetchDecorator<T> = Decorator<T, Fetcher>;

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

export type RequestMethods = 'GET' | 'DELETE' | 'POST' | 'PUT';
const method: FetchDecorator<RequestMethods> = (method) =>
  setRequest({ method });

const body: FetchDecorator<Body> = (body) => setRequest({ body });

const json: FetchDecorator<unknown> = (u) =>
  setRequest({ body: JSON.stringify(u) });

const header: FetchDecorator<HeadersInit> = (headers) =>
  updateRequest((init) =>
    !init ? { headers } : { ...init, headers: { ...init.headers, ...headers } }
  );

export enum ContentType {
  JSON = 'application/json',
  YAML = 'text/vnd.yaml',
  TEXT = 'text/text',
}
const content: FetchDecorator<ContentType> = (contentType) =>
  header({
    'Content-Type': contentType,
  });

const accept: FetchDecorator<ContentType> = (contentType) =>
  header({
    Accept: contentType,
  });

const bearer: FetchDecorator<string> =
  (token) => (fetcher) => async (info, init) => {
    return header({ Authorization: `Bearer ${token}` })(fetcher)(info, init);
  };

const composer = (fetcher?: Fetcher) => compose(fetcher ?? fetch);

const applier = (fetcher: Fetcher, ...wrappers: FetchWrapper[]) =>
  compose(fetcher)(...wrappers);

const aborter: FetchDecorator<number> =
  (timeout: number) => (fetcher) => async (info, init) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      return controller.abort();
    }, timeout);

    try {
      const response = await fetcher(info, {
        ...init,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new AbortFailure({ cause: error, message: 'Request timed out' });
      }
      throw error;
    }
  };

export class AbortFailure extends Failure {}

export const fetcher = {
  applier,
  composer,
  bearer,
  content,
  accept,
  header,
  body,
  json,
  method,
  setRequest,
  updateRequest,
  aborter,
};
