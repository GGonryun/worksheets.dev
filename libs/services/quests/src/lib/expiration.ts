import { assertNever } from '@worksheets/util/errors';
import { daysFromNow, isExpired } from '@worksheets/util/time';
import { QuestFrequency, QuestProgress } from '@worksheets/util/types';

export const createExpirationDate = (
  frequency: QuestFrequency
): Date | undefined => {
  switch (frequency) {
    case QuestFrequency.DAILY:
      return daysFromNow(1);
    case QuestFrequency.WEEKLY:
      return daysFromNow(7);
    case QuestFrequency.INFINITE:
      return undefined;
    default:
      throw assertNever(frequency);
  }
};

export const parseExpiration = (quest: QuestProgress | null): number => {
  if (!quest || !quest.expiresAt || isExpired(quest.expiresAt)) {
    return -1;
  }

  return quest.expiresAt.getTime();
};