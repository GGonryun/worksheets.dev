import { QuestStatus } from '@worksheets/prisma';

import { NativeEnum } from './types';
export { QuestStatus } from '@worksheets/prisma';
export type { QuestProgress } from '@worksheets/prisma';

export const PER_GAME_PLAY_REWARD = 1 as const;
export const PER_GAME_MINUTE_REWARD = 1 as const;
export const PER_REFERRAL_PLAY_MINUTE_REWARD = 1 as const;
export const PER_FRIEND_PLAY_MINUTE_REWARD = 2 as const;
export const TOKENS_PER_REFERRAL_ACCOUNT = 200;
export const MAX_FRIENDS = 20;
export const MAX_BEST_FRIENDS = 5;

export const QuestType = {
  PLAY_GAME: 'PLAY_GAME',
  PLAY_MINUTES: 'PLAY_MINUTES',
  REFERRAL_PLAY_MINUTES: 'REFERRAL_PLAY_MINUTES',
  FRIEND_PLAY_MINUTES: 'FRIEND_PLAY_MINUTES',
  ADD_FRIEND: 'ADD_FRIEND',
  ADD_REFERRAL: 'ADD_REFERRAL',
  RAFFLE_PARTICIPATION: 'RAFFLE_PARTICIPATION',
  VISIT_WEBSITE: 'VISIT_WEBSITE',
  FOLLOW_TWITTER: 'FOLLOW_TWITTER',
} as const;

export type QuestType = NativeEnum<typeof QuestType>;

export const QuestCategory = {
  GAMEPLAY: 'GAMEPLAY', // e.g. play game, play minutes
  SOCIAL: 'SOCIAL', // e.g. add friend, referral etc
  TASK: 'TASK', // e.g. visit website, follow twitter
};
export type QuestCategory = NativeEnum<typeof QuestCategory>;

export const QuestTypeToCategory: Record<QuestType, QuestCategory> = {
  [QuestType.PLAY_GAME]: QuestCategory.GAMEPLAY,
  [QuestType.PLAY_MINUTES]: QuestCategory.GAMEPLAY,
  [QuestType.REFERRAL_PLAY_MINUTES]: QuestCategory.SOCIAL,
  [QuestType.FRIEND_PLAY_MINUTES]: QuestCategory.SOCIAL,
  [QuestType.ADD_FRIEND]: QuestCategory.SOCIAL,
  [QuestType.ADD_REFERRAL]: QuestCategory.SOCIAL,
  [QuestType.RAFFLE_PARTICIPATION]: QuestCategory.TASK,
  [QuestType.VISIT_WEBSITE]: QuestCategory.TASK,
  [QuestType.FOLLOW_TWITTER]: QuestCategory.TASK,
};

export const QUEST_CATEGORIES = Object.keys(QuestCategory) as QuestCategory[];

export const QuestFrequency = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  INFINITE: 'INFINITE',
} as const;

export type QuestFrequency = NativeEnum<typeof QuestFrequency>;

export const QUEST_FREQUENCIES = Object.keys(
  QuestFrequency
) as QuestFrequency[];

export const QUEST_STATUSES = Object.keys(QuestStatus) as QuestStatus[];

export type QuestFilterOptions = {
  statuses: QuestStatus[];
  frequencies: QuestFrequency[];
  categories: QuestCategory[];
};

