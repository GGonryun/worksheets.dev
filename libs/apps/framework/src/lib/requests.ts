import { HttpRequestFailure } from './failures';

export const requests = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async HTTP(url: URL | RequestInfo, requestInit?: RequestInit): Promise<any> {
    let json, result;
    try {
      result = await fetch(url, requestInit);
      json = await result.json();
    } catch (error) {
      throw new HttpRequestFailure({
        code: 500,
        cause: error,
        data: { status: result?.status, json },
      });
    }
    if (!result.ok) {
      throw new HttpRequestFailure({
        code: result.status,
        data: json,
        message: `http request failed ${result.status} ${result.statusText}`,
      });
    }
    return json;
  },
  async Fetch(url: URL | RequestInfo, requestInit?: RequestInit) {
    try {
      return await fetch(url, requestInit);
    } catch (error) {
      throw new HttpRequestFailure({
        code: 500,
        cause: error,
        data: { url, requestInit },
      });
    }
  },
};
