import { basicInformationFormSchema } from '@worksheets/ui/pages/account';

import { protectedProcedure } from '../../procedures';

export default protectedProcedure
  .output(basicInformationFormSchema.nullable())
  .query(async ({ ctx: { user, db } }) => {
    const userId = user.id;
    console.info(`loading profile for user ${userId}`);
    const profile = await db.profile.findFirst({
      where: {
        userId,
      },
    });
    console.info(`loaded profile for user ${userId}`);
    if (profile) {
      return profile;
    } else {
      return null;
    }
  });
