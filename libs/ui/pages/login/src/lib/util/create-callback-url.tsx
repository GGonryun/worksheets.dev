import { portalRoutes } from '@worksheets/routes';
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
    : portalRoutes.account.path();

  // if the user already has completed the portal setup, we can send them straight
  // to the requested url or their account page
  if (skipPortal) {
    return new URL(redirect, portalRoutes.baseUrl);
  }

  // otherwise, we'll send them to the portal page with the redirect url as a query param
  const url = new URL(portalRoutes.home.path(), portalRoutes.baseUrl);
  url.searchParams.set('redirect', redirect);

  return url;
};
