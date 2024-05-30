import {
  TaskCategory,
  TaskFrequency,
  TaskStatus,
  TaskType,
} from '@worksheets/prisma';
import { lootSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { FormField } from '../form';

export const taskSchema = z.object({
  order: z.number(),
  name: z.string(),
  description: z.string(),
  taskId: z.string(),
  category: z.nativeEnum(TaskCategory),
  frequency: z.nativeEnum(TaskFrequency),
  gameId: z.string().nullable(),
  repetitions: z.number(),
  createdAt: z.number(),
  maxRepetitions: z.number(),
  type: z.nativeEnum(TaskType),
  data: z.any(),
  state: z.any().nullable(),
  status: z.nativeEnum(TaskStatus),
  expiresAt: z.number(),
});

export type TaskSchema = z.infer<typeof taskSchema>;

export const questSchema = taskSchema.extend({
  questId: z.string(),
  loot: z.array(lootSchema),
});

export type QuestSchema = z.infer<typeof questSchema>;

export const actionSchema = taskSchema.extend({
  actionId: z.string(),
  locked: z.boolean(),
  required: z.boolean(),
  reward: z.number(),
});

export type ActionSchema = z.infer<typeof actionSchema>;

export const progressSchema = z.object({
  status: z.nativeEnum(TaskStatus),
  expiresAt: z.number().nullable(),
});

export const taskInputSchema = z.object({
  repetitions: z.number(),
  state: z.any().optional(),
});

export type TaskInputSchema = z.infer<typeof taskInputSchema>;

export type TaskDataValue<T extends TaskType> = TaskData[T];
export type TaskData = {
  // interval tasks
  PLAY_GAME: unknown;
  RAFFLE_PARTICIPATION: unknown;
  BATTLE_PARTICIPATION: unknown;
  PLAY_MINUTES: unknown;
  REFERRAL_PLAY_MINUTES: unknown;
  FRIEND_PLAY_MINUTES: unknown;
  ADD_FRIEND: unknown;
  ADD_REFERRAL: unknown;
  PRIZE_WHEEL: unknown;
  FORM: {
    fields: FormField[];
  };
  SECRET: {
    secret: string;
  };
  POLL: {
    question: string;
    options: { key: string; label: string }[];
  };
  // instant tasks
  VISIT_WEBSITE: {
    url: string;
    preview: string;
  };
  FOLLOW_TWITTER: {
    handle: string;
  };
  REPOST_TWITTER: {
    tweetId: string;
    handle: string;
  };
  FOLLOW_TWITCH: {
    handle: string;
  };
  JOIN_DISCORD_GUILD: {
    guildId: string;
    invite: string;
  };
  WISHLIST_STEAM_GAME: {
    appId: string;
  };
  BASIC_ACTION: unknown;
  WATCH_AD: {
    network: string;
  };
};

export type TaskFormProps = {
  task: TaskSchema;
  actions: {
    onSubmit: (input: TaskInputSchema) => void;
    onCancel: () => void;
  };
};
export type ValidationOptions = {
  data: unknown;
  state: unknown;
};

export type TaskPollResult = {
  key: string;
  label: string;
  percent: number;
  count: number;
};
