import { z } from '@worksheets/zod';
import { protectedProcedure } from '../../procedures/protected';
import { TeamModel } from '@worksheets/prisma';

const form = TeamModel.pick({ name: true, subdomain: true, description: true });
export default protectedProcedure
  .input(form)
  .output(
    z.object({
      ok: z.boolean(),
      errors: z
        .object({
          name: z.string().optional(),
          subdomain: z.string().optional(),
          description: z.string().optional(),
        })
        .optional(),
      id: z.string(),
    })
  )
  .mutation(({ ctx: { session, db }, input }) => {
    // console.log('protectedProcedure', ctx.session, input);

    // TODO: prisma -- create a new team and add the user as the owner of the team

    return {
      ok: false,
      errors: { name: 'Name is required' },
      id: '',
    };
  });
