import { Prisma } from '@worksheets/prisma';

export const validateRequirements = (
  action: Prisma.RaffleActionGetPayload<{
    include: {
      task: true;
      raffle: {
        include: {
          actions: {
            where: {
              required: true;
            };
            include: {
              task: true;
              progress: true;
            };
          };
        };
      };
      progress: true;
    };
  }>
) => {
  // check if the action has any requirements that are not met.
  const unmet = action.raffle.actions.filter(
    // each user should have at most one progress record per action.
    (action) => action.progress?.at(0)?.status !== 'COMPLETED'
  );

  if (!action.required && unmet.length > 0) {
    console.info(
      `Action with id ${action.id} has unmet requirements and is not a required action`,
      {
        unmet: unmet.map((r) => r.id),
      }
    );
    return false;
  } else {
    console.info(
      `Action with id ${action.id} has no unmet requirements or is a required action.`,
      {
        required: action.required,
        unmet: unmet.map((r) => r.id),
      }
    );
  }

  return true;
};
