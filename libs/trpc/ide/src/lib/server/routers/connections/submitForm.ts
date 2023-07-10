import {
  connectionFormSchema,
  submitConnectionForm,
} from '@worksheets/feat/execution-settings';
import { privateProcedure } from '../../procedures';

export default privateProcedure.input(connectionFormSchema).mutation(
  async ({
    input: { id, name, appId, settings },
    ctx: {
      user: { uid },
    },
  }) => {
    return await submitConnectionForm({
      id,
      uid,
      name,
      appId,
      settings,
    });
  }
);
