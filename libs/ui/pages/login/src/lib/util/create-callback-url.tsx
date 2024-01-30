import { CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';
import { ParsedUrlQuery } from 'querystring';

export const createCallbackUrl = (opts: {
  query: ParsedUrlQuery;
  skipPortal: boolean;
}): URL => {
  const { query, skipPortal } = opts;

  // where we'll redirect the user after we've finished processing their login
  // or take them to the home page if there's no redirect
  const redirect = query['redirect']
    ? (query['redirect'] as string)
    : '/account';

  // if the user already has completed the portal setup, we can send them straight
  // to the requested url or their account page
  if (skipPortal) {
    return new URL(redirect, CHARITY_GAMES_BASE_URL);
  }

  // otherwise, we'll send them to the portal page with the redirect url as a query param
  const url = new URL('/portal', CHARITY_GAMES_BASE_URL);
  url.searchParams.set('redirect', redirect);

  return url;
};
