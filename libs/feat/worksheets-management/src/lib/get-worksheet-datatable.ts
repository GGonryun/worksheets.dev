import {
  applicationDetailsSchema,
  convertApplicationDefinition,
  newApplicationsDatabase,
} from '@worksheets/data-access/applications';
import { onlyUnique } from '@worksheets/util/functional';
import { formatTimestamp } from '@worksheets/util/time';
import {
  searchForFunctions,
  splitFunctionDeclaration,
} from '@worksheets/util/worksheets';
import { z } from 'zod';
import { listUsersWorksheets } from './list-user-worksheets';
import { newTasksDatabase } from '@worksheets/data-access/tasks';

const appsDb = newApplicationsDatabase();
const tasksDb = newTasksDatabase();

export const worksheetDataRowSchema = z.object({
  name: z.string(),
  id: z.string(),
  apps: z.array(applicationDetailsSchema),
  lastUpdated: z.string(),
  lastExecuted: z.string().optional(),
});

export const worksheetsDataTableSchema = z.array(worksheetDataRowSchema);
export type WorksheetsDataTable = z.infer<typeof worksheetsDataTableSchema>;

export const getWorksheetsDataTable = async (
  userId: string
): Promise<WorksheetsDataTable> => {
  const list = await listUsersWorksheets(userId);
  const rows: WorksheetsDataTable = [];
  for (const worksheetId in list) {
    const worksheet = list[worksheetId];
    // for each worksheet get it's last execution
    const data = await tasksDb.collection
      .where('worksheetId', '==', worksheetId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    const entities = tasksDb.parse(data);

    // get apps from worksheet text.
    const appIds = searchForFunctions(worksheet.text)
      .map((declaration) => splitFunctionDeclaration(declaration).app)
      .filter(Boolean)
      .filter(onlyUnique);

    const appDetails = appsDb
      .list()
      .filter((app) => appIds.includes(app.id))
      .map(convertApplicationDefinition);

    rows.push({
      name: worksheet.name,
      id: worksheet.id,
      apps: appDetails,
      lastUpdated: formatTimestamp(worksheet.updatedAt),
      lastExecuted: entities.length
        ? formatTimestamp(entities[0].createdAt)
        : undefined,
    });
  }
  return rows;
};
