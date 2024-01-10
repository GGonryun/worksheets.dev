import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input()
  .output()
  .mutation(async ({ ctx: { user, profile, db } }) => {
    console.info('destroying game submission', { profileId: profile?.id });

    // TODO: do not allow deleting submissions that have been submitted.
    // TODO: delete files from GCP
    // TODO: delete the game submission from DB.

    return {
      okay: true,
    };
  });
