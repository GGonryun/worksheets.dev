import { listApplicationMethodDetails } from '@worksheets/feat/applications-registry';
import {
  listApplicationMethodDetailsRequestSchema,
  listApplicationMethodDetailsResponseSchema,
} from '@worksheets/schemas-applications';
import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(listApplicationMethodDetailsRequestSchema)
  .output(listApplicationMethodDetailsResponseSchema)
  .query(async ({ input: { appId } }) => {
    return listApplicationMethodDetails(appId);
  });
