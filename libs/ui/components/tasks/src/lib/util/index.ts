import {
  Check,
  CheckBoxOutlined,
  Diversity1Outlined,
  DynamicFormOutlined,
  FavoriteBorder,
  FeaturedVideoOutlined,
  LanguageOutlined,
  LocalActivityOutlined,
  PasswordOutlined,
  PersonOutlined,
  PollOutlined,
  PunchClockOutlined,
  ScheduleOutlined,
  SvgIconComponent,
  VideogameAssetOutlined,
} from '@mui/icons-material';
import { ButtonProps } from '@mui/material';
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
import { Sword } from '@worksheets/icons/dazzle';
import { MAX_INT } from '@worksheets/prisma';
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
  [TaskFrequency.ONCE]: 'One Time',
};

export const formatTaskFrequencyLabel = (frequency: TaskFrequency) =>
  TASK_FREQUENCY_LABEL[frequency];

const TASK_BACKGROUND_COLOR: Record<TaskType, ButtonProps['color']> = {
  [TaskType.FOLLOW_TWITCH]: 'twitch',
  [TaskType.FOLLOW_TWITTER]: 'black',
  [TaskType.REPOST_TWITTER]: 'black',
  [TaskType.JOIN_DISCORD_GUILD]: 'discord',
  [TaskType.WISHLIST_STEAM_GAME]: 'steam',
  [TaskType.VISIT_WEBSITE]: 'warning',
  [TaskType.WATCH_AD]: 'secondary',
  [TaskType.BASIC_ACTION]: 'primary',
  [TaskType.FORM]: 'primary',
  [TaskType.PLAY_GAME]: 'primary',
  [TaskType.PLAY_MINUTES]: 'primary',
  REFERRAL_PLAY_MINUTES: undefined,
  FRIEND_PLAY_MINUTES: undefined,
  ADD_FRIEND: undefined,
  ADD_REFERRAL: undefined,
  RAFFLE_PARTICIPATION: undefined,
  BATTLE_PARTICIPATION: undefined,
  POLL: undefined,
  SECRET: undefined,
};

export const selectTaskBackgroundColor = (
  status: TaskStatus,
  type: TaskType
) => {
  if (status === 'COMPLETED') return 'light-grey';
  return TASK_BACKGROUND_COLOR[type];
};

const TASK_ICON: Record<TaskType, SvgIconComponent> = {
  [TaskType.PLAY_GAME]: VideogameAssetOutlined,
  [TaskType.VISIT_WEBSITE]: LanguageOutlined,
  [TaskType.FOLLOW_TWITTER]: NewTwitter,
  [TaskType.REPOST_TWITTER]: NewTwitter,
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
  [TaskType.FORM]: DynamicFormOutlined,
  [TaskType.POLL]: PollOutlined,
  [TaskType.SECRET]: PasswordOutlined,
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
  [TaskCategory.INPUT]: 'Input',
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

export const formatMaxRepetitions = (max: number) => {
  return max < MAX_INT ? max : '∞';
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
    return 'Pending';
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
    case TaskType.REPOST_TWITTER:
      return 'Repost on Twitter';
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
    case TaskType.FORM:
      return 'Take a Survey';
    case TaskType.POLL:
      return 'Vote on Poll';
    case TaskType.SECRET:
      return 'Secret Code';
    default:
      throw assertNever(type);
  }
};