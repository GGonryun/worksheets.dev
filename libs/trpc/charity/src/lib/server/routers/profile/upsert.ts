import { basicInformationFormSchema } from '@worksheets/ui/pages/account';
import { protectedProcedure } from '../../procedures';
import { z } from '@worksheets/zod';

export default protectedProcedure
  .input(basicInformationFormSchema)
  .output(
    z.object({
      okay: z.boolean(),
      errors: z
        .object({
          username: z.string(),
        })
        .partial()
        .optional(),
    })
  )
  .mutation(async ({ input, ctx: { user, db } }) => {
    const { username, bio } = input;
    const userId = user.id;

    // make sure the username is not taken
    const existingProfile = await db.profile.findFirst({
      where: {
        username,
      },
    });

    if (existingProfile && existingProfile.userId !== userId) {
      return {
        okay: false,
        errors: {
          username: 'Username is taken.',
        },
      };
    }

    await db.profile.upsert({
      where: {
        userId,
      },
      update: {
        username,
        bio,
      },
      create: {
        username,
        bio,
        userId,
      },
    });

    return {
      okay: true,
    };
  });
