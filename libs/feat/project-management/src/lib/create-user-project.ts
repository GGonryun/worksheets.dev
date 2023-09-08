import { newProjectsDatabase } from '@worksheets/data-access-projects';
import {
  CreateProjectRequest,
  CreateProjectResponse,
} from '@worksheets/schemas-projects';

const db = newProjectsDatabase();

export const createUserProject = async (
  opts: {
    userId: string;
  } & CreateProjectRequest
): Promise<CreateProjectResponse['project']> => {
  const result = await db.insert({
    id: opts.id,
    uid: opts.userId,
    title: opts.title,
    features: opts.features,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  return {
    id: result.id,
    title: result.title,
    features: result.features,
    domain: '', // TODO: allow user's to set a domain. a domain is for an org not a website
  };
};
