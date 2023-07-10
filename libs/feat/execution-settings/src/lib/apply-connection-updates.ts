import { TRPCError } from '@trpc/server';
import {
  ConnectionEntity,
  newConnectionDatabase,
} from '@worksheets/data-access/settings';
import { limits } from '@worksheets/feat/user-management';
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

    // check how many connections the user has.
    const connections = await db.query({ f: 'uid', o: '==', v: updates.uid });
    if (
      await limits.exceeds({
        uid: updates.uid,
        type: 'maxConnections',
        value: connections.length + 1,
      })
    ) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message:
          "You've reached the maximum number of connections. Contact support to increase your quota.",
      });
    }

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
