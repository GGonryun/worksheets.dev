import { TRPCError } from '@trpc/server';
import {
  MemberPermission,
  MEMBERSHIP_PERMISSIONS,
} from '@worksheets/util/team';
import * as cookie from 'cookie';

import { middleware } from '../trpc';

export const authentication = middleware(async ({ next, ctx, type, path }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `Authorization middleware stopped unauthorized user from completing request ${type} - ${path}`,
    });
  }

  const user = await ctx.db.user.findFirst({
    where: {
      id: ctx.session.user.id,
    },
  });

  if (!user) {
    throw new TRPCError({
      code: `UNAUTHORIZED`,
      message: `Authorization middleware stopped request (${type} - ${path}) because user was not found in database`,
    });
  }

  return next({
    ctx: {
      user,
    },
  });
});

export const apiOnly = authentication.unstable_pipe(
  async ({ next, ctx, type, path }) => {
    if (ctx.type !== 'api') {
      throw new TRPCError({
        code: 'BAD_GATEWAY',
        message: `API only middleware stopped request (${type} - ${path}) because it is not coming from an API context.`,
      });
    }
    return next({
      ctx: {
        ...ctx,
      },
    });
  }
);

export const teamMembership = (required: MemberPermission[]) =>
  apiOnly.unstable_pipe(async ({ next, ctx: { req, db, user } }) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const teamId = cookies.teamId ?? null;

    if (!teamId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Team ID is missing from cookies',
      });
    }

    const teamMembership = await db.teamMembership.findFirst({
      where: {
        userId: user.id,
        teamId,
      },
      include: {
        team: true,
      },
    });

    if (!teamMembership) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Team not found',
      });
    }
    const { team, ...membership } = teamMembership;

    const permissions = MEMBERSHIP_PERMISSIONS[teamMembership.role];

    if (required.some((permission) => !permissions.includes(permission))) {
      console.error('User does not have permission to perform this action', {
        required,
        permissions,
        teamId,
        userId: user.id,
      });
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `User does not have permission to perform this action`,
      });
    }

    return next({
      ctx: {
        team,
        membership,
        permissions,
      },
    });
  });
