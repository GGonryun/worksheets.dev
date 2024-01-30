import { games } from '@worksheets/data-access/charity-games';
import { detailedGameInfoSchema } from '@worksheets/util/types';
import { z } from '@worksheets/zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .input(
    z.object({
      gameId: z.string(),
    })
  )
  .output(z.array(detailedGameInfoSchema))
  .query(({ ctx: { db }, input: { gameId } }) => {
    return games.map((game) => ({
      id: game.id,
      name: game.name,
      image: game.iconUrl,
      // TODO: replace with actual data
      plays: 0,
    }));
  });
