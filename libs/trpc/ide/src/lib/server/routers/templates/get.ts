import { z } from 'zod';
import { Severity, publicProcedure } from '../../trpc';
import {
  getTemplate,
  templateDetailsSchema,
} from '@worksheets/feat/templates-gallery';
import { TRPCError } from '@trpc/server';
export default publicProcedure
  .meta({
    logging: Severity.ERROR,
    openapi: {
      enabled: true,
      summary: 'Get template details',
      description: 'Get template details',
      tags: ['templates'],
      method: 'GET',
      path: '/templates/{templateId}',
    },
  })
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
