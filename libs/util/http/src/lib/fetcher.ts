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

export const fetcher = {
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
};
