import { newPrivateHandler } from '@worksheets/util/next';
import { TypeOf, z } from 'zod';
import { maskStringExceptLastFive } from '@worksheets/util/strings';
import { newSettingsDatabase } from '@worksheets/data-access/settings';

const input = z.object({
  methodPath: z.string(),
});

const output = z.record(z.union([z.boolean(), z.string()]));
export type GetSettingsResponse = TypeOf<typeof output>;

// the way the frontend fetches data for frontends is different.
// trying out what it feels like to just call the required database objects directly.
// it needs to manipulate each output type.
export const get = newPrivateHandler({ input, output })(
  async ({ data: { methodPath }, user: { uid } }) => {
    const db = newSettingsDatabase();

    const settings = await db.query(
      { f: 'uid', o: '==', v: uid },
      { f: 'method', o: '==', v: methodPath }
    );

    if (settings.length === 0) {
      return {};
    }

    const output: Record<string, string | boolean> = {};
    for (const setting of settings) {
      if (setting.type === 'flag') {
        output[setting.key] = setting.data as boolean;
      } else if (setting.type === 'oauth') {
        output[setting.key] = setting.data ? true : false;
      } else if (setting.type === 'token') {
        output[setting.key] = maskStringExceptLastFive(setting.data as string);
      } else {
        console.warn('setting entity has unknown setting type', setting.id);
      }
    }

    console.info(`found settings`, output);
    return output;
  }
);
