import { protectedProcedure } from '../../procedures';

export default protectedProcedure.mutation(async ({ ctx: { user, db } }) => {
  // delete the user and any associated data
  await db.user.delete({
    where: {
      id: user.id,
    },
  });
});
