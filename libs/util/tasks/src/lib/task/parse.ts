import { TaskType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { assertNever } from '@worksheets/util/errors';
import { isPrismaJsonObject } from '@worksheets/util/prisma';

import { parseTaskFormData } from '../form';
import { parseTaskPollData } from '../poll';
import { parseTaskSecretData } from '../secret';
import { TaskData } from './types';

export const parseTaskData = <T extends TaskType>(
  type: T,
  data?: unknown
): TaskData[T] => {
  if (!isPrismaJsonObject(data)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Data is not an object',
      cause: {
        type,
        data,
      },
    });
  }

  switch (type) {
    case 'FORM':
      parseTaskFormData(data);
      break;
    case 'SECRET':
      parseTaskSecretData(data);
      break;
    case 'POLL':
      parseTaskPollData(data);
      break;
    // TODO: add more cases
    case 'ADD_REFERRAL':
    case 'ADD_FRIEND':
    case 'BASIC_ACTION':
    case 'BATTLE_PARTICIPATION':
    case 'FOLLOW_TWITCH':
    case 'FOLLOW_TWITTER':
    case 'REPOST_TWITTER':
    case 'FRIEND_PLAY_MINUTES':
    case 'JOIN_DISCORD_GUILD':
    case 'PLAY_GAME':
    case 'PLAY_MINUTES':
    case 'RAFFLE_PARTICIPATION':
    case 'REFERRAL_PLAY_MINUTES':
    case 'VISIT_WEBSITE':
    case 'WATCH_AD':
    case 'WISHLIST_STEAM_GAME':
      break;
    default:
      throw assertNever(type);
  }

  return data as TaskData[T];
};
