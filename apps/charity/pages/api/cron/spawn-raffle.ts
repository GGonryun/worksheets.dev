import { TASKS } from '@worksheets/data/tasks';
import {
  Prisma,
  prisma,
  TaskCategory,
  TaskFrequency,
  TaskType,
} from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { NotificationsService } from '@worksheets/services/notifications';
import { randomArrayElement } from '@worksheets/util/arrays';
import { createCronJob } from '@worksheets/util/cron';
import { isLucky } from '@worksheets/util/numbers';
import { daysFromNow } from '@worksheets/util/time';
import { TweetV2PostTweetResult } from 'twitter-api-v2';

export default createCronJob(async (_, res) => {
  const data = generateRaffle();

  const raffle = await prisma.raffle.create({
    data,
    include: {
      item: true,
    },
  });
  const notifications = new NotificationsService(prisma);
  const sent = await notifications.send('new-raffle', {
    id: raffle.id,
    numWinners: raffle.numWinners,
    expiresAt: raffle.expiresAt,
    premium: raffle.premium,
    name: raffle.name ?? raffle.item.name,
  });
  const tweet = notifications.getTweetNotification(sent);

  if (tweet?.data.id && raffle.itemId === '4') {
    await connectTweet(tweet, data, raffle);
  }

  await res.revalidate(
    routes.raffle.path({
      params: {
        raffleId: raffle.id,
      },
    })
  );
});

const countActions = (raffle: Prisma.RaffleUncheckedCreateInput) => {
  const d = raffle.actions?.createMany
    ?.data as Prisma.RaffleActionCreateManyRaffleInput[];
  return d?.length || 0;
};

const prizes = {
  '2': {
    itemId: '2',
    premium: false,
    numWinners: [5, 7, 10, 15, 20],
    imageUrl: undefined,
  },
  '3': {
    itemId: '3',
    premium: false,
    numWinners: [3, 5, 7, 10, 15],
    imageUrl: undefined,
  },
  '5': {
    itemId: '5',
    premium: false,
    numWinners: [2, 4, 6, 8, 10],
    imageUrl: undefined,
  },
  '8': {
    itemId: '8',
    premium: false,
    numWinners: [1, 3, 5],
    imageUrl: undefined,
  },
  '100': {
    itemId: '100',
    premium: false,
    numWinners: [1, 3, 5],
    imageUrl: undefined,
  },
  '1000': {
    itemId: '1000',
    premium: false,
    numWinners: [1, 2, 3, 4, 5],
    imageUrl: undefined,
  },
  '200': {
    itemId: '200',
    premium: false,
    numWinners: [5, 10, 15],
    imageUrl: undefined,
  },
  '4': {
    itemId: '4',
    premium: true,
    numWinners: [1, 2, 2, 3, 3],
    imageUrl: [
      'https://cdn.charity.games/_raffles/random_steam_key_1.png',
      'https://cdn.charity.games/_raffles/random_steam_key_2.png',
      'https://cdn.charity.games/_raffles/random_steam_key_3.png',
      'https://cdn.charity.games/_raffles/random_steam_key_4.png',
      'https://cdn.charity.games/_raffles/random_steam_key_5.png',
      'https://cdn.charity.games/_raffles/random_steam_key_6.png',
      'https://cdn.charity.games/_raffles/random_steam_key_7.png',
      'https://cdn.charity.games/_raffles/random_steam_key_8.png',
    ],
  },
};

type PrizeId = keyof typeof prizes;

const generateRaffle = (): Prisma.RaffleUncheckedCreateInput => {
  const maxEntries = [10, 20, 30, 40, 50];

  const dropChance: PrizeId[] = [
    '2',
    '3',
    '5',
    '8',
    '100',
    '1000',
    '200',
    '4',
    '4',
    '4',
    '4',
    '4',
    '4',
    '4',
    '4',
    '4',
    '4',
    '4',
    '4',
  ];

  const prizeId = randomArrayElement(dropChance);
  const prize = prizes[prizeId];

  return {
    itemId: prize.itemId,
    maxEntries: randomArrayElement(maxEntries),
    version: 1,
    status: 'ACTIVE',
    premium: prize.premium,
    expiresAt: daysFromNow(14),
    publishAt: new Date(),
    sponsorId: 'charity-games',
    numWinners: randomArrayElement(prize.numWinners),
    imageUrl: prize.imageUrl ? randomArrayElement(prize.imageUrl) : undefined,
    actions: {
      createMany: {
        data: selectActions(prizeId),
      },
    },
  };
};

