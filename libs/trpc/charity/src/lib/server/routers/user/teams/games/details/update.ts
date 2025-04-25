import { TRPCError } from '@trpc/server';
import { detailsFormSchema } from '@worksheets/util/types';
import { computeViewportId } from '@worksheets/util/viewport';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../../procedures';

export default protectedTeamProcedure
  .input(
    z.object({
      gameId: z.string(),
      form: detailsFormSchema,
    })
  )
  .mutation(async ({ ctx: { db, team }, input }) => {
    const game = await db.game.findFirst({
      where: {
        id: input.gameId,
        teamId: team.id,
      },
      include: {
        categories: true,
      },
    });

    if (!game) {
      console.error(
        'Game does not exist or does not belong to the team or the user is not a member of the team',
        input
      );
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Game not found',
      });
    }
    const viewportId = computeViewportId(
      input.form.devices,
      input.form.orientation
    );

    const { addTags, removeTags } = computeTagUpdates(
      game.categories.map((c) => c.categoryId),
      input.form.tags
    );

    await db.$transaction(async (tx) => {
      await tx.game.update({
        where: { id: game.id, teamId: team.id },
        data: {
          title: input.form.title,
          slug: input.form.slug,
          description: input.form.description,
          viewportId,
        },
      });

      await tx.categoriesOnGame.deleteMany({
        where: {
          gameId: game.id,
          categoryId: {
            in: removeTags,
          },
        },
      });

      await tx.categoriesOnGame.createMany({
        data: addTags.map((tag) => ({
          gameId: game.id,
          categoryId: tag,
        })),
        skipDuplicates: true,
      });
    });
  });

const computeTagUpdates = (existing: string[], update: string[]) => {
  const addTags = update.filter((tag) => !existing.includes(tag));
  const removeTags = existing.filter((tag) => !update.includes(tag));
  return { addTags, removeTags };
};
