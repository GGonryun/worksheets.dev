import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import {
  connectionFormSchema,
  submitConnectionForm,
} from '@worksheets/feat/execution-settings';

export default protectedProcedure.input(connectionFormSchema).mutation(
  async ({
    input: { id, name, appId, settings },
    ctx: {
      user: { uid },
    },
  }) => {
    console.info(`received request to update connection`);
    return await submitConnectionForm({
      id,
      uid,
      name,
      appId,
      settings,
    });
  }
);
