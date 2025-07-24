import { Prisma } from '@prisma/client';
import { assertNever } from '@worksheets/util/errors';

import { validateFormInput } from '../form';
import { validateLeaderboardScore } from '../leaderboard';
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
  } = opts;
  switch (type) {
    case 'PLAY_GAME':
    case 'PLAY_MINUTES':
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
    case 'SUBMIT_LEADERBOARD_SCORE':
      return validateLeaderboardScore({ data, state });
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
