import { TRPCError } from '@trpc/server';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { newConnectionsDatabase } from '@worksheets/data-access/connections';
import { getConnection } from './util';

const applications = newApplicationsDatabase();
const connections = newConnectionsDatabase();

export const updateConnectionProperty = async (opts: {
  appId: string;
  fieldId: string;
  userId: string;
  value: string;
}) => {
  // 1. get the connection
  const connection = await getConnection({
    appId: opts.appId,
    userId: opts.userId,
  });

  // 2. get the field metadata
  const metadatas = applications.getConnectionFields(opts.appId);
  const metadata = metadatas[opts.fieldId];
  if (!metadata) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Application ${opts.appId} field ${opts.fieldId} not found.`,
    });
  }

  // 3. apply the updated value to the field.
  const updatedFields = connection?.fields ?? {};
  updatedFields[opts.fieldId] = opts.value;

  // 4. calculate the new connection status (complete or incomplete)
  const { status, error } = await applications.validateConnection(
    opts.appId,
    updatedFields
  );

  // 5. calculate the new connection status (active or warning)
  const id = connection?.id ?? connections.id();

  // 6. save updated connection
  return await connections.updateOrInsert({
    id: id,
    appId: opts.appId,
    userId: opts.userId,
    fields: updatedFields,
    error: error ?? '',
    status: status ?? 'unknown',
  });
};