export const QUESTS = {
  PLAY_GAME_INFINITE: {
    order: 0,
    id: 'PLAY_GAME_INFINITE',
    type: QuestType.PLAY_GAME,
    title: 'Play a Game',
    description: 'Start a game and earn tokens for playing on Charity Games.',
    frequency: QuestFrequency.INFINITE,
    reward: PER_GAME_PLAY_REWARD,
    expiresAt: 0 as number,
    status: QuestStatus.PENDING as QuestStatus,
    data: {
      requirement: Infinity,
    },
    state: {
      progress: 0 as number,
    },
    input: {},
  },
  PLAY_GAME_DAILY_5: {
    order: 101,
    id: 'PLAY_GAME_DAILY_5',
    type: QuestType.PLAY_GAME,
    title: 'Play 5 Games',
    description: 'Earn tokens for playing 5 games today on Charity Games.',
    frequency: QuestFrequency.DAILY,
    reward: 5,
    expiresAt: 0 as number,
    status: QuestStatus.PENDING as QuestStatus,
    data: {
      requirement: 5,
    },
    state: {
      progress: 0 as number,
    },
    input: {},
  },

  PLAY_GAME_WEEKLY_25: {
    order: 103,
    id: 'PLAY_GAME_WEEKLY_25',
    type: QuestType.PLAY_GAME,
    title: 'Play 25 Games',
    description: 'Earn tokens for playing 25 games this week on Charity Games.',
    frequency: QuestFrequency.WEEKLY,
    reward: 25,
    expiresAt: 0 as number,
    status: QuestStatus.PENDING as QuestStatus,
    data: {
      requirement: 25,
    },
    state: {
      progress: 0 as number,
    },
    input: {},
  },

  PLAY_MINUTES_INFINITE: {
    order: 1,
    id: 'PLAY_MINUTES_INFINITE',
    type: QuestType.PLAY_MINUTES,
    title: 'Play for 1 Minute',
    description:
      'Earn tokens for every a minute you play a game on Charity Games.',
    frequency: QuestFrequency.INFINITE,
    reward: PER_GAME_MINUTE_REWARD,
    expiresAt: 0 as number,
    status: QuestStatus.PENDING as QuestStatus,
    data: {
      requirement: 60, // seconds
    },
    state: {
      duration: 0 as number,
    },
    input: {
      increment: 0 as number,
    },
  },
  REFERRAL_PLAY_MINUTES_INFINITE: {
    order: 2,
    id: 'REFERRAL_PLAY_MINUTES_INFINITE',
    type: QuestType.REFERRAL_PLAY_MINUTES,
    title: 'Referrals Play for 5 Minutes',
    description:
      'Earn tokens for every 5 minutes your referrals play a game on Charity Games.',
    frequency: QuestFrequency.INFINITE,
    reward: PER_REFERRAL_PLAY_MINUTE_REWARD,
    expiresAt: 0 as number,
    status: QuestStatus.PENDING as QuestStatus,
    data: {
      requirement: 300, // seconds
    },
    state: {
      duration: 0 as number,
    },
    input: {
      increment: 0 as number,
    },
  },
  RAFFLE_PARTICIPATION_DAILY: {
    order: 161,
    id: 'RAFFLE_PARTICIPATION_DAILY',
    type: QuestType.RAFFLE_PARTICIPATION,
    title: 'Enter Raffle Daily',
    description:
      'Enter at least one raffle every day on Charity Games and get bonus tokens.',
    frequency: QuestFrequency.DAILY,
    reward: 5,
    expiresAt: 0 as number,
    status: QuestStatus.PENDING as QuestStatus,
    data: {
      requirement: 1,
    },
    state: {
      entered: 0 as number,
    },
    input: {},
  },
  VISIT_CHARITY_GAMES: {
    order: 3,
    id: 'VISIT_CHARITY_GAMES',
    type: QuestType.VISIT_WEBSITE,
    title: 'Visit Charity Games',
    description: 'Visit Charity Games and start playing games to earn tokens.',
    frequency: QuestFrequency.WEEKLY,
    reward: 5,
    expiresAt: 0 as number,
    status: QuestStatus.PENDING as QuestStatus,
    data: {
      url: 'https://charity.games/',
    },
    state: {
      visited: 0 as number,
    },
    input: {},
  },
  VISIT_WATER_ORG: {
    order: 5,
    id: 'VISIT_WATER_ORG',
    type: QuestType.VISIT_WEBSITE,
    title: 'Visit Water.org',
    description:
      'Visit Water.org and learn about their mission to provide clean water to people in need.',
    frequency: QuestFrequency.WEEKLY,
    reward: 15,
    expiresAt: 0 as number,
    status: QuestStatus.PENDING as QuestStatus,
    data: {
      url: 'https://water.org' as string,
    },
    state: {
      visited: 0 as number,
    },
    input: {},
  },
  FOLLOW_CHARITY_GAMES_TWITTER: {
    order: 116,
    id: 'FOLLOW_CHARITY_GAMES_TWITTER',
    type: QuestType.FOLLOW_TWITTER,
    title: 'Follow Charity Games on Twitter',
    description:
      'Follow Charity Games on Twitter. Stay up to date on the latest news and updates.',
    frequency: QuestFrequency.WEEKLY,
    reward: 25,
    expiresAt: 0 as number,
    status: QuestStatus.PENDING as QuestStatus,
    data: {
      handle: 'charitydotgames',
    },
    state: {
      username: '' as string,
    },
    input: {
      username: '' as string,
    },
  },
  FOLLOW_WATER_ORG_TWITTER: {
    order: 117,
    id: 'FOLLOW_WATER_ORG_TWITTER',
    type: QuestType.FOLLOW_TWITTER,
    title: 'Follow Water.org on Twitter',
    description:
      'Follow Water.org on Twitter. Stay up to date on the latest news and updates.',
    frequency: QuestFrequency.WEEKLY,
    reward: 25,
    expiresAt: 0 as number,
    status: QuestStatus.PENDING as QuestStatus,
    data: {
      handle: 'water',
    },
    state: {
      username: '' as string,
    },
    input: {
      username: '' as string,
    },
  },
  ADD_FRIEND_INFINITE: {
    order: 201,
    id: 'ADD_FRIEND_INFINITE',
    type: QuestType.ADD_FRIEND,
    title: 'Add a Friend',
    description:
      'Earn tokens every time you add a new friend on Charity Games.',
    frequency: QuestFrequency.INFINITE,
    reward: 25,
    expiresAt: 0 as number,
    status: QuestStatus.PENDING as QuestStatus,
    data: {
      max: MAX_FRIENDS,
    },
    state: {
      friends: [] as string[],
    },
    input: {
      userId: '' as string,
    },
  },
  ADD_REFERRAL_INFINITE: {
    order: 210,
    id: 'ADD_REFERRAL_INFINITE',
    type: QuestType.ADD_REFERRAL,
    title: 'Add a Referral',
    description:
      'Earn tokens every time you add a new referral on Charity Games.',
    frequency: QuestFrequency.INFINITE,
    reward: TOKENS_PER_REFERRAL_ACCOUNT,
    expiresAt: 0 as number,
    status: QuestStatus.PENDING as QuestStatus,
    data: {},
    state: {
      referrals: [] as string[],
    },
    input: {
      userId: '' as string,
    },
  },
  FRIEND_PLAY_MINUTES_INFINITE: {
    order: 2,
    id: 'FRIEND_PLAY_MINUTES_INFINITE',
    type: QuestType.FRIEND_PLAY_MINUTES,
    title: 'Best Friends Play for 5 Minutes',
    description:
      'Earn tokens for every 5 minutes your best friends spend on play games.',
    frequency: QuestFrequency.INFINITE,
    reward: PER_FRIEND_PLAY_MINUTE_REWARD,
    expiresAt: 0 as number,
    status: QuestStatus.PENDING as QuestStatus,
    data: {
      requirement: 300, // seconds
    },
    state: {
      duration: 0 as number,
    },
    input: {
      increment: 0 as number,
    },
  },
} as const;

