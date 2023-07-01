import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { getTemplate } from '@worksheets/feat/templates-gallery';
import { TRPCError } from '@trpc/server';
export default protectedProcedure
  .input(z.string().describe('template id'))
  .query(async ({ input }) => {
    const template = getTemplate(input);
    if (!template) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Template with id ${input} not found`,
      });
    }

    return template;
  });
