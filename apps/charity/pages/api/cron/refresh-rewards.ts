import { prisma } from '@worksheets/prisma';
import { createCronJob } from '@worksheets/util/cron';
import {
  MAX_DAILY_GIFT_BOX_SHARES,
  MAX_TOKENS_FROM_GAME_PLAY_PER_DAY,
  MAX_TOKENS_FROM_REFERRAL_PLAYS,
} from '@worksheets/util/settings';

export default createCronJob(async () =>
  Promise.all([resetRewards(), prisma.gift.deleteMany()])
);

const resetRewards = async () => {
  // TODO: reset only user rewards if the user has been active in the last 24 hours.
  const updating = await prisma.rewards.findMany({
    select: {
      id: true,
      userId: true,
    },
  });

  await prisma.rewards.updateMany({
    where: {
      id: {
        in: updating.map((reward) => reward.id),
      },
    },
    data: {
      availableGamePlayTokens: MAX_TOKENS_FROM_GAME_PLAY_PER_DAY,
      availableReferralTokens: MAX_TOKENS_FROM_REFERRAL_PLAYS,
      sharableGiftBoxes: MAX_DAILY_GIFT_BOX_SHARES,
      claimedDailyReward: null,
    },
  });
};
