import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { listConnections } from '@worksheets/feat/execution-settings';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { formatTimestampLong } from '@worksheets/util/time';
import { Settings } from '@worksheets/apps/framework';

const registry = newApplicationsDatabase();

const output = z.array(
  z.object({
    id: z.string().optional(),
    connectionName: z.string().optional(),
    app: z.object({
      label: z.string().optional(),
      logo: z.string().optional(),
    }),
    validation: z.object({
      status: z.union([
        z.literal('active'),
        z.literal('inactive'),
        z.literal('incomplete'),
      ]),
      message: z.string(),
    }),
    updatedAt: z.string(),
  })
);
type Result = z.infer<typeof output>;

export default protectedProcedure.output(output).query(
  async ({
    ctx: {
      user: { uid },
    },
  }) => {
    console.info(`received request to list connections for user ${uid}`);
    const rows: Result = [];
    // get the app from the registry
    const connections = await listConnections({
      uid,
    });

    for (const connection of connections) {
      const app = registry.getApp(connection.appId);
      const isIncomplete = areRequiredFieldsSet(
        app.settings,
        connection.settings
      );
      rows.push({
        id: connection.id,
        connectionName: connection.name,
        app: { label: app.label, logo: app.logo },
        validation: {
          status: isIncomplete ? 'active' : 'incomplete',
          message: isIncomplete ? '' : 'Connection has missing fields',
        },
        updatedAt: formatTimestampLong(connection.updatedAt),
      });
    }

    return rows;
  }
);

const areRequiredFieldsSet = (
  settings: Settings | null,
  values: Record<string, unknown>
): boolean => {
  if (!settings) return true;

  return Object.keys(settings).every((fieldId) => {
    const field = settings[fieldId];
    if (field.required) {
      if (field.type === 'oauth') {
        return values[fieldId];
      }

      return !!values[fieldId];
    }

    return true;
  });
};
