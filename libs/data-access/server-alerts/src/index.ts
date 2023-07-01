import {
  entitySchema,
  FirestoreDatabase,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { z } from 'zod';

export const serverAlertSeverity = z.enum(['info', 'warning', 'error']);
export type ServerAlertSeverity = z.infer<typeof serverAlertSeverity>;
export const serverAlertEntity = z.object({
  ...entitySchema.shape,
  message: z.string(),
  severity: serverAlertSeverity,
  createdAt: z.number(),
  data: z.unknown(),
});
export type ServerAlertEntity = z.infer<typeof serverAlertEntity>;
export type ServerAlertsDatabase = FirestoreDatabase<ServerAlertEntity>;

export const newServerAlertsDatabase = () => {
  return newFirestore<ServerAlertEntity>('serveralerts');
};
