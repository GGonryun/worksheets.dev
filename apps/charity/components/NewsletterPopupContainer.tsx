import { useTimeout } from '@worksheets/ui-core';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { NewsletterPopup } from './NewsletterPopup';
import {
  CONSENT_KEY,
  NEWSLETTER_POPUP_SEEN_KEY,
  readConsentCookie,
} from '@worksheets/ui-cookie-consent';

// 3 DAYS
const NEWSLETTER_POPUP_SHORT_IGNORE = 259200;

// 5 seconds.
const NEWSLETTER_POPUP_TIMEOUT = 10000;

export const NewsletterPopupContainer = () => {
  const [cookies, setCookie] = useCookies([
    NEWSLETTER_POPUP_SEEN_KEY,
    CONSENT_KEY,
  ]);
  const [showPopup, setShowPopup] = useState(false);

  const consent = readConsentCookie(cookies);
  const popupCookie = cookies[NEWSLETTER_POPUP_SEEN_KEY];

  useTimeout(() => {
    // don't do anything if the popup has been seen or if they haven't consented to preferences
    if (!consent.preferences || popupCookie) return;
    // if not, show it
    setShowPopup(true);
  }, NEWSLETTER_POPUP_TIMEOUT);

  const handleCloseNewsletterPopup = () => {
    setShowPopup(false);
    // set the cookie to expire in 3 days.
    setCookie(NEWSLETTER_POPUP_SEEN_KEY, true, {
      path: '/',
      maxAge: NEWSLETTER_POPUP_SHORT_IGNORE,
    });
  };

  const handleIgnoreNewsletterPopup = () => {
    setShowPopup(false);
    // set the cookie to never expire.
    setCookie(NEWSLETTER_POPUP_SEEN_KEY, true, {
      path: '/',
      maxAge: Number.MAX_SAFE_INTEGER,
    });
  };

  return (
    <NewsletterPopup
      open={showPopup}
      onClose={handleCloseNewsletterPopup}
      onIgnore={handleIgnoreNewsletterPopup}
    />
  );
};
