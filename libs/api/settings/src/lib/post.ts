import { newPrivateHandler } from '@worksheets/util/next';
import { TypeOf, z } from 'zod';
import { upsertSetting } from '@worksheets/feat/execution-settings';
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
    return await upsertSetting(user.uid, path, key, value);
  }
);
