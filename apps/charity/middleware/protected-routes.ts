import { JWT, getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

enum PathRule {
  startsWith,
}

const guards: Record<PathRule, (pathname: string, path: string) => boolean> = {
  [PathRule.startsWith]: (pathname, path) => pathname.startsWith(path),
};

const protect = async (
  req: NextRequest,
  session: JWT | null,
  opts: {
    page: string;
    rule: PathRule;
  }[]
) => {
  const pathname = req.nextUrl.pathname;
  if (!session) {
    for (const opt of opts) {
      const guard = guards[opt.rule];
      console.log('guarding', pathname, opt.page);
      if (guard(pathname, opt.page)) {
        return true;
      }
    }
  }

  return false;
};

export const protectPages = async (req: NextRequest) => {
  const session = await getToken({ req });

  return await protect(req, session, [
    {
      rule: PathRule.startsWith,
      page: '/dashboard',
    },
  ]);
};
