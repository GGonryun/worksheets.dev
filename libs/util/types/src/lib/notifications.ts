import { NotificationType } from '@prisma/client';
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
  ...NotificationType,
  ALL: 'ALL' as const,
});

export type FilterableNotificationType = z.infer<
  typeof filterableNotificationType
>;

export const notificationPreferencesSchema = z.object({
  email: z.string(),
  enabledEmailNotifications: z.boolean(),
});

export type NotificationPreferencesSchema = z.infer<
  typeof notificationPreferencesSchema
>;
