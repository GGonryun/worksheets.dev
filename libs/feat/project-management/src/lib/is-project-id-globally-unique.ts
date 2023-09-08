import { newProjectsDatabase } from '@worksheets/data-access-projects';
import { bannedProjectIds } from '@worksheets/schemas-projects';

const db = newProjectsDatabase();

export const isProjectIdGloballyUnique = async (opts: {
  projectId: string;
}): Promise<boolean> => {
  if (bannedProjectIds.includes(opts.projectId)) {
    return false;
  }

  const exists = await db.has(opts.projectId);

  return !exists;
};
