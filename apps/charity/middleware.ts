import { NextRequest, NextResponse } from 'next/server';
import { protectPages } from './middleware/protected-routes';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  // redirect to login if not authenticated on protected pages
  if (await protectPages(req)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const url = req.nextUrl;

  // Get the full host name of request (e.g. demo.vercel.pub, demo.charity.test:6969)
  const host = req.headers.get('host');

  // Get the root domain of the app (eg. Prod: charity.games, Local: charity.local)
  const root = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  // Strip away the public root domain so that we can find the custom subdomain.
  const domain: string = host?.replace(`.${root}`, '') ?? '';

  const searchParams = req.nextUrl.searchParams.toString();

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`;

  // rewrite root domain to `/` route
  if (host === root) {
    return NextResponse.rewrite(new URL(`${path}`, req.url));
  }

  const newUrl = new URL(`/_tenants/${domain}${path}`, req.url);

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(newUrl);
}
