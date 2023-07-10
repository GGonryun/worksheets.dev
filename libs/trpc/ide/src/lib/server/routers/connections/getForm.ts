import { z } from 'zod';
import { loadConnectionForm } from '@worksheets/feat/execution-settings';
import { privateProcedure } from '../../procedures';

export default privateProcedure.input(z.string()).mutation(
  async ({
    input,
    ctx: {
      user: { uid },
    },
  }) => {
    return await loadConnectionForm({ uid, id: input });
  }
);
