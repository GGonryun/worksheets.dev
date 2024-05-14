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
  // watch ads
  {
    order: 1,
    version: 1,
    id: 'WATCH_AD_1' as const,
    type: QuestType.WATCH_AD,
    category: QuestCategory.TASK,
    name: 'Watch an Ad #1',
    description: 'Watch an ad to earn a small reward.',
    frequency: QuestFrequency.DAILY,
    loot: [
      {
        itemId: '10044',
        quantity: 3,
        chance: 1,
      },
    ],
    data: {
      network: 'charity-games',
    },
  },
  {
    order: 2,
    version: 1,
    id: 'WATCH_AD_2' as const,
    type: QuestType.WATCH_AD,
    category: QuestCategory.TASK,
    name: 'Watch an Ad #2',
    description: 'Watch an ad to earn a small reward.',
    frequency: QuestFrequency.WEEKLY,
    loot: [
      {
        itemId: '2',
        quantity: 3,
        chance: 1,
      },
    ],
    data: {
      network: 'gruvian',
    },
  },
  {
    order: 3,
    version: 1,
    id: 'WATCH_AD_3' as const,
    type: QuestType.WATCH_AD,
    category: QuestCategory.TASK,
    name: 'Watch an Ad #3',
    description: 'Watch an ad to earn a small reward.',
    frequency: QuestFrequency.MONTHLY,
    loot: [
      {
        itemId: '5',
        quantity: 3,
        chance: 1,
      },
    ],
    data: {
      network: 'gruvian',
    },
  },
  // play games
  {
    order: 10,
    version: 0,
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
    order: 11,
    version: 0,
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
  // receive item tasks
  {
    order: 20,
    version: 0,
    id: 'DAILY_GIFT_BOXES' as const,
    type: QuestType.BASIC_ACTION,
    category: QuestCategory.GAMEPLAY,
    name: 'Daily Gift Boxes',
    description: 'Collect a small gift box to share with friends every day.',
    frequency: QuestFrequency.DAILY,
    loot: [
      {
        itemId: '3',
        quantity: 1,
        chance: 1,
      },
    ],
    expiresAt: 0 as number,
    data: {},
  },
  {
    order: 21,
    version: 0,
    id: 'WEEKLY_GIFT_BOXES' as const,
    type: QuestType.BASIC_ACTION,
    category: QuestCategory.GAMEPLAY,
    name: 'Weekly Gift Boxes',
    description: 'Collect a large gift box to share with friends every week.',
    frequency: QuestFrequency.WEEKLY,
    loot: [
      {
        itemId: '6',
        quantity: 1,
        chance: 1,
      },
    ],
    expiresAt: 0 as number,
    data: {},
  },
  {
    order: 22,
    version: 0,
    id: 'DAILY_WEAPONS_CRATE' as const,
    type: QuestType.BASIC_ACTION,
    category: QuestCategory.GAMEPLAY,
    name: 'Daily Weapon Crates',
    description: 'Collect a weapons crate for your next battle every day.',
    frequency: QuestFrequency.DAILY,
    loot: [
      {
        itemId: '1000',
        quantity: 1,
        chance: 1,
      },
    ],
    data: {},
  },
  {
    order: 23,
    version: 0,
    id: 'WEEKLY_WEAPONS_CRATE' as const,
    type: QuestType.BASIC_ACTION,
    category: QuestCategory.GAMEPLAY,
    name: 'Weekly Weapon Crates',
    description:
      'Collect 3 extra weapons crate for your next battle every week.',
    frequency: QuestFrequency.WEEKLY,
    loot: [
      {
        itemId: '6',
        quantity: 3,
        chance: 1,
      },
    ],
    expiresAt: 0 as number,
    data: {},
  },
  {
    order: 24,
    version: 1,
    id: 'WEEKLY_RANDOM_BOX' as const,
    type: QuestType.BASIC_ACTION,
    category: QuestCategory.GAMEPLAY,
    name: 'Weekly Colored Boxes',
    description:
      'Collect 5 colored boxes with a random items inside every week.',
    frequency: QuestFrequency.WEEKLY,
    loot: [
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
    data: {},
  },
  // raffle participation
  {
    order: 30,
    version: 0,
    id: 'RAFFLE_PARTICIPATION_DAILY' as const,
    type: QuestType.RAFFLE_PARTICIPATION,
    category: QuestCategory.GAMEPLAY,
    name: 'Enter Raffle Daily',
    description:
      'Enter at least one raffle every day on Charity Games and get 10 bonus tokens.',
    frequency: QuestFrequency.DAILY,
    loot: [
      {
        itemId: '1',
        quantity: 10,
        chance: 1,
      },
    ],
    data: {
      requirement: 1,
    },
  },
  // battle participation
  {
    order: 40,
    version: 0,
    id: 'BATTLE_PARTICIPATION_DAILY' as const,
    type: QuestType.BATTLE_PARTICIPATION,
    category: QuestCategory.GAMEPLAY,
    name: 'Fight Boss Battle Daily',
    description:
      'Participate in at least one battle every day on Charity Games and get 10 bonus tokens.',
    frequency: QuestFrequency.DAILY,
    loot: [
      {
        itemId: '1',
        quantity: 10,
        chance: 1,
      },
    ],
    data: {
      requirement: 1,
    },
  },
  // visit websites
  {
    order: 100,
    version: 0,
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
    ],
    data: {
      url: 'https://charity.games/',
      preview: 'https://cdn.charity.games/_partners/charity-games/preview.png',
    },
  },
  {
    order: 101,
    version: 0,
    id: 'VISIT_INDIEFOLD' as const,
    type: QuestType.VISIT_WEBSITE,
    category: QuestCategory.TASK,
    name: 'Visit IndieFold',
    description:
      'Visit IndieFold and learn about their mission to support indie game developers.',
    frequency: QuestFrequency.WEEKLY,
    loot: [
      {
        itemId: '1001',
        quantity: 1,
        chance: 1,
      },
      {
        itemId: '1002',
        quantity: 1,
        chance: 1,
      },
      {
        itemId: '1003',
        quantity: 1,
        chance: 1,
      },
      {
        itemId: '1004',
        quantity: 1,
        chance: 1,
      },
    ],
    data: {
      url: 'https://indiefold.com',
      preview: 'https://cdn.charity.games/_partners/indiefold/preview.png',
    },
  },
  {
    order: 102,
    version: 0,
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
        quantity: 10,
        chance: 1,
      },
      {
        itemId: '2',
        quantity: 2,
        chance: 1,
      },
    ],
    data: {
      url: 'https://water.org',
      preview: 'https://cdn.charity.games/_partners/water-org/preview.jpg',
    },
  },
  {
    order: 103,
    version: 0,
    id: 'VISIT_GAMERS_OUTREACH' as const,
    type: QuestType.VISIT_WEBSITE,
    category: QuestCategory.TASK,
    name: 'Visit Gamers Outreach',
    description:
      'We believe the world is better when hospitalized kids can play. Gamers have the power to help.',
    frequency: QuestFrequency.WEEKLY,
    loot: [
      {
        itemId: '10044',
        quantity: 5,
        chance: 1,
      },
    ],
    data: {
      url: 'https://gamersoutreach.org/',
      preview: 'https://cdn.charity.games/_partners/gamersoutreach/preview.png',
    },
  },
  // follow twitter
  {
    order: 200,
    version: 0,
    id: 'FOLLOW_CHARITY_GAMES_TWITTER' as const,
    type: QuestType.FOLLOW_TWITTER,
    category: QuestCategory.TASK,
    name: 'Follow Charity Games',
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
    order: 201,
    version: 0,
    id: 'FOLLOW_WATER_ORG_TWITTER' as const,
    type: QuestType.FOLLOW_TWITTER,
    category: QuestCategory.TASK,
    name: 'Follow Water.org',
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
    order: 202,
    version: 0,
    id: 'FOLLOW_GAMERS_OUTREACH_TWITTER' as const,
    type: QuestType.FOLLOW_TWITTER,
    category: QuestCategory.TASK,
    name: 'Follow Gamers Outreach',
    description:
      'Follow Gamers Outreach on Twitter. Stay up to date on the latest news and updates.',
    frequency: QuestFrequency.WEEKLY,
    loot: [
      {
        itemId: '1',
        quantity: 25,
        chance: 1,
      },
    ],
    data: {
      handle: 'GamersOutreach',
    },
  },
  {
    order: 202,
    version: 0,
    id: 'FOLLOW_INDIEFOLD_TWITTER' as const,
    type: QuestType.FOLLOW_TWITTER,
    category: QuestCategory.TASK,
    name: 'Follow IndieFold',
    description:
      'Follow IndieFold on Twitter. Stay up to date on the latest news and updates.',
    frequency: QuestFrequency.WEEKLY,
    loot: [
      {
        itemId: '1',
        quantity: 25,
        chance: 1,
      },
    ],
    data: {
      handle: 'indiefold',
    },
  },
  {
    order: 300,
    version: 0,
    id: 'FOLLOW_GDQ_TWITCH' as const,
    type: QuestType.FOLLOW_TWITCH,
    category: QuestCategory.TASK,
    name: 'Follow GamesDoneQuick',
    description:
      'Follow Games Done Quick on Twitch. Stay up to date on the latest news and updates.',
    frequency: QuestFrequency.MONTHLY,
    loot: [
      {
        itemId: '1',
        quantity: 100,
        chance: 1,
      },
    ],
    data: {
      handle: 'GamesDoneQuick',
    },
  },
  {
    order: 301,
    version: 0,
    id: 'FOLLOW_CHARITY_WATER_TWITCH' as const,
    type: QuestType.FOLLOW_TWITCH,
    category: QuestCategory.TASK,
    name: 'Follow Charity:Water',
    description:
      'Follow Charity:Water Quick on Twitch. Stay up to date on the latest news and updates.',
    frequency: QuestFrequency.MONTHLY,
    loot: [
      {
        itemId: '1',
        quantity: 100,
        chance: 1,
      },
    ],
    data: {
      handle: 'CharityWater',
    },
  },
  {
    order: 302,
    version: 0,
    id: 'FOLLOW_GAMERS_OUTREACH_TWITCH' as const,
    type: QuestType.FOLLOW_TWITCH,
    category: QuestCategory.TASK,
    name: 'Follow GamersOutreach',
    description:
      'Follow GamersOutreach on Twitch. Stay up to date on the latest news and updates.',
    frequency: QuestFrequency.MONTHLY,
    loot: [
      {
        itemId: '1',
        quantity: 100,
        chance: 1,
      },
    ],
    data: {
      handle: 'GamersOutreach',
    },
  },
  // discords
  {
    order: 400,
    version: 0,
    id: 'JOIN_CHARITY_GAMES_DISCORD' as const,
    type: QuestType.JOIN_DISCORD_GUILD,
    category: QuestCategory.TASK,
    name: 'Join Charity Games Discord',
    description:
      'Join the Charity Games Discord server and chat with other players.',
    frequency: QuestFrequency.MONTHLY,
    loot: [
      {
        itemId: '1',
        quantity: 100,
        chance: 1,
      },
    ],
    data: {
      guildId: '1107109374566088785',
      invite: 'https://discord.com/invite/Auatjee2BZ',
    },
  },
  // steams
  {
    order: 500,
    version: 0,
    id: 'WISHLIST_SANDYS_GREAT_ESCAPE_STEAM' as const,
    type: QuestType.WISHLIST_STEAM_GAME,
    category: QuestCategory.TASK,
    name: "Wishlist Sandy's Great Escape on Steam",
    description:
      "Wishlist Sandy's Great Escape on Steam and help indie game developers.",
    frequency: QuestFrequency.MONTHLY,
    loot: [
      {
        itemId: '1',
        quantity: 100,
        chance: 1,
      },
    ],
    data: {
      appId: '2457870',
    },
  },
  {
    order: 501,
    version: 1,
    id: 'WISHLIST_CHECK_AND_SLASH_STEAM' as const,
    type: QuestType.WISHLIST_STEAM_GAME,
    category: QuestCategory.TASK,
    name: 'Wishlist Check and Slash on Steam',
    description:
      'Wishlist Check and Slash on Steam and help indie game developers.',
    frequency: QuestFrequency.MONTHLY,
    loot: [
      {
        itemId: '1',
        quantity: 100,
        chance: 1,
      },
    ],
    data: {
      appId: '2610710',
    },
  },
  // infinites
  {
    order: 1000,
    version: 0,
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
    order: 1001,
    version: 0,
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
    order: 1002,
    version: 0,
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
    order: 1003,
    version: 0,
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
    order: 1004,
    version: 0,
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
  {
    order: 1005,
    version: 0,
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
];

export type SeedableQuest = (typeof QUESTS)[number];

export type QuestId = SeedableQuest['id'];
