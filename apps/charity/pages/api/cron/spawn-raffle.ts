import { TASKS } from '@worksheets/data/tasks';
import {
  Prisma,
  prisma,
  PrizeType,
  TaskCategory,
  TaskFrequency,
  TaskType,
} from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { NotificationsService } from '@worksheets/services/notifications';
import {
  arrayFromNumber,
  pickRandom,
  randomArrayElement,
} from '@worksheets/util/arrays';
import { createCronJob } from '@worksheets/util/cron';
import { isLucky } from '@worksheets/util/numbers';
import { hoursFromNow } from '@worksheets/util/time';
import { uniqBy } from 'lodash';
import { TweetV2PostTweetResult } from 'twitter-api-v2';

export default createCronJob(async (_, res) => {
  const data = generateRaffle();

  const prize = await prisma.prize.create({
    data: data.prize,
  });

  const raffle = await prisma.raffle.create({
    data: { ...data.raffle, prizeId: prize.id },
  });
  const notifications = new NotificationsService();
  const sent = await notifications.send('new-raffle', {
    id: raffle.id,
    expiresAt: raffle.expiresAt,
    name: prize.name,
  });
  const tweet = notifications.getTweetNotification(sent);

  if (tweet?.data.id && isLucky(0.5)) {
    await connectTweet(tweet, raffle.id);
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

const generateRaffle = (): {
  raffle: Omit<Prisma.RaffleUncheckedCreateInput, 'prizeId'>;
  prize: Prisma.PrizeUncheckedCreateInput;
} => {
  const twoWeeksHours = 14 * 24;
  const expirationDates = [
    ...arrayFromNumber(12).map((i) => twoWeeksHours - i),
    twoWeeksHours,
    ...arrayFromNumber(24).map((i) => twoWeeksHours + i),
  ];

  return {
    raffle: {
      status: 'ACTIVE',
      expiresAt: hoursFromNow(randomArrayElement(expirationDates)),
      publishAt: new Date(),
      sponsorId: 'charity-games',
      actions: {
        createMany: {
          data: selectActions(),
        },
      },
    },
    prize: {
      type: PrizeType.RANDOM_STEAM_KEY,
      name: 'Random Steam Key',
      headline: 'Unlock a random Steam game!',
      description:
        "Unlock a random Steam game with this key. Redeem it on Steam to see what you've won!",
      imageUrl: randomArrayElement([
        'https://cdn.charity.games/_raffles/random_steam_key_1.png',
        'https://cdn.charity.games/_raffles/random_steam_key_2.png',
        'https://cdn.charity.games/_raffles/random_steam_key_3.png',
        'https://cdn.charity.games/_raffles/random_steam_key_4.png',
        'https://cdn.charity.games/_raffles/random_steam_key_5.png',
        'https://cdn.charity.games/_raffles/random_steam_key_6.png',
        'https://cdn.charity.games/_raffles/random_steam_key_7.png',
        'https://cdn.charity.games/_raffles/random_steam_key_8.png',
      ]),
    },
  };
};

const selectActions = (): Prisma.RaffleActionCreateManyRaffleInput[] => {
  const actions: Prisma.RaffleActionCreateManyRaffleInput[] = [];
  actions.push(
    ...[
      {
        order: 0,
        required: true,
        reward: 1,
        taskId: 'CAPTCHA_ONCE',
      },
      {
        order: 1,
        reward: 2,
        taskId: 'WATCH_AD_ONCE',
      },
    ]
  );

  for (const taskId of pickRandom(leaderboards, 3)) {
    actions.push({
      order: 5,
      reward: 1,
      taskId,
    });
  }

  actions.push({
    order: 10,
    reward: 1,
    taskId: randomArrayElement(social),
  });

  actions.push({
    order: 15,
    reward: 1,
    taskId: randomArrayElement(referrals),
  });

  return uniqBy(
    actions.map((a, i) => ({ ...a, order: i })),
    (a) => a.taskId
  );
};

const leaderboards = TASKS.filter(
  (t) => t.type === TaskType.SUBMIT_LEADERBOARD_SCORE
).map((t) => t.id as string);

const social = TASKS.filter(
  (t) =>
    t.type === TaskType.JOIN_DISCORD_GUILD ||
    t.type === TaskType.FOLLOW_TWITTER ||
    t.type === TaskType.FOLLOW_TWITCH ||
    t.type === TaskType.VISIT_FACEBOOK ||
    t.type === TaskType.VISIT_INSTAGRAM ||
    t.type === TaskType.VISIT_TIKTOK ||
    t.type === TaskType.VISIT_YOUTUBE ||
    t.type === TaskType.SUBSCRIBE_YOUTUBE
).map((t) => t.id as string);

const referrals = ['REFERRAL_TASKS_INFINITE'];

const connectTweet = async (
  tweet: TweetV2PostTweetResult,
  raffleId: number
) => {
  console.info(`Connecting tweet to raffle ${raffleId}`);

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
      order: 3,
      raffleId,
      required: false,
      reward: 1,
      taskId: task.id,
    },
  });
};
