import { TeamMemberRole } from '@worksheets/prisma';
import { z } from 'zod';

export const teamInviteSchema = z.object({
  id: z.string(),
  team: z.object({
    id: z.string(),
    name: z.string(),
  }),
  email: z.string(),
  role: z.nativeEnum(TeamMemberRole),
  invitedBy: z.object({
    id: z.string(),
    username: z.string(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});
