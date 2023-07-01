import {
  FirestoreDatabase,
  newFirestore,
} from '@worksheets/firebase/firestore';
import { z } from 'zod';

export const serverSettingEntity = z.object({
  id: z.union([
    z.literal('version'),
    z.literal('replenish-server-resource-alert-threshold-error'),
    z.literal('replenish-server-resource-alert-threshold-warning'),
    z.literal('replenish-server-resource-alert-threshold-info'),
    z.literal('replenish-rate-limit-alert-threshold-error'),
    z.literal('replenish-rate-limit-alert-threshold-warning'),
    z.literal('replenish-rate-limit-alert-threshold-info'),
    z.literal('replenish-server-quantities'),
    z.literal('replenish-server-intervals'),

    z.literal('max-collected-metric-per-key'),
  ]),
  value: z.string(),
});
export type ServerSettingEntity = z.infer<typeof serverSettingEntity>;
export type ServerSettingsDatabase = FirestoreDatabase<ServerSettingEntity>;

export const newServerSettingsDatabase = () => {
  return newFirestore<ServerSettingEntity>('serversettings');
};
