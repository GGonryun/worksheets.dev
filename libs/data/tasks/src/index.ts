import { games } from '@worksheets/data/games';
import {
  MAX_INT,
  Prisma,
  TaskCategory,
  TaskFrequency,
  TaskType,
} from '@worksheets/prisma';
import { MAX_FRIENDS, MAX_REFERRALS } from '@worksheets/util/settings';

import { createGameTask } from './util';

export const TASKS: Prisma.TaskUncheckedCreateInput[] = [
  {
    version: 1,
    type: TaskType.FORM,
    category: TaskCategory.INPUT,
    id: 'RATE_CHARITY_GAMES',
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Rate Charity Games',
    description: 'Rate Charity Games and earn a reward.',
    data: {
      fields: [
        {
          key: 'rating',
          label: 'Rating',
          required: true,
          description:
            'Rate your overall experience with Charity Games so far.',
          type: 'rating',
          icon: 'STAR',
        },
        {
          key: 'feedback',
          label: 'Feedback',
          description:
            'Is there anything else you would like to share with us?',
          type: 'text',
          multiline: 5,
        },
      ],
    },
  },
  {
    version: 1,
    type: TaskType.POLL,
    category: TaskCategory.INPUT,
    id: 'GIVEAWAY_POLL_1',
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Giveaway Poll',
    description: 'We want to hear from you! Vote for future prizes.',
    data: {
      question: 'What giveaway would you like to see next?',
      options: [
        { key: 'crypto', label: 'Crypto Currency' },
        { key: 'paypal', label: 'Paypal Money' },
        { key: 'fortnite', label: 'Fortnite V-Bucks' },
        { key: 'roblox', label: 'Roblox Robux' },
        { key: 'steam-gift-card', label: 'Steam Gift Card' },
      ],
    },
  },
  // watch ads
  {
    version: 1,
    id: 'WATCH_AD_DAILY',
    type: TaskType.WATCH_AD,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.DAILY,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Watch an Ad',
    description: 'Watch an ad to earn a small reward.',
    data: {
      network: 'charity-games',
    },
  },
  {
    version: 1,
    id: 'WATCH_AD_WEEKLY',
    type: TaskType.WATCH_AD,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.WEEKLY,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Watch an Ad',
    description: 'Watch an ad to earn a small reward.',
    data: {
      network: 'charity-games',
    },
  },
  {
    version: 1,
    id: 'WATCH_AD_MONTHLY',
    type: TaskType.WATCH_AD,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.MONTHLY,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Watch an Ad',
    description: 'Watch an ad to earn a small reward.',
    data: {
      network: 'charity-games',
    },
  },
  {
    version: 1,
    id: 'WATCH_AD_THRICE',
    type: TaskType.WATCH_AD,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 3,
    name: 'Watch an Ad',
    description: 'Watch an ad to earn a small reward.',
    data: {
      network: 'charity-games',
    },
  },
  // play games
  {
    version: 2,
    id: 'PLAY_GAME_DAILY_5',
    type: TaskType.PLAY_GAME,
    category: TaskCategory.GAMEPLAY,
    frequency: TaskFrequency.DAILY,
    requiredRepetitions: 5,
    maxRepetitions: 5,
    name: 'Play 5 Games',
    description: 'Earn tokens for playing 5 games today on Charity Games.',
    data: {
      requirement: 25,
    },
  },
  {
    version: 1,
    id: 'PLAY_GAME_ONCE_5',
    type: TaskType.PLAY_GAME,
    category: TaskCategory.GAMEPLAY,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 5,
    maxRepetitions: 5,
    name: 'Play 5 Games',
    description:
      'Earn rewards for playing 5 games for any amount of time on Charity Games.',
    data: {},
  },
  {
    version: 3,
    id: 'PLAY_GAME_WEEKLY_25',
    type: TaskType.PLAY_GAME,
    category: TaskCategory.GAMEPLAY,
    frequency: TaskFrequency.WEEKLY,
    requiredRepetitions: 25,
    maxRepetitions: 25,
    name: 'Play 25 Games',
    description: 'Earn tokens for playing 25 games this week on Charity Games.',
    data: {},
  },
  // check in tasks
  {
    version: 2,
    id: 'DAILY_CHECK_IN',
    type: TaskType.BASIC_ACTION,
    category: TaskCategory.GAMEPLAY,
    frequency: TaskFrequency.DAILY,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Check In (Daily)',
    description: 'Receive a reward for checking in every day.',
    data: {},
  },
  {
    version: 2,
    id: 'WEEKLY_CHECK_IN',
    type: TaskType.BASIC_ACTION,
    category: TaskCategory.GAMEPLAY,
    frequency: TaskFrequency.WEEKLY,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Check In (Weekly)',
    description: 'Receive a reward for checking in every week.',
    data: {},
  },
  {
    version: 2,
    id: 'MONTHLY_CHECK_IN',
    type: TaskType.BASIC_ACTION,
    category: TaskCategory.GAMEPLAY,
    frequency: TaskFrequency.MONTHLY,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Check In (Monthly)',
    description: 'Receive a reward for checking in every month.',
    data: {},
  },
  {
    version: 1,
    id: 'CHECK_IN_ONCE',
    type: TaskType.BASIC_ACTION,
    category: TaskCategory.GAMEPLAY,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Check In',
    description: 'Receive a one-time reward for checking in.',
    data: {},
  },
  // raffle participation
  {
    version: 1,
    id: 'RAFFLE_PARTICIPATION_DAILY',
    type: TaskType.RAFFLE_PARTICIPATION,
    category: TaskCategory.GAMEPLAY,
    frequency: TaskFrequency.DAILY,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Enter Raffles',
    description:
      'Enter at least one raffle every day on Charity Games and get 10 bonus tokens.',
    data: {},
  },
  // battle participation
  {
    version: 1,
    id: 'BATTLE_PARTICIPATION_DAILY',
    type: TaskType.BATTLE_PARTICIPATION,
    category: TaskCategory.GAMEPLAY,
    frequency: TaskFrequency.DAILY,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Fight Boss Battle',
    description:
      'Participate in at least one battle every day on Charity Games and get 10 bonus tokens.',
    data: {},
  },
  // visit websites
  {
    version: 1,
    id: 'VISIT_CHARITY_GAMES_WEEKLY',
    type: TaskType.VISIT_WEBSITE,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.WEEKLY,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Visit Charity Games',
    description: 'Visit Charity Games and start playing games to earn tokens.',
    data: {
      url: 'https://charity.games/',
      preview: 'https://cdn.charity.games/_partners/charity-games/preview.png',
    },
  },
  {
    version: 1,
    id: 'VISIT_WATER_ORG_WEEKLY',
    type: TaskType.VISIT_WEBSITE,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.WEEKLY,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Visit Water.org',
    description:
      'Visit Water.org and learn about their mission to provide clean water to people in need.',
    data: {
      url: 'https://water.org',
      preview: 'https://cdn.charity.games/_partners/water-org/preview.jpg',
    },
  },
  {
    version: 1,
    id: 'VISIT_GAMERS_OUTREACH_WEEKLY',
    type: TaskType.VISIT_WEBSITE,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.WEEKLY,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Visit Gamers Outreach',
    description:
      'We believe the world is better when hospitalized kids can play. Gamers have the power to help.',
    data: {
      url: 'https://gamersoutreach.org/',
      preview: 'https://cdn.charity.games/_partners/gamersoutreach/preview.png',
    },
  },
  {
    version: 1,
    id: 'VISIT_INDIEFOLD_ONCE',
    type: TaskType.VISIT_WEBSITE,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Visit IndieFold',
    description:
      'Visit IndieFold and learn about their mission to support indie game developers.',
    data: {
      url: 'https://indiefold.com',
      preview: 'https://cdn.charity.games/_partners/indiefold/preview.png',
    },
  },
  // follow twitter
  {
    version: 1,
    id: 'FOLLOW_CHARITY_GAMES_TWITTER_ONCE',
    type: TaskType.FOLLOW_TWITTER,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Follow Charity Games',
    description:
      'Follow Charity Games on Twitter. Stay up to date on the latest news and updates.',
    data: {
      handle: 'charitydotgames',
    },
  },
  {
    version: 1,
    id: 'FOLLOW_WATER_ORG_TWITTER_ONCE',
    type: TaskType.FOLLOW_TWITTER,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Follow Water.org',
    description:
      'Follow Water.org on Twitter. Stay up to date on the latest news and updates.',
    data: {
      handle: 'water',
    },
  },
  {
    version: 1,
    id: 'FOLLOW_GAMERS_OUTREACH_TWITTER_ONCE',
    type: TaskType.FOLLOW_TWITTER,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Follow Gamers Outreach',
    description:
      'Follow Gamers Outreach on Twitter. Stay up to date on the latest news and updates.',
    data: {
      handle: 'GamersOutreach',
    },
  },
  {
    version: 1,
    id: 'FOLLOW_INDIEFOLD_TWITTER_ONCE',
    type: TaskType.FOLLOW_TWITTER,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Follow IndieFold',
    description:
      'Follow IndieFold on Twitter. Stay up to date on the latest news and updates.',
    data: {
      handle: 'indiefold',
    },
  },
  {
    version: 1,
    id: 'FOLLOW_GDQ_TWITCH_ONCE',
    type: TaskType.FOLLOW_TWITCH,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Follow GamesDoneQuick',
    description:
      'Follow Games Done Quick on Twitch. Stay up to date on the latest news and updates.',
    data: {
      handle: 'GamesDoneQuick',
    },
  },
  {
    version: 1,
    id: 'FOLLOW_CHARITY_WATER_TWITCH_ONCE',
    type: TaskType.FOLLOW_TWITCH,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Follow Charity:Water',
    description:
      'Follow Charity:Water Quick on Twitch. Stay up to date on the latest news and updates.',
    data: {
      handle: 'CharityWater',
    },
  },
  {
    version: 1,
    id: 'FOLLOW_GAMERS_OUTREACH_TWITCH_ONCE',
    type: TaskType.FOLLOW_TWITCH,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Follow GamersOutreach',
    description:
      'Follow GamersOutreach on Twitch. Stay up to date on the latest news and updates.',
    data: {
      handle: 'GamersOutreach',
    },
  },
  // repost twitter
  {
    version: 3,
    id: 'REPOST_TWITTER_ONCE',
    type: TaskType.REPOST_TWITTER,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Repost a Tweet',
    description: 'Repost a tweet and earn a reward.',
    data: {
      tweetId: '1793874425198371047',
      handle: 'charitydotgames',
    },
  },
  // discords
  {
    version: 1,
    id: 'JOIN_CHARITY_GAMES_DISCORD_ONCE',
    type: TaskType.JOIN_DISCORD_GUILD,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Join Charity Games Discord',
    description:
      'Join the Charity Games Discord server and chat with other players.',
    data: {
      guildId: '1107109374566088785',
      invite: 'https://discord.com/invite/Auatjee2BZ',
    },
  },
  // steams
  {
    version: 1,
    id: 'WISHLIST_SANDYS_GREAT_ESCAPE_STEAM_ONCE',
    type: TaskType.WISHLIST_STEAM_GAME,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: "Wishlist Sandy's Great Escape on Steam",
    description:
      "Wishlist Sandy's Great Escape on Steam and help indie game developers.",
    data: {
      appId: '2457870',
    },
  },
  {
    version: 1,
    id: 'WISHLIST_CHECK_AND_SLASH_STEAM_ONCE',
    type: TaskType.WISHLIST_STEAM_GAME,
    category: TaskCategory.TASK,
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Wishlist Check and Slash on Steam',
    description:
      'Wishlist Check and Slash on Steam and help indie game developers.',
    data: {
      appId: '2610710',
    },
  },
  // infinites
  {
    version: 3,
    id: 'PLAY_MINUTES_INFINITE',
    type: TaskType.PLAY_MINUTES,
    category: TaskCategory.GAMEPLAY,
    frequency: TaskFrequency.INFINITE,
    requiredRepetitions: 60, // seconds
    maxRepetitions: MAX_INT,
    name: 'Play Games for 1 Minute',
    description:
      'Earn rewards for every a minute you play a game on Charity Games.',
    data: {},
  },
  {
    version: 2,
    id: 'PLAY_MINUTES_5_INFINITE',
    type: TaskType.PLAY_MINUTES,
    category: TaskCategory.GAMEPLAY,
    frequency: TaskFrequency.INFINITE,
    requiredRepetitions: 300, // seconds
    maxRepetitions: MAX_INT,
    name: 'Play Games for 5 Minutes',
    description:
      'Earn rewards for every 5 minutes you play a game on Charity Games.',
    data: {},
  },
  {
    version: 1,
    id: 'FRIEND_PLAY_MINUTES_INFINITE',
    type: TaskType.FRIEND_PLAY_MINUTES,
    category: TaskCategory.SOCIAL,
    frequency: TaskFrequency.INFINITE,
    requiredRepetitions: 300, // seconds
    maxRepetitions: MAX_INT,
    name: 'Best Friends Play for 5 Minutes',
    description:
      'Earn tokens for every 5 minutes your best friends spend on play games.',
    data: {},
  },
  {
    version: 1,
    id: 'REFERRAL_PLAY_MINUTES_INFINITE',
    type: TaskType.REFERRAL_PLAY_MINUTES,
    category: TaskCategory.SOCIAL,
    frequency: TaskFrequency.INFINITE,
    requiredRepetitions: 300, // seconds
    maxRepetitions: MAX_INT,
    name: 'Referrals Play for 5 Minutes',
    description:
      'Earn tokens for every 5 minutes your referrals play a game on Charity Games.',
    data: {},
  },
  {
    version: 1,
    id: 'PLAY_GAME_INFINITE',
    type: TaskType.PLAY_GAME,
    category: TaskCategory.GAMEPLAY,
    frequency: TaskFrequency.INFINITE,
    requiredRepetitions: 1,
    maxRepetitions: MAX_INT,
    name: 'Play a Game',
    description: 'Start a game and earn tokens for playing on Charity Games.',
    data: {},
  },
  {
    version: 1,
    id: 'ADD_FRIEND_INFINITE',
    type: TaskType.ADD_FRIEND,
    category: TaskCategory.SOCIAL,
    frequency: TaskFrequency.INFINITE,
    requiredRepetitions: 1,
    maxRepetitions: MAX_FRIENDS,
    name: 'Add a Friend',
    description: `Earn tokens every time you add a new friend on Charity Games. You can receive this reward up to ${MAX_FRIENDS} times.`,
    data: {},
  },
  {
    version: 1,
    id: 'ADD_REFERRAL_INFINITE',
    type: TaskType.ADD_REFERRAL,
    category: TaskCategory.SOCIAL,
    frequency: TaskFrequency.INFINITE,
    requiredRepetitions: 1,
    maxRepetitions: MAX_REFERRALS,
    name: 'Add a Referral',
    description: `Earn tokens every time you add a new referral on Charity Games. You can receive this reward up to ${MAX_REFERRALS} times`,
    data: {},
  },
  // sample tasks, not for production
  {
    version: 2,
    type: TaskType.FORM,
    category: TaskCategory.INPUT,
    id: 'SAMPLE_FORM',
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Sample Survey',
    description: 'Fill out this survey and earn a reward.',
    data: {
      fields: [
        {
          key: 'text',
          label: 'Text',
          description: 'Enter some text',
          type: 'text',
          min: 10,
          max: 100,
        },
        {
          key: 'email',
          required: true,
          label: 'Email',
          description: 'Enter an email',
          type: 'text',
          validation: 'EMAIL',
        },
        {
          key: 'phone',
          label: 'Phone',
          description: 'Enter a phone',
          type: 'text',
          validation: 'PHONE',
        },
        {
          key: 'url',
          label: 'URL',
          type: 'text',
          validation: 'URL',
        },
        {
          key: 'big-text',
          required: true,
          label: 'Big Text',
          description: 'Enter a lot of text',
          type: 'text',
          multiline: 5,
        },
        {
          key: 'number',
          label: 'Number',
          required: true,
          description: 'Enter a number',
          type: 'number',
          min: 1,
          max: 10,
        },
        {
          key: 'select',
          label: 'Select',
          required: true,
          type: 'select',
          options: ['Option 1', 'Option 2', 'Option 3'],
        },
        {
          key: 'choice',
          label: 'Choice',
          required: false,
          description: 'Select one option',
          type: 'choice',
          options: ['Option 1', 'Option 2', 'Option 3'],
        },
        {
          key: 'multiple-choice',
          label: 'Multiple Choice',
          required: true,
          description: 'Select multiple options',
          type: 'multiple-choice',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          min: 2,
          max: 3,
        },
        {
          key: 'slider',
          label: 'Slider',
          required: false,
          description: 'Select a value',
          type: 'slider',
          min: 1,
          max: 10,
          step: 1,
          initial: 5,
        },
        {
          key: 'rating',
          label: 'Rating',
          required: true,
          description: 'Rate the experience',
          type: 'rating',
          icon: 'STAR',
        },
      ],
    },
  },
  {
    version: 2,
    type: TaskType.POLL,
    category: TaskCategory.INPUT,
    id: 'SAMPLE_POLL',
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Sample Poll',
    description: 'This is a sample poll task. Vote for your favorite option.',
    data: {
      question: 'What is your favorite color?',
      options: [
        { key: 'red', label: 'Red' },
        { key: 'orange', label: 'Orange' },
        { key: 'yellow', label: 'Yellow' },
        { key: 'green', label: 'Green' },
        { key: 'blue', label: 'Blue' },
        { key: 'purple', label: 'Purple' },
        { key: 'black', label: 'Black' },
        { key: 'white', label: 'White' },
        { key: 'none', label: 'None of the Above' },
      ],
    },
  },
  {
    version: 2,
    type: TaskType.SECRET,
    category: TaskCategory.INPUT,
    id: 'SAMPLE_SECRET',
    frequency: TaskFrequency.ONCE,
    requiredRepetitions: 1,
    maxRepetitions: 1,
    name: 'Enter a Secret',
    description: 'Enter a secret and earn a reward.',
    data: {
      secret: 'cinnamon-toast-crunch',
    },
  },
  ...games.flatMap(createGameTask),
];