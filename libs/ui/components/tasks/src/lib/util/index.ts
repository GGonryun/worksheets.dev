import {
  Check,
  CheckBoxOutlined,
  Diversity1Outlined,
  FavoriteBorder,
  FeaturedVideoOutlined,
  LanguageOutlined,
  LocalActivityOutlined,
  PersonOutlined,
  PunchClockOutlined,
  ScheduleOutlined,
  SvgIconComponent,
  VideogameAssetOutlined,
} from '@mui/icons-material';
import {
  TaskCategory,
  TaskFrequency,
  TaskStatus,
  TaskType,
} from '@prisma/client';
import {
  Discord,
  NewTwitter,
  SteamGames,
  Twitch,
} from '@worksheets/icons/companies';
import { Sword } from '@worksheets/icons/font-awesome-solid';
import { PaletteColor } from '@worksheets/ui/theme';
import { assertNever } from '@worksheets/util/errors';
import {
  isPast,
  millisecondsToDuration,
  timeUntil,
} from '@worksheets/util/time';

export const isTaskComplete = (status: TaskStatus) => {
  return status === TaskStatus.COMPLETED;
};

const TASK_FREQUENCY_LABEL: Record<TaskFrequency, string> = {
  [TaskFrequency.DAILY]: 'Daily',
  [TaskFrequency.WEEKLY]: 'Weekly',
  [TaskFrequency.MONTHLY]: 'Monthly',
  [TaskFrequency.INFINITE]: 'Infinite',
  [TaskFrequency.ONCE]: 'Once',
};

export const formatTaskFrequencyLabel = (frequency: TaskFrequency) =>
  TASK_FREQUENCY_LABEL[frequency];

const TASK_ICON: Record<TaskType, SvgIconComponent> = {
  [TaskType.PLAY_GAME]: VideogameAssetOutlined,
  [TaskType.VISIT_WEBSITE]: LanguageOutlined,
  [TaskType.FOLLOW_TWITTER]: NewTwitter,
  [TaskType.ADD_FRIEND]: Diversity1Outlined,
  [TaskType.ADD_REFERRAL]: PersonOutlined,
  [TaskType.PLAY_MINUTES]: ScheduleOutlined,
  [TaskType.RAFFLE_PARTICIPATION]: LocalActivityOutlined,
  [TaskType.REFERRAL_PLAY_MINUTES]: PunchClockOutlined,
  [TaskType.FRIEND_PLAY_MINUTES]: FavoriteBorder,
  [TaskType.BASIC_ACTION]: CheckBoxOutlined,
  [TaskType.WATCH_AD]: FeaturedVideoOutlined,
  [TaskType.BATTLE_PARTICIPATION]: Sword,
  [TaskType.FOLLOW_TWITCH]: Twitch,
  [TaskType.JOIN_DISCORD_GUILD]: Discord,
  [TaskType.WISHLIST_STEAM_GAME]: SteamGames,
};

export const selectTaskStatusIcon = (
  status: TaskStatus,
  type: TaskType
): SvgIconComponent => {
  if (status === TaskStatus.COMPLETED) {
    return Check;
  }

  return TASK_ICON[type];
};

const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: 'Pending',
  [TaskStatus.ACTIVE]: 'Active',
  [TaskStatus.COMPLETED]: 'Completed',
};

export const formatTaskStatusLabel = (status: TaskStatus) =>
  TASK_STATUS_LABEL[status];

const TASK_CATEGORY_LABEL: Record<TaskCategory, string> = {
  [TaskCategory.GAMEPLAY]: 'Game',
  [TaskCategory.TASK]: 'Task',
  [TaskCategory.SOCIAL]: 'Social',
};

export const formatTaskCategoryLabel = (category: TaskCategory) =>
  TASK_CATEGORY_LABEL[category];

export const selectTaskColor = (status: TaskStatus): PaletteColor => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return 'success';
    case TaskStatus.PENDING:
      return 'primary';
    case TaskStatus.ACTIVE:
      return 'primary';
    default:
      throw assertNever(status);
  }
};

export const formatTaskExpiration = (
  frequency: TaskFrequency,
  expiresAt: number
) => {
  if (frequency === TaskFrequency.INFINITE) {
    return 'Never Expires';
  }

  if (expiresAt < 1) {
    return 'Pending';
  }

  if (isPast(expiresAt)) {
    return 'Expired';
  }
  return millisecondsToDuration(timeUntil(expiresAt));
};

export const formatTaskTypeLabel = (type: TaskType) => {
  switch (type) {
    case TaskType.PLAY_GAME:
      return 'Play Game';
    case TaskType.VISIT_WEBSITE:
      return 'Visit Website';
    case TaskType.FOLLOW_TWITTER:
      return 'Follow on Twitter';
    case TaskType.ADD_FRIEND:
      return 'Add Friend';
    case TaskType.ADD_REFERRAL:
      return 'Add Referral';
    case TaskType.PLAY_MINUTES:
      return 'Play Minutes';
    case TaskType.RAFFLE_PARTICIPATION:
      return 'Raffle Participation';
    case TaskType.REFERRAL_PLAY_MINUTES:
      return 'Play Minutes';
    case TaskType.FRIEND_PLAY_MINUTES:
      return 'Play Minutes';
    case TaskType.BASIC_ACTION:
      return 'Basic Action';
    case TaskType.WATCH_AD:
      return 'Watch Ad';
    case TaskType.BATTLE_PARTICIPATION:
      return 'Battle Participation';
    case TaskType.FOLLOW_TWITCH:
      return 'Follow on Twitch';
    case TaskType.JOIN_DISCORD_GUILD:
      return 'Join Discord Server';
    case TaskType.WISHLIST_STEAM_GAME:
      return 'Wishlist Steam Game';
    default:
      throw assertNever(type);
  }
};
