import { TaskType } from '@prisma/client';
import { assertNever } from '@worksheets/util/errors';

import { validateFormInput } from '../form';
import { validatePollSubmission } from '../poll';
import { validateSecretInput } from '../secret';
import { ValidationOptions } from './types';

export const validateTask = (
  opts: {
    type: TaskType;
  } & ValidationOptions
) => {
  const { type, data, state } = opts;
  switch (type) {
    case 'PLAY_GAME':
    case 'PLAY_MINUTES':
    case 'REFERRAL_PLAY_MINUTES':
    case 'FRIEND_PLAY_MINUTES':
    case 'ADD_FRIEND':
    case 'ADD_REFERRAL':
    case 'RAFFLE_PARTICIPATION':
    case 'BATTLE_PARTICIPATION':
    case 'VISIT_WEBSITE':
    case 'FOLLOW_TWITTER':
    case 'REPOST_TWITTER':
    case 'BASIC_ACTION':
    case 'WATCH_AD':
    case 'FOLLOW_TWITCH':
    case 'WISHLIST_STEAM_GAME':
    case 'JOIN_DISCORD_GUILD':
      // TODO: validate these tasks
      return;
    case 'POLL':
      return validatePollSubmission({ data, state });
    case 'SECRET':
      return validateSecretInput({ data, state });
    case 'FORM':
      return validateFormInput({ data, state });
    default:
      throw assertNever(type);
  }
};