export const definitionsByType = {
  [QuestType.PLAY_GAME]: Object.values(QUESTS).filter(
    (d) => d.type === QuestType.PLAY_GAME
  ) as PlayGameQuest[],
  [QuestType.VISIT_WEBSITE]: Object.values(QUESTS).filter(
    (d) => d.type === QuestType.VISIT_WEBSITE
  ) as VisitWebsiteQuest[],
  [QuestType.FOLLOW_TWITTER]: Object.values(QUESTS).filter(
    (d) => d.type === QuestType.FOLLOW_TWITTER
  ) as FollowTwitterQuest[],
  [QuestType.PLAY_MINUTES]: Object.values(QUESTS).filter(
    (d) => d.type === QuestType.PLAY_MINUTES
  ) as PlayMinutesQuest[],
  [QuestType.REFERRAL_PLAY_MINUTES]: Object.values(QUESTS).filter(
    (d) => d.type === QuestType.REFERRAL_PLAY_MINUTES
  ) as ReferralPlayMinutesQuest[],
  [QuestType.ADD_FRIEND]: Object.values(QUESTS).filter(
    (d) => d.type === QuestType.ADD_FRIEND
  ) as AddFriendQuest[],
  [QuestType.ADD_REFERRAL]: Object.values(QUESTS).filter(
    (d) => d.type === QuestType.ADD_REFERRAL
  ) as AddReferralQuest[],
  [QuestType.RAFFLE_PARTICIPATION]: Object.values(QUESTS).filter(
    (d) => d.type === QuestType.RAFFLE_PARTICIPATION
  ) as RaffleParticipationQuest[],
  [QuestType.FRIEND_PLAY_MINUTES]: Object.values(QUESTS).filter(
    (d) => d.type === QuestType.FRIEND_PLAY_MINUTES
  ) as FriendPlayMinutesQuest[],
} as const;

export type Quests = typeof QUESTS;
export type QuestId = keyof Quests;
export type Quest = Quests[QuestId];
export type GenericQuest = {
  id: QuestId;
  order: number;
  status: QuestStatus;
};

