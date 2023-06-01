import { newPrivateHandler } from '@worksheets/util/next';
import { TypeOf, z } from 'zod';
import { newPrivateDatabase } from '../data-access/private-db';

const input = z.object({
  path: z.string(),
  key: z.string(),
  value: z.unknown(),
});

const output = z.object({ url: z.string().optional() });

export type PostSettingsRequest = TypeOf<typeof input>;
export type PostSettingsResponse = TypeOf<typeof output>;

export const post = newPrivateHandler({ input, output })(
  async ({ data: { key, path, value }, user }) => {
    const db = newPrivateDatabase(user);
    const response = await db.settings.save(path, key, value);
    console.info(`saving user ${user.uid} setting`, path, key, value);
    return response;
  }
);
