import { WorksheetEntity } from '@worksheets/data-access/worksheets';
import { newWorksheetsConnectionsDatabase } from '@worksheets/data-access/worksheets-connections';
import {
  listConnections,
  loadConnectionForm,
} from '@worksheets/feat/execution-settings';
import { getUserWorksheet } from './get-user-worksheet';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { Settings } from '@worksheets/apps/framework';
import { formatTimestampLong } from '@worksheets/util/time';
import { ListConnectionsResponse } from '@worksheets/schemas-worksheets';

const worksheetConnectionsDb = newWorksheetsConnectionsDatabase();
const applicationRegistry = newApplicationsDatabase();

export const addWorksheetConnections = async ({
  worksheetId,
  userId,
  connectionIds,
}: {
  worksheetId: string;
  userId: string;
  connectionIds: string[];
}) => {
  for (const connectionId of connectionIds) {
    // get connection details
    const form = await loadConnectionForm({ id: connectionId, uid: userId });
    if (form.created) {
      console.warn(`skipping: connection ${connectionId} not found`);
      continue;
    }
    console.info(`creating associated worksheet connections`);
    await worksheetConnectionsDb.insert({
      id: worksheetConnectionsDb.id(),
      worksheetId,
      connectionId,
      uid: userId,
      appId: form.connection.appId,
    });
  }
};

export type UpdateWorksheetConnectionRequest = {
  worksheetId: string;
  userId: string;
  connectionIds: string[];
};

/**
 * Sets the new list of connection id's in persistant storage.
 * If the new list has some ids removed, those ids are deleted.
 * If the new list has some ids added, those ids are added.
 */
export const updateWorksheetConnections = async ({
  worksheetId,
  userId,
  connectionIds,
}: UpdateWorksheetConnectionRequest) => {
  // get all existing connections
  const connections = await worksheetConnectionsDb.query({
    f: 'worksheetId',
    o: '==',
    v: worksheetId,
  });

  // put the connections that are not in the new list into a delete list
  const deleteList = connections.filter(
    (c) => !connectionIds.includes(c.connectionId)
  );
  // put the connections that are not in the old list into an add list
  const addList = connectionIds.filter(
    (c) => !connections.map((c) => c.connectionId).includes(c)
  );

  // delete the delete list
  for (const connection of deleteList) {
    await worksheetConnectionsDb.delete(connection.id);
  }

  // add the add list
  await addWorksheetConnections({
    worksheetId,
    userId,
    connectionIds: addList,
  });

  return 'ok';
};

export const getWorksheetConnections = async ({
  worksheetId,
}: {
  worksheetId: string;
}): Promise<string[]> => {
  const connections = await worksheetConnectionsDb.query({
    f: 'worksheetId',
    o: '==',
    v: worksheetId,
  });
  return connections.map((c) => c.connectionId);
};

export const getConnectionWorksheets = async ({
  userId,
  connectionId,
}: {
  userId: string;
  connectionId: string;
}) => {
  if (!connectionId) return [];

  const connections = await worksheetConnectionsDb.query({
    f: 'connectionId',
    o: '==',
    v: connectionId,
  });
  console.info(`found ${connections.length} connections`);
  const worksheets: WorksheetEntity[] = [];

  for (const connection of connections) {
    console.info(
      `searching for connection worksheet ${connection.worksheetId}`
    );
    const worksheet = await getUserWorksheet(userId, connection.worksheetId);
    worksheets.push(worksheet);
  }

  return worksheets;
};

export const listUserConnections = async (
  uid: string
): Promise<ListConnectionsResponse> => {
  const rows: ListConnectionsResponse = [];
  // get the app from the registry
  const connections = await listConnections({
    uid,
  });

  for (const connection of connections) {
    const app = applicationRegistry.getApp(connection.appId);
    const isIncomplete = areRequiredFieldsSet(
      app.settings,
      connection.settings
    );
    rows.push({
      id: connection.id,
      connectionName: connection.name,
      app: { id: app.id, label: app.label, logo: app.logo },
      validation: {
        status: isIncomplete ? 'active' : 'incomplete',
        message: isIncomplete ? '' : 'Connection has missing fields',
      },
      updatedAt: formatTimestampLong(connection.updatedAt),
    });
  }

  return rows;
};

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