export type PlayGameQuestId = Extract<
  QuestId,
  'PLAY_GAME_INFINITE' | 'PLAY_GAME_DAILY_5' | 'PLAY_GAME_WEEKLY_25'
>;

export type VisitWebsiteQuestId = Extract<
  QuestId,
  'VISIT_CHARITY_GAMES' | 'VISIT_WATER_ORG'
>;

export type FollowTwitterQuestId = Extract<
  QuestId,
  'FOLLOW_CHARITY_GAMES_TWITTER' | 'FOLLOW_WATER_ORG_TWITTER'
>;

export type PlayMinutesQuestId = Extract<QuestId, 'PLAY_MINUTES_INFINITE'>;

export type ReferralPlayMinutesQuestId = Extract<
  QuestId,
  'REFERRAL_PLAY_MINUTES_INFINITE'
>;

export type AddFriendQuestId = Extract<QuestId, 'ADD_FRIEND_INFINITE'>;
export type AddReferralQuestId = Extract<QuestId, 'ADD_REFERRAL_INFINITE'>;

export type RaffleParticipationQuestId = Extract<
  QuestId,
  'RAFFLE_PARTICIPATION_DAILY'
>;

export type FriendPlayMinutesQuestId = Extract<
  QuestId,
  'FRIEND_PLAY_MINUTES_INFINITE'
>;

export type PlayGameQuest = Quests[PlayGameQuestId];
export type VisitWebsiteQuest = Quests[VisitWebsiteQuestId];
export type FollowTwitterQuest = Quests[FollowTwitterQuestId];
export type PlayMinutesQuest = Quests[PlayMinutesQuestId];
export type ReferralPlayMinutesQuest = Quests[ReferralPlayMinutesQuestId];
export type AddFriendQuest = Quests[AddFriendQuestId];
export type AddReferralQuest = Quests[AddReferralQuestId];
export type RaffleParticipationQuest = Quests[RaffleParticipationQuestId];
export type FriendPlayMinutesQuest = Quests[FriendPlayMinutesQuestId];

export type QuestByType = {
  PLAY_GAME: PlayGameQuest;
  VISIT_WEBSITE: VisitWebsiteQuest;
  FOLLOW_TWITTER: FollowTwitterQuest;
  PLAY_MINUTES: PlayMinutesQuest;
  REFERRAL_PLAY_MINUTES: ReferralPlayMinutesQuest;
  ADD_FRIEND: AddFriendQuest;
  ADD_REFERRAL: AddReferralQuest;
  RAFFLE_PARTICIPATION: RaffleParticipationQuest;
  FRIEND_PLAY_MINUTES: FriendPlayMinutesQuest;
};

export type PlayGameQuestState = PlayGameQuest['state'];
export type VisitWebsiteQuestState = VisitWebsiteQuest['state'];
export type FollowTwitterQuestState = FollowTwitterQuest['state'];
export type PlayMinutesQuestState = PlayMinutesQuest['state'];
export type ReferralPlayMinutesQuestState = ReferralPlayMinutesQuest['state'];
export type AddFriendQuestState = AddFriendQuest['state'];
export type AddReferralQuestState = AddReferralQuest['state'];
export type RaffleParticipationQuestState = RaffleParticipationQuest['state'];
export type FriendPlayMinutesQuestState = FriendPlayMinutesQuest['state'];

export const parsePlayGameQuest = (quest: Quest): PlayGameQuest => {
  if (quest.type !== QuestType.PLAY_GAME) {
    throw new Error('Invalid quest type');
  }

  return quest;
};

export const parseVisitWebsiteQuest = (quest: Quest): VisitWebsiteQuest => {
  if (quest.type !== QuestType.VISIT_WEBSITE) {
    throw new Error('Invalid quest type');
  }

  return quest;
};

export const parseFollowTwitterQuest = (quest: Quest): FollowTwitterQuest => {
  if (quest.type !== QuestType.FOLLOW_TWITTER) {
    throw new Error('Invalid quest type');
  }

  return quest;
};

export type QuestFormActions<T extends QuestType = QuestType> = {
  onSubmit: (payload: QuestTypeInput<T>) => void;
  onCancel: () => void;
};

export type QuestInput<T extends QuestId> = Quests[Extract<
  QuestId,
  T
>]['input'];

export type QuestTypeInput<T extends QuestType> = QuestInput<
  QuestByType[T]['id']
>;

export type TrackProgressOpts<T extends QuestId> = {
  questId: T;
  userId: string;
  input: QuestInput<T>;
};
