import { QuestCategory, QuestFrequency, QuestType } from '@worksheets/prisma';
import {
  MAX_FRIENDS,
  PER_FRIEND_PLAY_MINUTE_REWARD,
  PER_GAME_MINUTE_REWARD,
  PER_GAME_PLAY_REWARD,
  PER_REFERRAL_PLAY_MINUTE_REWARD,
  TOKENS_PER_REFERRAL_ACCOUNT,
} from '@worksheets/util/settings';

export const QUESTS = [
  {
    order: 0,
    version: 1,
    id: 'PLAY_GAME_INFINITE' as const,
    type: QuestType.PLAY_GAME,
    category: QuestCategory.GAMEPLAY,
    name: 'Play a Game',
    description: 'Start a game and earn tokens for playing on Charity Games.',
    frequency: QuestFrequency.INFINITE,
    loot: [
      {
        itemId: '1',
        quantity: PER_GAME_PLAY_REWARD,
        chance: 1,
      },
    ],
    data: {
      requirement: Infinity,
    },
  },
  {
    order: 101,
    version: 1,
    id: 'PLAY_GAME_DAILY_5' as const,
    type: QuestType.PLAY_GAME,
    category: QuestCategory.GAMEPLAY,
    name: 'Play 5 Games',
    description: 'Earn tokens for playing 5 games today on Charity Games.',
    frequency: QuestFrequency.DAILY,
    loot: [
      {
        itemId: '1',
        quantity: 5,
        chance: 1,
      },
    ],
    data: {
      requirement: 5,
    },
  },
  {
    order: 103,
    version: 1,
    id: 'PLAY_GAME_WEEKLY_25' as const,
    type: QuestType.PLAY_GAME,
    category: QuestCategory.GAMEPLAY,
    name: 'Play 25 Games',
    description: 'Earn tokens for playing 25 games this week on Charity Games.',
    frequency: QuestFrequency.WEEKLY,
    loot: [
      {
        itemId: '1',
        quantity: 25,
        chance: 1,
      },
    ],
    data: {
      requirement: 25,
    },
  },
  {
    order: 1,
    version: 1,
    id: 'PLAY_MINUTES_INFINITE' as const,
    type: QuestType.PLAY_MINUTES,
    category: QuestCategory.GAMEPLAY,
    name: 'Play for 1 Minute',
    description:
      'Earn tokens for every a minute you play a game on Charity Games.',
    frequency: QuestFrequency.INFINITE,
    loot: [
      {
        itemId: '1',
        quantity: PER_GAME_MINUTE_REWARD,
        chance: 1,
      },
    ],
    data: {
      requirement: 60, // seconds
    },
  },
  {
    order: 10,
    version: 1,
    id: 'DAILY_GIFT_BOXES' as const,
    type: QuestType.BASIC_ACTION,
    category: QuestCategory.TASK,
    name: 'Collect Gift Boxes',
    description: 'Collect 5 small gift boxes to share with friends every day.',
    frequency: QuestFrequency.DAILY,
    loot: [
      {
        itemId: '3',
        quantity: 5,
        chance: 1,
      },
    ],
    expiresAt: 0 as number,
    data: {},
  },
  {
    order: 11,
    version: 1,
    id: 'DAILY_WEAPONS_CRATE' as const,
    type: QuestType.BASIC_ACTION,
    category: QuestCategory.TASK,
    name: 'Collect Weapon Crates',
    description: 'Collect 5 weapons crates for your next battle every day.',
    frequency: QuestFrequency.DAILY,
    loot: [
      {
        itemId: '1000',
        quantity: 5,
        chance: 1,
      },
    ],
    data: {},
  },
  {
    order: 2,
    version: 1,
    id: 'REFERRAL_PLAY_MINUTES_INFINITE' as const,
    type: QuestType.REFERRAL_PLAY_MINUTES,
    category: QuestCategory.SOCIAL,
    name: 'Referrals Play for 5 Minutes',
    description:
      'Earn tokens for every 5 minutes your referrals play a game on Charity Games.',
    frequency: QuestFrequency.INFINITE,
    loot: [
      {
        itemId: '1',
        quantity: PER_REFERRAL_PLAY_MINUTE_REWARD,
        chance: 1,
      },
    ],
    data: {
      requirement: 300, // seconds
    },
  },
  {
    order: 161,
    version: 1,
    id: 'RAFFLE_PARTICIPATION_DAILY' as const,
    type: QuestType.RAFFLE_PARTICIPATION,
    category: QuestCategory.TASK,
    name: 'Enter Raffle Daily',
    description:
      'Enter at least one raffle every day on Charity Games and get bonus tokens.',
    frequency: QuestFrequency.DAILY,
    loot: [
      {
        itemId: '1',
        quantity: 5,
        chance: 1,
      },
    ],
    data: {
      requirement: 1,
    },
  },
  {
    order: 3,
    version: 1,
    id: 'VISIT_CHARITY_GAMES' as const,
    type: QuestType.VISIT_WEBSITE,
    category: QuestCategory.TASK,
    name: 'Visit Charity Games',
    description: 'Visit Charity Games and start playing games to earn tokens.',
    frequency: QuestFrequency.WEEKLY,
    loot: [
      {
        itemId: '3',
        quantity: 1,
        chance: 1,
      },
      {
        itemId: '6',
        quantity: 1,
        chance: 1,
      },
      {
        itemId: '7',
        quantity: 1,
        chance: 1,
      },
    ],
    data: {
      url: 'https://charity.games/',
    },
  },
  {
    order: 5,
    version: 1,
    id: 'VISIT_WATER_ORG' as const,
    type: QuestType.VISIT_WEBSITE,
    category: QuestCategory.TASK,
    name: 'Visit Water.org',
    description:
      'Visit Water.org and learn about their mission to provide clean water to people in need.',
    frequency: QuestFrequency.WEEKLY,
    loot: [
      {
        itemId: '1',
        quantity: 5,
        chance: 1,
      },
      {
        itemId: '7',
        quantity: 1,
        chance: 1,
      },
      {
        itemId: '1000',
        quantity: 1,
        chance: 1,
      },
    ],
    data: {
      url: 'https://water.org' as string,
    },
  },
  {
    order: 116,
    version: 1,
    id: 'FOLLOW_CHARITY_GAMES_TWITTER' as const,
    type: QuestType.FOLLOW_TWITTER,
    category: QuestCategory.TASK,
    name: 'Follow Charity Games on Twitter',
    description:
      'Follow Charity Games on Twitter. Stay up to date on the latest news and updates.',
    frequency: QuestFrequency.WEEKLY,
    loot: [
      {
        itemId: '1',
        quantity: 25,
        chance: 1,
      },
    ],
    data: {
      handle: 'charitydotgames',
    },
  },
  {
    order: 117,
    version: 1,
    id: 'FOLLOW_WATER_ORG_TWITTER' as const,
    type: QuestType.FOLLOW_TWITTER,
    category: QuestCategory.TASK,
    name: 'Follow Water.org on Twitter',
    description:
      'Follow Water.org on Twitter. Stay up to date on the latest news and updates.',
    frequency: QuestFrequency.WEEKLY,
    loot: [
      {
        itemId: '1',
        quantity: 25,
        chance: 1,
      },
    ],
    data: {
      handle: 'water',
    },
  },
  {
    order: 201,
    version: 1,
    id: 'ADD_FRIEND_INFINITE' as const,
    type: QuestType.ADD_FRIEND,
    category: QuestCategory.SOCIAL,
    name: 'Add a Friend',
    description:
      'Earn tokens every time you add a new friend on Charity Games.',
    frequency: QuestFrequency.INFINITE,
    loot: [
      {
        itemId: '1',
        quantity: 25,
        chance: 1,
      },
    ],
    data: {
      max: MAX_FRIENDS,
    },
  },
  {
    order: 210,
    version: 1,
    id: 'ADD_REFERRAL_INFINITE' as const,
    type: QuestType.ADD_REFERRAL,
    category: QuestCategory.SOCIAL,
    name: 'Add a Referral',
    description:
      'Earn tokens every time you add a new referral on Charity Games.',
    frequency: QuestFrequency.INFINITE,
    loot: [
      {
        itemId: '1',
        quantity: TOKENS_PER_REFERRAL_ACCOUNT,
        chance: 1,
      },
    ],
    data: {},
  },
  {
    order: 2,
    version: 1,
    id: 'FRIEND_PLAY_MINUTES_INFINITE' as const,
    type: QuestType.FRIEND_PLAY_MINUTES,
    category: QuestCategory.SOCIAL,
    name: 'Best Friends Play for 5 Minutes',
    description:
      'Earn tokens for every 5 minutes your best friends spend on play games.',
    frequency: QuestFrequency.INFINITE,
    loot: [
      {
        itemId: '1',
        quantity: PER_FRIEND_PLAY_MINUTE_REWARD,
        chance: 1,
      },
    ],
    data: {
      requirement: 300, // seconds
    },
  },
];

export type SeedableQuest = (typeof QUESTS)[number];

export type QuestId = SeedableQuest['id'];
