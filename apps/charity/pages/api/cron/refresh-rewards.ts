import { prisma } from '@worksheets/prisma';
import { CRON_SECRET, IS_PRODUCTION } from '@worksheets/services/environment';
import { routes } from '@worksheets/ui/routes';
import { TokensPanels } from '@worksheets/util/enums';
import {
  MAX_DAILY_GIFT_BOX_SHARES,
  MAX_TOKENS_FROM_GAME_PLAY_PER_DAY,
  MAX_TOKENS_FROM_REFERRAL_PLAYS,
} from '@worksheets/util/settings';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const authHeader = request.headers['authorization'];

  // allow insecure requests in development
  if (IS_PRODUCTION) {
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return response.status(401).json({ success: false });
    }
  }

  await Promise.all([resetRewards(), resetShares()]);

  // TODO: in the future we'll need to push everything into a queue for increased performance.
  response.status(200).json({ success: true });
}

// find all friends that have been sent a gift in the last 48 hours.
// use a two day window to account for timezones and other edge cases.
const resetRewards = async () => {
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

// clear all the giftSentAt fields.
// use a two day window to account for timezones and other edge cases.
const resetShares = async () =>
  prisma.friendship.updateMany({
    where: {
      giftSentAt: {
        gte: new Date(Date.now() - 48 * 60 * 60 * 1000),
      },
    },
    data: {
      giftSentAt: null,
    },
  });
