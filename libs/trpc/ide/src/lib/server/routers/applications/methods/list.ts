import { listApplicationMethods } from '@worksheets/feat/applications-registry';
import {
  listApplicationMethodsRequestSchema,
  listApplicationMethodsResponseSchema,
} from '@worksheets/schemas-applications';
import { publicProcedure } from '../../../procedures';

export default publicProcedure
  .input(listApplicationMethodsRequestSchema)
  .output(listApplicationMethodsResponseSchema)
  .query(async ({ input: { appId } }) => {
    return listApplicationMethods(appId);
  });
