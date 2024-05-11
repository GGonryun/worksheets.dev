import { QuestId } from '@worksheets/data/quests';
import {
  QuestCategory,
  QuestFrequency,
  QuestStatus,
  QuestType,
} from '@worksheets/prisma';
import { z } from 'zod';

import { lootSchema } from './items';

export type QuestFilterOptions = {
  statuses: QuestStatus[];
  frequencies: QuestFrequency[];
  categories: QuestCategory[];
};

export type QuestTypeDataValue<T extends QuestType> = QuestTypeData[T];
export type QuestTypeData = {
  PLAY_GAME: {
    requirement: number;
  };
  PLAY_MINUTES: {
    requirement: number;
  };
  REFERRAL_PLAY_MINUTES: {
    requirement: number;
  };
  FRIEND_PLAY_MINUTES: {
    requirement: number;
  };
  ADD_FRIEND: {
    max: number;
  };
  RAFFLE_PARTICIPATION: {
    requirement: number;
  };
  BATTLE_PARTICIPATION: {
    requirement: number;
  };
  VISIT_WEBSITE: {
    url: string;
    preview: string;
  };
  FOLLOW_TWITTER: {
    handle: string;
  };
  ADD_REFERRAL: unknown;
  BASIC_ACTION: unknown;
  WATCH_AD: {
    network: string;
  };
};

export type QuestTypeStateValue<T extends QuestType> = QuestTypeState[T];

export type QuestTypeState = {
  PLAY_GAME: {
    progress: number;
  };
  PLAY_MINUTES: {
    duration: number;
  };
  REFERRAL_PLAY_MINUTES: {
    duration: number;
  };
  FRIEND_PLAY_MINUTES: {
    duration: number;
  };
  ADD_REFERRAL: {
    referrals: string[];
  };
  ADD_FRIEND: {
    friends: string[];
  };
  RAFFLE_PARTICIPATION: unknown;
  VISIT_WEBSITE: unknown;
  FOLLOW_TWITTER: {
    username: string;
  };
  BATTLE_PARTICIPATION: unknown;
  BASIC_ACTION: unknown;
  WATCH_AD: unknown;
};

export type QuestTypeInputValue<T extends QuestType> = QuestTypeInput[T];
export type QuestTypeInput = {
  PLAY_MINUTES: {
    increment: number;
    game: {
      id: string;
      title: string;
    };
  };
  REFERRAL_PLAY_MINUTES: {
    increment: number;
  };
  FRIEND_PLAY_MINUTES: {
    increment: number;
  };
  ADD_REFERRAL: {
    userId: string;
  };
  ADD_FRIEND: {
    userId: string;
  };
  FOLLOW_TWITTER: {
    username: string;
  };
  PLAY_GAME: unknown;
  RAFFLE_PARTICIPATION: unknown;
  VISIT_WEBSITE: unknown;
  BASIC_ACTION: unknown;
  WATCH_AD: unknown;
  BATTLE_PARTICIPATION: unknown;
};

export type QuestFormActions<T extends QuestType = QuestType> = {
  onSubmit: (payload: QuestTypeInput[T]) => void;
  onCancel: () => void;
};

export const basicQuestSchema = z.object({
  id: z.custom<QuestId>(),
  order: z.number(),
  frequency: z.nativeEnum(QuestFrequency),
  category: z.nativeEnum(QuestCategory),
  type: z.nativeEnum(QuestType),
  status: z.nativeEnum(QuestStatus),
  loot: z.array(lootSchema),
});

export type BasicQuestSchema = z.infer<typeof basicQuestSchema>;

export const detailedQuestSchema = basicQuestSchema.extend({
  name: z.string(),
  description: z.string(),
  data: z.record(z.any()),
  state: z.record(z.any()),
  expiresAt: z.number(),
});

export type DetailedQuestSchema<T extends QuestType = QuestType> = Omit<
  z.infer<typeof detailedQuestSchema>,
  'data' | 'state'
> & {
  data: QuestTypeDataValue<T>;
  state: QuestTypeStateValue<T>;
};
