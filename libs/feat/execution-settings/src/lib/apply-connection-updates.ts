import { TRPCError } from '@trpc/server';
import {
  ConnectionEntity,
  newConnectionDatabase,
} from '@worksheets/data-access/settings';
import { merge } from 'lodash';

const db = newConnectionDatabase();

export const applyConnectionUpdates = async (
  connectionId: string,
  updates: Partial<Omit<ConnectionEntity, 'id'>>
) => {
  // TODO: encrypt all connection properties.
  if (await db.has(connectionId)) {
    const data = await db.get(connectionId);
    return await db.update(merge(data, updates));
  } else {
    if (!updates.uid) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message:
          "Server tried to apply connection update but it doesn't exist and a uid is required to create a connection.",
      });
    }

    // TOOD: check how many connections the user has.

    return await db.insert({
      id: connectionId,
      uid: updates.uid ?? '',
      appId: updates.appId ?? '',
      name: updates.name ?? '',
      settings: updates.settings ?? {},
      updatedAt: Date.now(),
    });
  }
};
