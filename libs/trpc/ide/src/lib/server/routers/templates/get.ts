import { z } from 'zod';
import {
  getTemplate,
  templateDetailsSchema,
} from '@worksheets/feat/templates-gallery';
import { TRPCError } from '@trpc/server';
import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(z.object({ templateId: z.string() }))
  .output(templateDetailsSchema)
  .query(async ({ input: { templateId } }) => {
    const template = getTemplate(templateId);

    if (!template) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Template with id ${templateId} not found`,
      });
    }

    return template;
  });
