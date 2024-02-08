import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     * 5. all files that contain a dot (e.g. /static/image.png or /games/categories/grimace.png)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+|.*\\.).*)',
  ],
};

const protectedPages = ['/account', '/submit'];

export default async function middleware(req: NextRequest) {
  const session = await getToken({ req });
  const user = session?.user;
  const pathname = req.nextUrl.pathname;

  // if the user is attempting to access a protected page and is not logged in redirect to login
  // TODO: one day we may need to protected nested routes or paths. This will need to be updated to use regex
  const isProtectedPath = protectedPages.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath && !user) {
    // add the original destination to the redirect url
    const redirect = new URL('/login', req.url);
    redirect.searchParams.append('redirect', pathname);
    return NextResponse.redirect(redirect.toString());
  }

  if (user && pathname === '/login') {
    const redirect = new URL('/account', req.url);
    return NextResponse.redirect(redirect.toString());
  }
  // If the user is logged in, continue to the page
  return NextResponse.next();
}
