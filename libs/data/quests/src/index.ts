import { Prisma } from '@worksheets/prisma';
import {
  PER_FRIEND_PLAY_MINUTE_REWARD,
  PER_GAME_MINUTE_REWARD,
  PER_GAME_PLAY_REWARD,
  PER_REFERRAL_PLAY_MINUTE_REWARD,
  TOKENS_PER_REFERRAL_ACCOUNT,
} from '@worksheets/util/settings';

export const QUESTS: Prisma.PlatformQuestUncheckedCreateInput[] = [
  // watch ads
  {
    id: 'WATCH_AD_DAILY',
    order: 1,
    version: 1,
    taskId: 'WATCH_AD_DAILY',
    name: 'Watch an Ad (Daily)',
    loot: {
      createMany: {
        data: [
          {
            itemId: '10044',
            quantity: 3,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'WATCH_AD_WEEKLY',
    order: 2,
    version: 1,
    taskId: 'WATCH_AD_WEEKLY',
    name: 'Watch an Ad (Weekly)',
    loot: {
      createMany: {
        data: [
          {
            itemId: '2',
            quantity: 3,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'WATCH_AD_MONTHLY',
    order: 3,
    version: 1,
    taskId: 'WATCH_AD_MONTHLY',
    name: 'Watch an Ad (Monthly)',
    loot: {
      createMany: {
        data: [
          {
            itemId: '5',
            quantity: 3,
            chance: 1,
          },
        ],
      },
    },
  },
  // play games
  {
    id: 'PLAY_GAME_DAILY_5',
    order: 10,
    version: 0,
    taskId: 'PLAY_GAME_DAILY_5',
    loot: {
      createMany: {
        data: [
          {
            itemId: '1',
            quantity: 5,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'PLAY_GAME_WEEKLY_25',
    order: 11,
    version: 0,
    taskId: 'PLAY_GAME_WEEKLY_25',
    loot: {
      createMany: {
        data: [
          {
            itemId: '1',
            quantity: 25,
            chance: 1,
          },
        ],
      },
    },
  },
  // receive item tasks
  {
    id: 'GIFT_BOX_DAILY',
    order: 20,
    version: 0,
    taskId: 'DAILY_CHECK_IN',
    name: 'Gift Box',
    description:
      'Check in every day for a free gift box to share with your friends!',
    loot: {
      createMany: {
        data: [
          {
            itemId: '3',
            quantity: 1,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'GIFT_BOX_WEEKLY',
    order: 21,
    version: 0,
    taskId: 'WEEKLY_CHECK_IN',
    name: 'Gift Box',
    description:
      'Check in once every 7 days for a free gift box to share with your friends!',
    loot: {
      createMany: {
        data: [
          {
            itemId: '6',
            quantity: 1,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'WEAPONS_CRATE_DAILY',
    order: 22,
    version: 0,
    taskId: 'DAILY_CHECK_IN',
    name: 'Weapons Crate',
    description:
      'Open a free weapons crate every day to get a new weapon to use in battle!',
    loot: {
      createMany: {
        data: [
          {
            itemId: '1000',
            quantity: 1,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'WEAPONS_CRATE_WEEKLY',
    order: 23,
    version: 0,
    taskId: 'WEEKLY_CHECK_IN',
    name: 'Weapons Crate',
    description:
      'Open a free weapons crate every week to get a new weapon to use in battle!',
    loot: {
      createMany: {
        data: [
          {
            itemId: '6',
            quantity: 3,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'RANDOM_BOXES_WEEKLY',
    order: 24,
    version: 1,
    taskId: 'WEEKLY_CHECK_IN',
    name: 'Random Boxes',
    description:
      'Get 5 free random boxes every week and get random items. Random boxes may drop sellable items, combat items, and premium prizes!',
    loot: {
      createMany: {
        data: [
          {
            itemId: '10025',
            quantity: 1,
            chance: 1,
          },
          {
            itemId: '10026',
            quantity: 1,
            chance: 1,
          },
          {
            itemId: '10027',
            quantity: 1,
            chance: 1,
          },
          {
            itemId: '10028',
            quantity: 1,
            chance: 1,
          },
          {
            itemId: '10029',
            quantity: 1,
            chance: 1,
          },
        ],
      },
    },
  },
  // raffle participation
  {
    id: 'RAFFLE_PARTICIPATION_DAILY',
    order: 30,
    version: 0,
    taskId: 'RAFFLE_PARTICIPATION_DAILY',
    loot: {
      createMany: {
        data: [
          {
            itemId: '1',
            quantity: 10,
            chance: 1,
          },
        ],
      },
    },
  },
  // battle participation
  {
    id: 'BATTLE_PARTICIPATION_DAILY',
    order: 40,
    version: 0,
    taskId: 'BATTLE_PARTICIPATION_DAILY',
    loot: {
      createMany: {
        data: [
          {
            itemId: '1',
            quantity: 10,
            chance: 1,
          },
        ],
      },
    },
  },
  // visit websites
  {
    id: 'VISIT_CHARITY_GAMES_WEEKLY',
    order: 100,
    version: 0,
    taskId: 'VISIT_CHARITY_GAMES_WEEKLY',
    loot: {
      createMany: {
        data: [
          {
            itemId: '3',
            quantity: 1,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'VISIT_WATER_ORG_WEEKLY',
    order: 102,
    version: 0,
    taskId: 'VISIT_WATER_ORG_WEEKLY',
    loot: {
      createMany: {
        data: [
          {
            itemId: '1',
            quantity: 10,
            chance: 1,
          },
          {
            itemId: '2',
            quantity: 2,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'VISIT_GAMERS_OUTREACH_WEEKLY',
    order: 103,
    version: 0,
    taskId: 'VISIT_GAMERS_OUTREACH_WEEKLY',
    loot: {
      createMany: {
        data: [
          {
            itemId: '10044',
            quantity: 5,
            chance: 1,
          },
        ],
      },
    },
  },
  // infinites
  {
    id: 'PLAY_MINUTES_INFINITE',
    order: 1000,
    version: 0,
    taskId: 'PLAY_MINUTES_INFINITE',
    loot: {
      createMany: {
        data: [
          {
            itemId: '1',
            quantity: PER_GAME_MINUTE_REWARD,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'PLAY_GAME_INFINITE',
    order: 1001,
    version: 0,
    taskId: 'PLAY_GAME_INFINITE',
    loot: {
      createMany: {
        data: [
          {
            itemId: '1',
            quantity: PER_GAME_PLAY_REWARD,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'ADD_FRIEND_INFINITE',
    order: 1002,
    version: 0,
    taskId: 'ADD_FRIEND_INFINITE',
    loot: {
      createMany: {
        data: [
          {
            itemId: '1',
            quantity: 25,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'ADD_REFERRAL_INFINITE',
    order: 1003,
    version: 0,
    taskId: 'ADD_REFERRAL_INFINITE',
    loot: {
      createMany: {
        data: [
          {
            itemId: '1',
            quantity: TOKENS_PER_REFERRAL_ACCOUNT,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'FRIEND_PLAY_MINUTES_INFINITE',
    order: 1004,
    version: 0,
    taskId: 'FRIEND_PLAY_MINUTES_INFINITE',
    loot: {
      createMany: {
        data: [
          {
            itemId: '1',
            quantity: PER_FRIEND_PLAY_MINUTE_REWARD,
            chance: 1,
          },
        ],
      },
    },
  },
  {
    id: 'REFERRAL_PLAY_MINUTES_INFINITE',
    order: 1005,
    version: 0,
    taskId: 'REFERRAL_PLAY_MINUTES_INFINITE',
    loot: {
      createMany: {
        data: [
          {
            itemId: '1',
            quantity: PER_REFERRAL_PLAY_MINUTE_REWARD,
            chance: 1,
          },
        ],
      },
    },
  },
];
