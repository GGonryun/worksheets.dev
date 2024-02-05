import { PrizeSchema, prizeSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';

const emptyPrizeSchema: PrizeSchema = {
  id: '',
  title: '',
  headline: '',
  description: '',
  value: 0,
  expires: 0,
  imageUrl: '',
  cost: 0,
  type: 'steam-key',
  sourceUrl: '',
  winners: 0,
  sponsor: {
    name: '',
    url: '',
  },
};

export default publicProcedure
  .input(
    z.object({
      prizeId: z.string(),
    })
  )
  .output(prizeSchema)
  .query(({ input: { prizeId } }) => {
    console.info(`getting prize info ${prizeId}`);
    return emptyPrizeSchema;
  });
