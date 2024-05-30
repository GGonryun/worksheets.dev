import { TRPCError } from '@trpc/server';
import { Prisma } from '@worksheets/prisma';
import { parseStatus } from '@worksheets/util/tasks';

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
  const unmet = action.raffle.actions.filter((action) => {
    // each user should have at most one progress record per action.
    const p = action.progress?.at(0);
    return parseStatus(action.task.frequency, p) !== 'COMPLETED';
  });

  if (!action.required && unmet.length > 0) {
    throw new TRPCError({
      code: 'PRECONDITION_FAILED',
      message: `Action requirements not met`,
      cause: `Action with id ${action.id} has unmet requirements: ${unmet
        .map((r) => r.id)
        .join(', ')}`,
    });
  }
};
