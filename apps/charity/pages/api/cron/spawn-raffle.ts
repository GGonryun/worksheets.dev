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
import { arrayFromNumber, randomArrayElement } from '@worksheets/util/arrays';
import { createCronJob } from '@worksheets/util/cron';
import { isLucky } from '@worksheets/util/numbers';
import { hoursFromNow } from '@worksheets/util/time';
import { TweetV2PostTweetResult } from 'twitter-api-v2';

export default createCronJob(async (_, res) => {
  const data = generateRaffle();

  const raffle = await prisma.raffle.create({
    data,
    include: {
      item: true,
    },
  });
  const notifications = new NotificationsService();
  const sent = await notifications.send('new-raffle', {
    id: raffle.id,
    numWinners: raffle.numWinners,
    expiresAt: raffle.expiresAt,
    premium: raffle.premium,
    name: raffle.name ?? raffle.item.name,
  });
  const tweet = notifications.getTweetNotification(sent);

  if (tweet?.data.id && raffle.itemId === '4' && isLucky(0.5)) {
    await connectTweet(tweet, data, raffle);
  }

  try {
    await res.revalidate(
      routes.raffle.path({
        params: {
          raffleId: raffle.id,
        },
      })
    );
  } catch (error) {
    console.error('Error revalidating raffle', error);
  }
});

const countActions = (raffle: Prisma.RaffleUncheckedCreateInput) => {
  const d = raffle.actions?.createMany
    ?.data as Prisma.RaffleActionCreateManyRaffleInput[];
  return d?.length || 0;
};

const prizes = {
  '5': {
    itemId: '5',
    premium: false,
    numWinners: [5, 7, 10],
    imageUrl: undefined,
  },
  '8': {
    itemId: '8',
    premium: false,
    numWinners: [5, 7, 10],
    imageUrl: undefined,
  },
  '102': {
    itemId: '102',
    premium: false,
    numWinners: [1, 1, 1, 1, 1, 1, 2],
    imageUrl: undefined,
  },
  '103': {
    itemId: '103',
    premium: false,
    numWinners: [1, 1, 1, 1, 1, 1, 2],
    imageUrl: undefined,
  },
  '1000': {
    itemId: '1000',
    premium: false,
    numWinners: [5, 10],
    imageUrl: undefined,
  },
  '4': {
    itemId: '4',
    premium: true,
    numWinners: [1, 1, 1, 1, 1, 1, 2],
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
  const twoWeeksHours = 14 * 24;
  const expirationDates = [
    ...arrayFromNumber(12).map((i) => twoWeeksHours - i),
    twoWeeksHours,
    ...arrayFromNumber(24).map((i) => twoWeeksHours + i),
  ];

  const maxEntries = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const dropChance: PrizeId[] = [
    '5',
    '8',
    '1000',
    '102',
    '103',
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
    expiresAt: hoursFromNow(randomArrayElement(expirationDates)),
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
  }

  actions.push(
    ...[
      {
        order: 1,
        reward: randomArrayElement([10, 10, 10, 15, 20]),
        taskId: 'WATCH_AD_ONCE',
      },
      {
        order: 2,
        reward: randomArrayElement([1, 1, 2, 2, 2, 3, 3, 4, 5]),
        taskId: 'DAILY_CHECK_IN',
      },
    ]
  );

  if (isLucky(0.75)) {
    actions.push({
      order: 5,
      reward: randomArrayElement([1, 2, 3, 4, 5]),
      taskId: randomArrayElement(primarySocial),
    });
  }
  if (isLucky(0.75)) {
    actions.push({
      order: 6,
      reward: randomArrayElement([1, 2, 3, 4, 5]),
      taskId: randomArrayElement(secondarySocial),
    });
  }
  if (isLucky(0.75)) {
    actions.push({
      order: 7,
      reward: randomArrayElement([5, 10]),
      taskId: randomArrayElement(leaderboards),
    });
  }
  if (isLucky(0.75)) {
    actions.push({
      order: 9,
      reward: randomArrayElement([1, 2, 3, 4, 5]),
      taskId: randomArrayElement(playGame),
    });
  }
  if (isLucky(0.75)) {
    actions.push({
      order: 10,
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
