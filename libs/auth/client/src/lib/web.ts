import { UserAccessFailure } from './failures';
import { User } from 'firebase/auth';
import {
  Applier,
  Decorator,
  Wrapper,
  combine,
  compose,
} from '@worksheets/util/functional';

type Info = RequestInfo | URL;
type Init = RequestInit | undefined;
type Body = BodyInit | undefined;

type Fetcher<T = Response> = (info: Info, init?: Init) => Promise<T>;
type FetchWrapper = Wrapper<Fetcher>;
type FetchDecorator<T> = Decorator<T, Fetcher>;
type FetchApplier = Applier<Fetcher>;

/**
 * request fetch requests using building blocks, the fetch api is automatically bound for you.
 * @param wrappers the various decorators to apply
 * @returns a composed fetch request with all decorators set, the standard api will still apply.
 */
const request: FetchApplier = (...wrappers) => {
  return compose(fetch)(...wrappers);
};

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

const method: FetchDecorator<'GET' | 'DELETE' | 'POST' | 'PUT'> = (method) =>
  setRequest({ method });

const body: FetchDecorator<Body> = (body) => setRequest({ body });

const yamlbody: FetchDecorator<string> = (text) => combine(yaml, body(text));
const jsonBody: FetchDecorator<unknown> = (obj) =>
  combine(json, body(JSON.stringify(obj)));

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

const json: FetchWrapper = content(ContentType.JSON);

const yaml: FetchWrapper = content(ContentType.YAML);

const text: FetchWrapper = content(ContentType.TEXT);

const bearer: FetchDecorator<User | null> =
  (user) => (fetcher) => async (info, init) => {
    if (!user) throw new UserAccessFailure({ code: 'unauthorized' });
    const token = await user.getIdToken();
    return header({ Authorization: `Bearer ${token}` })(fetcher)(info, init);
  };

const basicFetcher = (url: string): [string | false, Fetcher<any>] => [
  url,
  compose(fetch)(jsonResolving),
];

const secureFetcher = (
  url: string,
  user: User | null
): [string | false, Fetcher<any>] => [
  Boolean(user) && url,
  compose(fetch)(bearer(user), jsonResolving),
];

const jsonResolving: Wrapper<Fetcher<any>> = (fetcher) => (info, init) =>
  fetcher(info, init).then((t) => t.json());

export const web = {
  request,
  body: {
    yaml: yamlbody,
    json: jsonBody,
  },
  method,
  compose,
  headers: {
    content: {
      json,
      yaml,
      text,
    },
    auth: {
      bearer,
    },
  },
  swr: { basic: basicFetcher, secure: secureFetcher },
};
