import { NotificationType } from '@worksheets/prisma';
import { z } from 'zod';

export const notificationSchema = z.object({
  id: z.string(),
  text: z.string(),
  type: z.nativeEnum(NotificationType),
  createdAt: z.number(),
  read: z.boolean(),
});

export type NotificationSchema = z.infer<typeof notificationSchema>;

export const filterableNotificationType = z.nativeEnum({
  SYSTEM: 'SYSTEM',
  ALL: 'ALL',
  PRIZE: 'PRIZE',
  RAFFLE: 'RAFFLE',
  INVENTORY: 'INVENTORY',
  GAME: 'GAME',
  VICTORY: 'VICTORY',
  ACHIEVEMENT: 'ACHIEVEMENT',
} as const);

export type FilterableNotificationType = z.infer<
  typeof filterableNotificationType
>;
