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

const protectedPages = ['/account'];

export default async function middleware(req: NextRequest) {
  const session = await getToken({ req });
  const user = session?.user;
  const pathname = req.nextUrl.pathname;

  // if the user is attempting to access a protected page and is not logged in redirect to login
  // TODO: one day we may need to protected nested routes or paths. This will need to be updated to use regex
  if (protectedPages.includes(pathname) && !user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  // If the user is logged in, continue to the page
  return NextResponse.next();
}
