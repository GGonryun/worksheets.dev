import { Prisma } from '@prisma/client';
import { assertNever } from '@worksheets/util/errors';

import { validateFormInput } from '../form';
import { validateFriendInput } from '../friend';
import { validatePollSubmission } from '../poll';
import { validateSecretInput } from '../secret';

export type ValidateTaskInputOptions = {
  task: Prisma.TaskGetPayload<true>;
  progress: Prisma.TaskProgressGetPayload<true> | undefined;
  state: unknown;
};

export const validateTaskInput = (
  opts: ValidateTaskInputOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): { state: any; skip: boolean } => {
  const {
    task: { type, data },
    state,
    progress,
  } = opts;
  switch (type) {
    case 'PLAY_GAME':
    case 'PLAY_MINUTES':
    case 'REFERRAL_PLAY_MINUTES':
    case 'FRIEND_PLAY_MINUTES':
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
    case 'CAPTCHA':
    case 'SUBSCRIBE_YOUTUBE':
    case 'VISIT_FACEBOOK':
    case 'VISIT_INSTAGRAM':
    case 'VISIT_TIKTOK':
    case 'VISIT_YOUTUBE':
    case 'REFERRAL_TASK':
      return { skip: false, state };
    case 'ADD_FRIEND':
      return validateFriendInput({ progress, state });
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
