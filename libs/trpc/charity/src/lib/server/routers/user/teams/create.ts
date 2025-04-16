import { TRPCError } from '@trpc/server';
import { Prisma } from '@worksheets/prisma';
import { generateTeamSlug, validateTeamName } from '@worksheets/util/team';

import { protectedProcedure } from '../../../procedures';
import { createTeamSchema, parseTeam, teamSchema } from './shared';

export default protectedProcedure
  .input(createTeamSchema)
  .output(teamSchema)
  .mutation(async ({ ctx: { user, db }, input }) => {
    const validationError = validateTeamName(input.name);
    if (validationError) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: validationError,
      });
    }
    const data = {
      name: input.name,
      description: input.description,
      links: input.links,
      slug: generateTeamSlug(input.name),
    };

    try {
      const team = await db.team.create({
        data: {
          ...data,
          members: {
            create: {
              userId: user.id,
            },
          },
        },
        include: {
          logo: true,
          members: true,
          games: true,
        },
      });
      return parseTeam(team);
    } catch (error) {
      // check if is prisma error
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const meta = error.meta as any;
        const field = meta.target[0] as keyof typeof data;
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Team ${field} (${data[field]}) is already taken`,
        });
      }
      throw error;
    }
  });
