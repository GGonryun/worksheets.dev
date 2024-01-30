import { TRPCError } from '@trpc/server';
import { developers, games } from '@worksheets/data-access/charity-games';
import { printDate } from '@worksheets/util/time';
import {
  DeveloperSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { z } from '@worksheets/zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(
    z.object({
      game: z.custom<SerializableGameSchema>(),
      developer: z.custom<DeveloperSchema>(),
    })
  )
  .query(({ input: { gameId } }) => {
    const game = games.find((game) => game.id === gameId);
    if (!game) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Game not found',
      });
    }
    const developer = developers.find(
      (developer) => developer.id === game?.developerId
    );
    if (!developer) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Developer not found',
      });
    }
    return {
      game: {
        ...game,
        updatedAt: printDate(game.updatedAt),
        createdAt: printDate(game.createdAt),
      },
      developer,
    };
  });
