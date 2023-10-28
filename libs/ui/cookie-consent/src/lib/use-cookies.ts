import { useCookies as useReactCookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

export const useCookies = (dependencies: string[]) => {
  const [cookies, setCookie, removeCookie] = useReactCookies(dependencies);

  const globallySetCookie = (
    name: string,
    value: unknown,
    options?: CookieSetOptions
  ) => {
    const cookieOptions = {
      path: '/',
      maxAge: Number.MAX_SAFE_INTEGER,
      ...(options ?? {}),
    };
    if (process.env.COOKIE_DOMAIN) {
      cookieOptions.domain = process.env.COOKIE_DOMAIN;
    }

    setCookie(name, value, options);
  };

  return {
    cookies,
    setCookie: globallySetCookie,
    removeCookie,
  };
};
