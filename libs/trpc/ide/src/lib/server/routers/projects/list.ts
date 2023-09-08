import { privateProcedure } from '../../procedures';
import { listUserProjects } from '@worksheets/feat-project-management';
import {
  MAX_USER_PROJECTS,
  listProjectsRequestSchema,
  listProjectsResponseSchema,
} from '@worksheets/schemas-projects';

export default privateProcedure
  .input(listProjectsRequestSchema)
  .output(listProjectsResponseSchema)
  .query(async ({ ctx }) => {
    const projects = await listUserProjects({
      userId: ctx.user.uid,
    });

    return { projects, max: MAX_USER_PROJECTS };
  });
