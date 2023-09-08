import { privateProcedure } from '../../procedures';
import {
  createProjectRequestSchema,
  createProjectResponseSchema,
} from '@worksheets/schemas-projects';
import { createUserProject } from '@worksheets/feat-project-management';

export default privateProcedure
  .input(createProjectRequestSchema)
  .output(createProjectResponseSchema)
  .mutation(async ({ ctx, input }) => {
    const project = await createUserProject({
      userId: ctx.user.uid,
      id: input.id,
      features: input.features,
      title: input.title,
    });

    return {
      project: {
        id: project.id,
        title: project.title,
        features: project.features,
        domain: project.domain,
      },
    };
  });
