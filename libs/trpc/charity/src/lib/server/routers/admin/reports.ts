import { TRPCError } from '@trpc/server';
import { reportDetails, reportSummary } from '@worksheets/util/types';
import { z } from 'zod';

import { adminProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  list: adminProcedure
    .input(
      z.object({
        take: z.number(),
        skip: z.number(),
      })
    )
    .output(reportSummary.array())
    .query(async ({ input: { take, skip }, ctx: { db } }) => {
      const reports = await db.gameReport.findMany({
        take,
        skip,
        select: {
          id: true,
          gameId: true,
          reason: true,
          createdAt: true,
          text: true,
        },
      });

      return reports.map((report) => ({
        reportId: report.id,
        gameId: report.gameId,
        reason: report.reason,
        createdAt: report.createdAt.getTime(),
      }));
    }),
  find: adminProcedure
    .input(
      z.object({
        reportId: z.string(),
      })
    )
    .output(reportDetails)
    .query(async ({ input: { reportId }, ctx: { db } }) => {
      const report = await db.gameReport.findFirst({
        where: {
          id: reportId,
        },
        select: {
          id: true,
          gameId: true,
          reason: true,
          createdAt: true,
          text: true,
        },
      });
      if (!report) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Report not found',
        });
      }

      return {
        reportId: report.id,
        gameId: report.gameId,
        reason: report.reason,
        createdAt: report.createdAt.getTime(),
        text: report.text,
      };
    }),
});
