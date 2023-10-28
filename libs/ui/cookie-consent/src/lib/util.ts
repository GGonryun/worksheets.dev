export type CookieConsent = {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
};

export const CONSENT_KEY = 'cookie_consent';
export const NEWSLETTER_POPUP_SEEN_KEY = 'newsletterPopupSeen';

export const COOKIE_KEYS = [CONSENT_KEY, NEWSLETTER_POPUP_SEEN_KEY];

export const readConsentCookie = (cookies?: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}): CookieConsent => {
  if (cookies && cookies[CONSENT_KEY]) {
    const consent = cookies[CONSENT_KEY];
    return {
      necessary: Boolean(consent['necessary']),
      preferences: Boolean(consent['preferences']),
      statistics: Boolean(consent['statistics']),
      marketing: Boolean(consent['marketing']),
    };
  } else {
    return {
      necessary: false,
      preferences: false,
      statistics: false,
      marketing: false,
    };
  }
};