const selectActions = (
  id: PrizeId
): Prisma.RaffleActionCreateManyRaffleInput[] => {
  const actions: Prisma.RaffleActionCreateManyRaffleInput[] = [];
  if (id === '4') {
    actions.push({
      order: 0,
      required: true,
      reward: 5,
      taskId: 'CAPTCHA_ONCE',
    });
    actions.push({
      order: 0,
      reward: randomArrayElement([1, 2, 3, 4, 5]),
      taskId: 'WATCH_AD_DAILY',
    });
  } else {
    actions.push({
      order: 0,
      reward: randomArrayElement([5, 10]),
      taskId: 'WATCH_AD_ONCE',
    });
  }

  if (isLucky(0.5)) {
    actions.push({
      order: 0,
      reward: randomArrayElement([1, 2, 3, 4, 5]),
      taskId: 'DAILY_CHECK_IN',
    });
  }
  if (isLucky(0.75)) {
    actions.push({
      order: 0,
      reward: randomArrayElement([2, 4, 6, 8, 10]),
      taskId: randomArrayElement(primarySocial),
    });
  }
  if (isLucky(0.5)) {
    actions.push({
      order: 0,
      reward: randomArrayElement([2, 4, 6, 8, 10]),
      taskId: randomArrayElement(secondarySocial),
    });
  }
  if (isLucky(0.75)) {
    actions.push({
      order: 0,
      reward: randomArrayElement([2, 4, 6, 8, 10]),
      taskId: randomArrayElement(leaderboards),
    });
  }
  if (isLucky(0.5)) {
    actions.push({
      order: 0,
      reward: randomArrayElement([2, 4, 6, 8, 10]),
      taskId: randomArrayElement(playGame),
    });
  }
  if (isLucky(0.5)) {
    actions.push({
      order: 0,
      reward: 10,
      taskId: randomArrayElement(referrals),
    });
  }

  return actions.map((a, i) => ({ ...a, order: i }));
};

const leaderboards = TASKS.filter(
  (t) => t.type === TaskType.SUBMIT_LEADERBOARD_SCORE
).map((t) => t.id as string);
const primarySocial = TASKS.filter(
  (t) =>
    t.type === TaskType.JOIN_DISCORD_GUILD ||
    t.type === TaskType.FOLLOW_TWITTER ||
    t.type === TaskType.FOLLOW_TWITCH
).map((t) => t.id as string);
const secondarySocial = TASKS.filter(
  (t) =>
    t.type === TaskType.VISIT_FACEBOOK ||
    t.type === TaskType.VISIT_INSTAGRAM ||
    t.type === TaskType.VISIT_TIKTOK ||
    t.type === TaskType.VISIT_YOUTUBE ||
    t.type === TaskType.SUBSCRIBE_YOUTUBE
).map((t) => t.id as string);

const playGame = TASKS.filter((t) => t.type === TaskType.PLAY_GAME).map(
  (t) => t.id as string
);
const referrals = ['REFERRAL_TASKS_INFINITE'];

const connectTweet = async (
  tweet: TweetV2PostTweetResult,
  data: Prisma.RaffleUncheckedCreateInput,
  raffle: Prisma.RaffleGetPayload<{ include: { item: true } }>
) => {
  console.info(`Connecting tweet to raffle ${raffle.id}`);

  const task = await prisma.task.create({
    data: {
      type: TaskType.REPOST_TWITTER,
      frequency: TaskFrequency.ONCE,
      category: TaskCategory.SOCIAL,
      requiredRepetitions: 1,
      maxRepetitions: 1,
      name: 'Repost a Tweet',
      description: 'Repost a tweet and earn a reward.',
      data: { handle: 'charitydotgames', tweetId: tweet.data.id },
    },
  });

  await prisma.raffleAction.create({
    data: {
      order: countActions(data),
      raffleId: raffle.id,
      required: false,
      reward: 5,
      taskId: task.id,
    },
  });
};
