import { updateWorksheet } from '@worksheets/feat/worksheets-management';
import { privateProcedure } from '../../procedures';
import {
  updateWorksheetRequestSchema,
  updateWorksheetResponseSchema,
} from '@worksheets/schemas-worksheets';

export default privateProcedure
  .input(updateWorksheetRequestSchema)
  .output(updateWorksheetResponseSchema)
  .mutation(
    async ({
      input,
      ctx: {
        user: { uid },
      },
    }) => {
      return await updateWorksheet(uid, input);
    }
  );
