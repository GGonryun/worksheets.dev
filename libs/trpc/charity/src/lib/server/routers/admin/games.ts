import { TRPCError } from '@trpc/server';
import {
  gameDetails,
  gameSummary,
  GameTag,
  ViewportKeys,
} from '@worksheets/util/types';
import { z } from 'zod';

import { adminProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  list: adminProcedure
    .input(
      z.object({
        skip: z.number().optional(),
        take: z.number().optional(),
      })
    )
    .output(gameSummary.array())
    .query(async ({ input: { take, skip }, ctx: { db } }) => {
      const games = await db.game.findMany({
        take,
        skip,
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return games.map((game) => ({
        gameId: game.id,
        title: game.title,
        status: game.status,
        createdAt: game.createdAt.getTime(),
      }));
    }),
  find: adminProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .output(gameDetails)
    .query(async ({ input: { gameId }, ctx: { db } }) => {
      const game = await db.game.findFirst({
        where: {
          id: gameId,
        },
        select: {
          id: true,
          status: true,
          title: true,
          description: true,
          viewportId: true,
          developerId: true,
          plays: true,
          likes: true,
          dislikes: true,
          updatedAt: true,
          createdAt: true,
          cover: true,
          thumbnail: true,
          file: {
            select: {
              id: true,
              url: true,
              type: true,
            },
          },
          categories: {
            select: { categoryId: true },
          },
          reports: {
            select: {
              id: true,
              reason: true,
            },
          },
        },
      });

      if (!game) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Game not found',
        });
      }

      return {
        gameId: game.id,
        status: game.status,
        categories: game.categories.map(
          (category) => category.categoryId as GameTag
        ),
        title: game.title,
        description: game.description,
        plays: game.plays,
        likes: game.likes,
        dislikes: game.dislikes,
        thumbnail: game.thumbnail,
        cover: game.cover,
        fileId: game.file.id,
        fileUrl: game.file.url,
        fileType: game.file.type,
        viewportId: game.viewportId as ViewportKeys,
        developerId: game.developerId,
        createdAt: game.createdAt.getTime(),
        updatedAt: game.updatedAt.getTime(),
        reports: game.reports.map((report) => ({
          reportId: report.id,
          reason: report.reason,
        })),
      };
    }),
});
