import { prizeCategorySchema, prizeSchema } from '@worksheets/util/types';
import { z } from '@worksheets/zod';

import { publicProcedure } from '../../procedures';

export const list = publicProcedure
  .input(
    z.object({
      category: prizeCategorySchema,
    })
  )
  .output(z.array(prizeSchema))
  .query(({ input: { category } }) => {
    console.info(`listing prizes for category ${category}`);
    // TODO: implement
    return [];
  });
