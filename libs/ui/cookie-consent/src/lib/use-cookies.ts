import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
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
      ...(options ?? {}),
    };
    const cookieDomain = SERVER_SETTINGS.ENVIRONMENT.COOKIE_DOMAIN();
    if (cookieDomain) {
      cookieOptions.domain = cookieDomain;
    }

    setCookie(name, value, cookieOptions);
  };

  return {
    cookies,
    setCookie: globallySetCookie,
    removeCookie,
  };
};
