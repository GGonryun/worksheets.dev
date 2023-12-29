import * as z from 'zod';
import { ReportReason } from '@prisma/client';

export const GameReportModel = z.object({
  id: z.string(),
  gameId: z.string(),
  reason: z.nativeEnum(ReportReason),
  text: z.string(),
  createdAt: z.date(),
});
