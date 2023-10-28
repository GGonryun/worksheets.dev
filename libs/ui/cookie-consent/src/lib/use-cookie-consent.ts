import { useCookies } from './use-cookies';
import { CONSENT_KEY, CookieConsent, readConsentCookie } from './util';

export const useCookieConsent = () => {
  const { cookies, setCookie } = useCookies([CONSENT_KEY]);
  return {
    consent: readConsentCookie(cookies),
    setConsent: (opt: CookieConsent) =>
      setCookie(CONSENT_KEY, opt, {
        path: '/',
        maxAge: Number.MAX_SAFE_INTEGER,
      }),
  };
};
