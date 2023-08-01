import { newHandshakesDatabase } from '@worksheets/data-access/connections';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { HandshakeEntity } from '@worksheets/schemas-connections';
import { addMinutesToCurrentTime } from '@worksheets/util/time';

const db = newHandshakesDatabase();
export const reapHandshakes = async (quantity: number) => {
  const handshakes = await db.collection
    .where('expiration', '<=', Date.now())
    .limit(quantity)
    .get();

  const batch = db.batch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handshakes.forEach((doc: any) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  return handshakes.size;
};

export const createHandshake = async (opts: {
  userId: string;
  appId: string;
  fieldId: string;
}): Promise<string> => {
  const id = db.id();

  await db.insert({
    id,
    userId: opts.userId,
    appId: opts.appId,
    fieldId: opts.fieldId,
    expiration: addMinutesToCurrentTime(
      SERVER_SETTINGS.HANDSHAKE_EXPIRATION_OFFSET
    ).getTime(),
  });

  return id;
};

export const getHandshake = async (
  handshakeId: string
): Promise<HandshakeEntity | undefined> => {
  return await db.get(handshakeId);
};

export const deleteHandshake = async (handshakeId: string) => {
  await db.delete(handshakeId);
};
