import { Clerk, settingTypeSchema } from '@worksheets/apps/framework';
import {
  executionDimensionsSchema,
  executionFailureCodeSchema,
} from '@worksheets/engine';

import {
  FirestoreDatabase,
  Txn,
  entitySchema,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { z } from 'zod';

export const worksheetsEntitySchema = z.object({
  text: z.string(),
  uid: z.string(),
  ...entitySchema.shape,
});
export type WorksheetEntity = z.infer<typeof worksheetsEntitySchema>;

export const executionErrorSchema = z.object({
  code: executionFailureCodeSchema,
  message: z.string(),
});

export type ExecutionErrorEntity = z.infer<typeof executionErrorSchema>;

export const executionResultSchema = z.object({
  error: executionErrorSchema.optional(),
  input: z.unknown().optional(),
  output: z.unknown().optional(),
});

export const executionEntitySchema = z.object({
  worksheetId: z.string(),
  userId: z.string().optional(),
  timestamp: z.number(),
  text: z.string().optional(),
  result: executionResultSchema.optional(),
  dimensions: executionDimensionsSchema,
  ...entitySchema.shape,
});

export type ExecutionEntity = z.infer<typeof executionEntitySchema>;

export const settingEntitySchema = z.object({
  method: z.string().describe('the method path'),
  key: z.string().describe('the key relative to the method'),
  uid: z.string().describe('the owner of the setting'),
  type: settingTypeSchema,
  data: z.unknown(),
  ...entitySchema.shape,
});

export type SettingEntity = z.infer<typeof settingEntitySchema>;

export const handshakeEntitySchema = z.object({
  uid: z.string().describe('the user that initiated the handshake'),
  methodPath: z.string(),
  propertyKey: z.string(),
  timestamp: z.number(),
  ...entitySchema.shape,
});

export type HandshakeEntity = z.infer<typeof handshakeEntitySchema>;

export type WorksheetsDatabase = FirestoreDatabase<WorksheetEntity>;
export type ExecutionsDatabase = FirestoreDatabase<ExecutionEntity>;
export type SettingsDatabase = FirestoreDatabase<SettingEntity>;
export type HandshakeDatabase = FirestoreDatabase<HandshakeEntity>;

export const newWorksheetsDatabase = (txn?: Txn) =>
  newFirestore<WorksheetEntity>('worksheets', txn);
export const newExecutionsDatabase = (txn?: Txn) =>
  newFirestore<ExecutionEntity>('executions', txn);
export const newSettingsDatabase = (txn?: Txn) =>
  newFirestore<SettingEntity>('settings', txn);
export const newHandshakesDatabase = (txn?: Txn) =>
  newFirestore<HandshakeEntity>('handshakes', txn);

export async function findSettingEntityId(
  db: SettingsDatabase,
  methodPath: string,
  propertyKey: string,
  userId: string
): Promise<string | undefined> {
  const settings = await db.query(
    { f: 'uid', o: '==', v: userId },
    { f: 'method', o: '==', v: methodPath },
    { f: 'key', o: '==', v: propertyKey }
  );
  if (!settings || settings.length < 1) {
    return undefined;
  }
  if (settings.length > 1) {
    console.warn(
      `unexpected: found more than 1 settings with the same method, uid, and key`,
      settings.map((s) => s.id)
    );
  }
  return settings[0].id;
}
