import { devRoutes } from '@worksheets/routes';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internal routes)
     * 5. /404, /429, /500 error pages
     */
    '/((?!api/|429|404|500|_next/|_static/|_vercel|[\\w-]+\\.\\w+|.*\\.).*)',
  ],
};

const protectedPages = [devRoutes.dashboard.path()];

export default async function middleware(req: NextRequest) {
  // authorization middleware
  const session = await getToken({ req });
  const user = session?.user;
  const pathname = req.nextUrl.pathname;

  if (pathname === '/' && user) {
    // redirect to the dashboard if the user is already logged in
    return NextResponse.redirect(
      new URL(devRoutes.dashboard.url(), req.url).toString()
    );
  }

  const isProtectedPath = protectedPages.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath && !user) {
    // redirect the user to the home page if they are not authenticated
    return NextResponse.redirect(new URL(devRoutes.baseUrl).toString());
  }

  // If the user is logged in, continue to the page
  return NextResponse.next();
}
