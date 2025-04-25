import { TRPCError } from '@trpc/server';
import { Prisma } from '@worksheets/prisma';
import { detailsFormSchema } from '@worksheets/util/types';
import { parseViewportId } from '@worksheets/util/viewport';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../../procedures';

const editDetailsFormSchema = detailsFormSchema.extend({ id: z.string() });
type EditDetailsFormSchema = z.infer<typeof editDetailsFormSchema>;

export default protectedTeamProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(editDetailsFormSchema)
  .query(async ({ ctx: { db, user, team }, input }) => {
    const { gameId } = input;
    const game = await db.game.findFirst({
      where: {
        id: gameId,
        teamId: team.id,
      },
      include: {
        categories: true,
      },
    });

    if (!game) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Game not found',
      });
    }
    return parseDetails(game);
  });

export const parseDetails = (
  game: Prisma.GameGetPayload<{
    include: {
      categories: true;
    };
  }>
): EditDetailsFormSchema => {
  return {
    id: game.id,
    title: game.title,
    slug: game.slug,
    description: game.description,
    tags: game.categories.map((c) => c.categoryId),
    aiDisclosure: game.aiDisclosure,
    ...parseViewportId(game.viewportId),
  };
};
