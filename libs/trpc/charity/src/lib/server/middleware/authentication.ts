import { TRPCError } from '@trpc/server';
import * as cookie from 'cookie';
import { z } from 'zod';

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

export const teamMembership = apiOnly.unstable_pipe(
  async ({ next, ctx: { req, db, user } }) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const teamId = cookies.teamId ?? null;

    if (!teamId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Team ID is missing from cookies',
      });
    }

    const team = await db.team.findFirst({
      where: {
        id: teamId,
        members: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        members: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!team) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Team not found',
      });
    }

    return next({
      ctx: {
        team,
      },
    });
  }
);
