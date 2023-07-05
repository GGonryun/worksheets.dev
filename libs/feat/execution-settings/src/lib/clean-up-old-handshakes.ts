import { newHandshakesDatabase } from '@worksheets/data-access/handshakes';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

const db = newHandshakesDatabase();
export const cleanUpOldHandshakes = async (quantity: number) => {
  const handshakes = await db.collection
    .where(
      'timestamp',
      '<=',
      SERVER_SETTINGS.REAPER.FREQUENCIES.DELETE_HANDSHAKES
    )
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
