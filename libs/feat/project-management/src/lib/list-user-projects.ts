import { newProjectsDatabase } from '@worksheets/data-access-projects';
import { ListProjectsResponse } from '@worksheets/schemas-projects';

const db = newProjectsDatabase();
export const listUserProjects = async (opts: {
  userId: string;
}): Promise<ListProjectsResponse['projects']> => {
  return await db.query({ f: 'uid', o: '==', v: opts.userId });
};
