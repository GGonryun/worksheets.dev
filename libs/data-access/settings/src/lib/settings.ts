import { z } from 'zod';
import {
  FirestoreDatabase,
  Txn,
  entitySchema,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { settingTypeSchema } from '@worksheets/apps/framework';

export const settingEntitySchema = z.object({
  method: z.string().describe('the method path'),
  key: z.string().describe('the key relative to the method'),
  uid: z.string().describe('the owner of the setting'),
  type: settingTypeSchema,
  data: z.unknown(),
  ...entitySchema.shape,
});
export type SettingsDatabase = FirestoreDatabase<SettingEntity>;

export type SettingEntity = z.infer<typeof settingEntitySchema>;

export const newSettingsDatabase = (txn?: Txn) =>
  newFirestore<SettingEntity>('settings', txn);
