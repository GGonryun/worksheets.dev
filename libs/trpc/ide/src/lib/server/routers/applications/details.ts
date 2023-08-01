import {
  getApplicationDetailsRequestSchema,
  getApplicationDetailsResponseSchema,
} from '@worksheets/schemas-applications';
import { publicProcedure } from '../../procedures';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';

export default publicProcedure
  .input(getApplicationDetailsRequestSchema)
  .output(getApplicationDetailsResponseSchema)
  .query(async ({ input: { appId } }) => {
    const db = newApplicationsDatabase();
    return db.getDetails(appId);
  });
