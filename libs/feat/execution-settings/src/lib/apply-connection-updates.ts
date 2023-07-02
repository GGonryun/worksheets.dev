import {
  ConnectionEntity,
  newConnectionDatabase,
} from '@worksheets/data-access/settings';

const db = newConnectionDatabase();

export const applyConnectionUpdates = async (
  connectionId: string,
  { uid, appId, settings, name }: Partial<Omit<ConnectionEntity, 'id'>>
) => {
  // TODO: encrypt all connection properties.
  await db.apply(connectionId, {
    uid,
    appId,
    name,
    settings,
    updatedAt: Date.now(),
  });
};
