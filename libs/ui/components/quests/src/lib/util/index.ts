import {
  Check,
  Diversity1Outlined,
  FavoriteBorder,
  LanguageOutlined,
  LocalActivityOutlined,
  PersonOutlined,
  PunchClockOutlined,
  ScheduleOutlined,
  SvgIconComponent,
  Twitter,
  VideogameAssetOutlined,
} from '@mui/icons-material';
import { PaletteColor } from '@worksheets/ui/theme';
import { assertNever } from '@worksheets/util/errors';
import {
  isPast,
  millisecondsToDuration,
  timeUntil,
} from '@worksheets/util/time';
import {
  Quest,
  QuestCategory,
  QuestFrequency,
  QuestStatus,
  QuestType,
} from '@worksheets/util/types';
export const isQuestComplete = (quest: Pick<Quest, 'status'>) => {
  return quest.status === QuestStatus.COMPLETED;
};

const QUEST_FREQUENCY_LABEL: Record<QuestFrequency, string> = {
  [QuestFrequency.DAILY]: 'Daily',
  [QuestFrequency.WEEKLY]: 'Weekly',
  [QuestFrequency.INFINITE]: 'Infinite',
};

export const formatQuestFrequencyLabel = (frequency: QuestFrequency) =>
  QUEST_FREQUENCY_LABEL[frequency];

const QUEST_ICON: Record<QuestType, SvgIconComponent> = {
  [QuestType.PLAY_GAME]: VideogameAssetOutlined,
  [QuestType.VISIT_WEBSITE]: LanguageOutlined,
  [QuestType.FOLLOW_TWITTER]: Twitter,
  [QuestType.ADD_FRIEND]: Diversity1Outlined,
  [QuestType.ADD_REFERRAL]: PersonOutlined,
  [QuestType.PLAY_MINUTES]: ScheduleOutlined,
  [QuestType.RAFFLE_PARTICIPATION]: LocalActivityOutlined,
  [QuestType.REFERRAL_PLAY_MINUTES]: PunchClockOutlined,
  [QuestType.FRIEND_PLAY_MINUTES]: FavoriteBorder,
};

export const selectQuestStatusIcon = (
  quest: Pick<Quest, 'status' | 'type'>
) => {
  if (quest.status === QuestStatus.COMPLETED) {
    return Check;
  }

  return QUEST_ICON[quest.type];
};

const QUEST_STATUS_LABEL: Record<QuestStatus, string> = {
  [QuestStatus.PENDING]: 'Pending',
  [QuestStatus.ACTIVE]: 'Active',
  [QuestStatus.COMPLETED]: 'Completed',
};

export const formatQuestStatusLabel = (status: QuestStatus) =>
  QUEST_STATUS_LABEL[status];

const QUEST_CATEGORY_LABEL: Record<QuestCategory, string> = {
  [QuestCategory.GAMEPLAY]: 'Games',
  [QuestCategory.TASK]: 'Tasks',
  [QuestCategory.SOCIAL]: 'Social',
};

export const formatQuestCategoryLabel = (category: QuestCategory) =>
  QUEST_CATEGORY_LABEL[category];

export const selectQuestColor = (
  quest: Pick<Quest, 'status'>
): PaletteColor => {
  switch (quest.status) {
    case QuestStatus.COMPLETED:
      return 'success';
    case QuestStatus.PENDING:
      return 'primary';
    case QuestStatus.ACTIVE:
      return 'primary';
    default:
      throw assertNever(quest.status);
  }
};

export const formatQuestExpiration = (
  quest: Pick<Quest, 'frequency' | 'expiresAt'>
) => {
  if (quest.frequency === QuestFrequency.INFINITE) {
    return 'Never Expires';
  }

  if (quest.expiresAt < 1) {
    return 'Pending';
  }

  if (isPast(quest.expiresAt)) {
    return 'Expired';
  }
  return millisecondsToDuration(timeUntil(quest.expiresAt));
};
