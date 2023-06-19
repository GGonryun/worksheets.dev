import { z } from 'zod';
import { HandlerFailure, newPrivateHandler } from '@worksheets/util/next';
import { MAXIMUM_WORKSHEETS } from './const';
import * as WorksheetsManagement from '@worksheets/feat/worksheets-management';
import { newWorksheetsDatabase } from '@worksheets/data-access/worksheets';
import { logLevelEntity } from '@worksheets/data-access/tasks';

const worksheetsdb = newWorksheetsDatabase();

const input = z.object({
  name: z.string(),
  text: z.string(),
  description: z.string().default(''),
  logging: logLevelEntity.default('debug'),
  trigger: z.string().optional(),
  schedules: z.array(z.string()).optional(),
  events: z.array(z.string()).optional(),
  connections: z.array(z.string()).optional(),
});
const output = z.string();

export type PostWorksheetRequest = z.infer<typeof input>;
export type PostWorksheetResponse = z.infer<typeof output>;

export const post = newPrivateHandler({ input, output })(
  async ({
    user: { uid },
    data: {
      text,
      name,
      description,
      trigger,
      logging,
      schedules,
      events,
      connections,
    },
  }) => {
    const records = await WorksheetsManagement.listUsersWorksheets(uid);
    const numRecords = Object.keys(records).length;

    if (numRecords >= MAXIMUM_WORKSHEETS) {
      throw new HandlerFailure({
        code: 'resource-exhausted',
        message: 'maximum worksheets threshold reached',
      });
    }

    console.warn('TODO: save schedules', schedules);
    console.warn('TODO: save events', events);
    console.warn('TODO: save connections', connections);

    const id = worksheetsdb.id();
    console.info('upserting worksheet', id);
    await worksheetsdb.insert({
      id,
      uid,
      name,
      text,
      description,
      lastUpdated: Date.now(),
      logging,
      trigger: trigger ?? id,
    });
    return id;
  }
);
