import { QuestProgress, QuestStatus } from '@worksheets/prisma';
import { isExpired } from '@worksheets/util/time';

export const parseStatus = (state: QuestProgress | null): QuestStatus => {
  if (!state) {
    return 'PENDING';
  }

  if (!state.expiresAt) {
    return 'ACTIVE';
  }

  if (isExpired(state.expiresAt.getTime())) {
    return 'ACTIVE';
  }

  return state.status;
};
